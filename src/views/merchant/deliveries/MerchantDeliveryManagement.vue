<template>
  <div class="merchant-delivery-management">
    <div class="header">
      <h1>Gestion des Livraisons - Lâcher de Chariot</h1>
      <button @click="showCreateModal = true" class="btn-primary">
        Nouvelle Livraison
      </button>
    </div>

    <div class="statistics-cards">
      <div class="stat-card">
        <h3>Total</h3>
        <p>{{ statistics.total }}</p>
      </div>
      <div class="stat-card">
        <h3>En attente</h3>
        <p>{{ statistics.pending }}</p>
      </div>
      <div class="stat-card">
        <h3>En transit</h3>
        <p>{{ statistics.inTransit }}</p>
      </div>
      <div class="stat-card">
        <h3>Livrées</h3>
        <p>{{ statistics.delivered }}</p>
      </div>
      <div class="stat-card">
        <h3>Taux de livraison</h3>
        <p>{{ statistics.deliveryRate.toFixed(1) }}%</p>
      </div>
    </div>

    <div class="filters">
      <select v-model="filterStatus" @change="filterDeliveries">
        <option value="">Tous les statuts</option>
        <option value="pending">En attente</option>
        <option value="assigned">Assignée</option>
        <option value="picked_up">Récupérée</option>
        <option value="in_transit">En transit</option>
        <option value="delivered">Livrée</option>
        <option value="cancelled">Annulée</option>
      </select>
    </div>

    <div class="deliveries-table">
      <table>
        <thead>
          <tr>
            <th>Référence</th>
            <th>Client</th>
            <th>Adresse de livraison</th>
            <th>Montant</th>
            <th>Frais</th>
            <th>Statut</th>
            <th>Date préférée</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="delivery in filteredDeliveries" :key="delivery.id">
            <td>{{ delivery.order_reference }}</td>
            <td>{{ delivery.customer_name }}</td>
            <td>{{ delivery.delivery_address }}</td>
            <td>{{ delivery.order_amount }}€</td>
            <td>{{ delivery.delivery_fee }}€</td>
            <td>
              <span :class="'status-' + delivery.status">
                {{ getStatusLabel(delivery.status) }}
              </span>
            </td>
            <td>{{ formatDate(delivery.preferred_delivery_date) }}</td>
            <td>
              <button @click="viewDetails(delivery)" class="btn-small">
                Détails
              </button>
              <button
                v-if="canCancel(delivery)"
                @click="cancelDelivery(delivery)"
                class="btn-small btn-danger"
              >
                Annuler
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showCreateModal" class="modal">
      <div class="modal-content">
        <h2>Nouvelle Livraison</h2>
        <form @submit.prevent="createDelivery">
          <div class="form-group">
            <label>Référence commande</label>
            <input
              v-model="newDelivery.order_reference"
              type="text"
              required
            />
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea v-model="newDelivery.description"></textarea>
          </div>
          <div class="form-group">
            <label>Montant commande (€)</label>
            <input
              v-model.number="newDelivery.order_amount"
              type="number"
              step="0.01"
              required
            />
          </div>
          <div class="form-group">
            <label>Adresse de livraison</label>
            <input
              v-model="newDelivery.delivery_address"
              type="text"
              required
            />
          </div>
          <div class="form-group">
            <label>Nom du client</label>
            <input
              v-model="newDelivery.customer_name"
              type="text"
              required
            />
          </div>
          <div class="form-group">
            <label>Téléphone client</label>
            <input
              v-model="newDelivery.customer_phone"
              type="tel"
              required
            />
          </div>
          <div class="form-group">
            <label>Email client</label>
            <input
              v-model="newDelivery.customer_email"
              type="email"
            />
          </div>
          <div class="form-group">
            <label>Frais de livraison (€)</label>
            <input
              v-model.number="newDelivery.delivery_fee"
              type="number"
              step="0.01"
              required
            />
          </div>
          <div class="form-group">
            <label>Date de livraison préférée</label>
            <input
              v-model="newDelivery.preferred_delivery_date"
              type="date"
            />
          </div>
          <div class="form-group">
            <label>Créneau horaire</label>
            <select v-model="newDelivery.preferred_delivery_time_slot">
              <option value="">Choisir un créneau</option>
              <option value="08:00-10:00">08:00 - 10:00</option>
              <option value="10:00-12:00">10:00 - 12:00</option>
              <option value="12:00-14:00">12:00 - 14:00</option>
              <option value="14:00-16:00">14:00 - 16:00</option>
              <option value="16:00-18:00">16:00 - 18:00</option>
              <option value="18:00-20:00">18:00 - 20:00</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-primary">Créer</button>
            <button
              type="button"
              @click="showCreateModal = false"
              class="btn-secondary"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import merchantDeliveryService from "@/services/merchant-delivery.service";
import type {
  MerchantDelivery,
  CreateMerchantDeliveryDto,
  MerchantDeliveryStatistics,
  MerchantDeliveryStatus,
} from "@/types/merchant-delivery";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const merchantId = computed(() => authStore.user?.merchant_id);

const deliveries = ref<MerchantDelivery[]>([]);
const statistics = ref<MerchantDeliveryStatistics>({
  total: 0,
  delivered: 0,
  pending: 0,
  inTransit: 0,
  deliveryRate: 0,
});
const showCreateModal = ref(false);
const filterStatus = ref("");
const newDelivery = ref<CreateMerchantDeliveryDto>({
  order_reference: "",
  description: "",
  order_amount: 0,
  delivery_address: "",
  customer_name: "",
  customer_phone: "",
  customer_email: "",
  delivery_fee: 0,
  preferred_delivery_date: "",
  preferred_delivery_time_slot: "",
});

const filteredDeliveries = computed(() => {
  if (!filterStatus.value) return deliveries.value;
  return deliveries.value.filter((d) => d.status === filterStatus.value);
});

async function loadDeliveries() {
  if (!merchantId.value) return;
  try {
    deliveries.value = await merchantDeliveryService.getDeliveries(
      merchantId.value
    );
  } catch (error) {
    console.error("Error loading deliveries:", error);
  }
}

async function loadStatistics() {
  if (!merchantId.value) return;
  try {
    statistics.value = await merchantDeliveryService.getStatistics(
      merchantId.value
    );
  } catch (error) {
    console.error("Error loading statistics:", error);
  }
}

async function createDelivery() {
  if (!merchantId.value) return;
  try {
    await merchantDeliveryService.createDelivery(
      merchantId.value,
      newDelivery.value
    );
    showCreateModal.value = false;
    resetForm();
    await loadDeliveries();
    await loadStatistics();
  } catch (error) {
    console.error("Error creating delivery:", error);
  }
}

async function cancelDelivery(delivery: MerchantDelivery) {
  if (!merchantId.value) return;
  if (confirm("Êtes-vous sûr de vouloir annuler cette livraison?")) {
    try {
      await merchantDeliveryService.cancelDelivery(
        merchantId.value,
        delivery.id
      );
      await loadDeliveries();
      await loadStatistics();
    } catch (error) {
      console.error("Error cancelling delivery:", error);
    }
  }
}

function viewDetails(delivery: MerchantDelivery) {
  // Navigate to detail page or show modal
  console.log("View details for:", delivery);
}

function canCancel(delivery: MerchantDelivery): boolean {
  return delivery.status !== "delivered" && delivery.status !== "cancelled";
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: "En attente",
    assigned: "Assignée",
    picked_up: "Récupérée",
    in_transit: "En transit",
    delivered: "Livrée",
    cancelled: "Annulée",
  };
  return labels[status] || status;
}

function formatDate(date: string | undefined): string {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("fr-FR");
}

function resetForm() {
  newDelivery.value = {
    order_reference: "",
    description: "",
    order_amount: 0,
    delivery_address: "",
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    delivery_fee: 0,
    preferred_delivery_date: "",
    preferred_delivery_time_slot: "",
  };
}

function filterDeliveries() {
  // Filtering is handled by computed property
}

onMounted(() => {
  loadDeliveries();
  loadStatistics();
});
</script>

<style scoped>
.merchant-delivery-management {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.statistics-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-card h3 {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.stat-card p {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.filters {
  margin-bottom: 20px;
}

.filters select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.deliveries-table {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.deliveries-table table {
  width: 100%;
  border-collapse: collapse;
}

.deliveries-table th {
  background: #f5f5f5;
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #ddd;
}

.deliveries-table td {
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.status-pending {
  background: #ffd700;
  color: #333;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-assigned {
  background: #87ceeb;
  color: #333;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-picked_up {
  background: #9370db;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-in_transit {
  background: #ff8c00;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-delivered {
  background: #32cd32;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-cancelled {
  background: #dc143c;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.btn-primary,
.btn-secondary,
.btn-small {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.btn-primary {
  background: #007bff;
  color: #fff;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-secondary {
  background: #6c757d;
  color: #fff;
}

.btn-small {
  padding: 5px 10px;
  font-size: 12px;
  margin-right: 5px;
  background: #007bff;
  color: #fff;
}

.btn-danger {
  background: #dc3545;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-content h2 {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-group textarea {
  min-height: 80px;
  resize: vertical;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
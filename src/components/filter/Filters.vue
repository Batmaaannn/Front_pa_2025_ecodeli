<template>
  <div class="filters-container">
    <!-- <InputField
      label="Chercher par nom"
      v-model.trim="matchUser"
      name="search-name"
    ></InputField> -->
    <div class="filter-group">
      <div class="sort-container">
        <label for="sortBy" class="filter-label">
          <svg
            class="filter-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 4h13M3 8h9m-9 4h6m4 0l4 4m0 0l4-4m-4 4V4"
            ></path>
          </svg>
          Trier par
        </label>
        <select
          id="sortBy"
          name="sortBy"
          v-model="sortBy"
          @change="emitFilters"
          class="filter-select"
        >
          <option value="">-- Aucun tri --</option>
          <option value="+deliveryAgent.company_name">Entreprise (A-Z)</option>
          <option value="-deliveryAgent.company_name">Entreprise (Z-A)</option>
          <option value="+deliveryAgent.siret">SIRET (croissant)</option>
          <option value="-deliveryAgent.siret">SIRET (décroissant)</option>
          <option value="+user.is_validated">Status (validé d'abord)</option>
          <option value="-user.is_validated">
            Status (non validé d'abord)
          </option>
          <option value="+deliveryAgent.user.created_at">
            Date (plus ancien)
          </option>
          <option value="-deliveryAgent.user.created_at">
            Date (plus récent)
          </option>
        </select>
      </div>

      <div class="activated-container">
        <label for="activated" class="checkbox-label">
          <input
            type="checkbox"
            name="activated"
            id="activated"
            v-model="activatedUser"
            @change="emitFilters"
            class="checkbox-input"
          />
          <span class="checkbox-text">Afficher uniquement les non validés</span>
        </label>
      </div>

      <div class="button-container">
        <button @click="resetFilter" class="reset-button">
          <svg
            class="reset-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            ></path>
          </svg>
          Réinitialiser
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { FiltersData } from "@/types/filter";
//import InputField from "@/components/formControls/InputField.vue";

const emit = defineEmits<{
  filters: [filters: FiltersData];
}>();

//const matchUser = ref("");
const activatedUser = ref(false);
const sortBy = ref("");

function emitFilters() {
  const filters: FiltersData = {
    ...(sortBy.value && { sortBy: sortBy.value }),
    ...(activatedUser.value && { actived: activatedUser.value }),
  };
  emit("filters", filters);
}

function resetFilter() {
  //matchUser.value = "";
  activatedUser.value = false;
  sortBy.value = "";
  emitFilters();
}
</script>

<style scoped>
.filters-container {
  background-color: #f9fafb;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.filter-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-end;
}

.sort-container {
  flex: 1;
  min-width: 250px;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.filter-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #6b7280;
}

.filter-select {
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: white;
  font-size: 0.875rem;
  color: #374151;
  transition: all 0.2s;
  cursor: pointer;
}

.filter-select:hover {
  border-color: #9ca3af;
}

.filter-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.activated-container {
  display: flex;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
}

.checkbox-input {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  cursor: pointer;
  transition: all 0.2s;
}

.checkbox-input:checked {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

.checkbox-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.checkbox-text {
  font-size: 0.875rem;
  color: #374151;
  font-weight: 500;
}

.button-container {
  display: flex;
  align-items: center;
}

.reset-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background-color: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.reset-button:hover {
  background-color: #f3f4f6;
  border-color: #9ca3af;
}

.reset-button:active {
  transform: scale(0.98);
}

.reset-icon {
  width: 1rem;
  height: 1rem;
  color: #6b7280;
}

/* Responsive design */
@media (max-width: 768px) {
  .filter-group {
    flex-direction: column;
    gap: 1rem;
  }

  .sort-container {
    min-width: 100%;
  }

  .activated-container,
  .button-container {
    width: 100%;
  }

  .reset-button {
    width: 100%;
    justify-content: center;
  }
}
</style>

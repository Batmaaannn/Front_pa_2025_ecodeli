<script setup>
import List from '@/components/backoffice/utils/List.vue'

const payments = [
  {
    invoice_id: 'INV-001',
    customer: 'Jean Dupont',
    amount: 120.50,
    status: 'Paid',
    date: '2024-05-01'
  },
  {
    invoice_id: 'INV-002',
    customer: 'Sophie Durand',
    amount: 300.00,
    status: 'Pending',
    date: '2024-05-03'
  },
  {
    invoice_id: 'INV-003',
    customer: 'Tom Cook',
    amount: 150.75,
    status: 'Overdue',
    date: '2024-04-28'
  },
  {
    invoice_id: 'INV-004',
    customer: 'Amélie Narbone',
    amount: 450.00,
    status: 'Paid',
    date: '2024-05-04'
  },
  {
    invoice_id: 'INV-005',
    customer: 'Lucas Fontaine',
    amount: 220.20,
    status: 'Pending',
    date: '2024-05-06'
  }
]
</script>

<template>
  <List :list="payments" title="Paiements" description="Liste des paiements et factures.">
    <template #actions>
      <button class="rounded bg-indigo-600 px-4 py-2 text-white text-sm hover:bg-indigo-500">
        Ajouter un paiement
      </button>
    </template>

    <template #rowActions="{ item }">
      <a href="#" class="text-indigo-600 hover:text-indigo-900">Modifier</a>
    </template>
  </List>
</template>


<style scoped>

</style>
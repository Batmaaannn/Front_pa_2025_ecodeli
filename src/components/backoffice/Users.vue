<script setup>

import List from '@/components/backoffice/utils/List.vue'

const users = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay@example.com', role: 'Member' },
  { name: 'Tom Cook', title: 'CTO', email: 'tom.cook@example.com', role: 'Admin' },
  { name: 'Amélie Narbone', title: 'Marketing Manager', email: 'amelie.n@example.com', role: 'Member' },
  { name: 'Jean Dupont', title: 'Data Analyst', email: 'j.dupont@example.com', role: 'Member' },
  { name: 'Sophie Durand', title: 'Product Owner', email: 'sophie.d@example.com', role: 'Admin' },
  { name: 'Alexandre Leroy', title: 'Back-end Developer', email: 'alex.leroy@example.com', role: 'Member' },
  { name: 'Clara Bernard', title: 'UX Designer', email: 'clara.b@example.com', role: 'Member' },
  { name: 'Hugo Martin', title: 'DevOps Engineer', email: 'hugo.martin@example.com', role: 'Admin' },
  { name: 'Isabelle Laurent', title: 'HR Manager', email: 'isa.laurent@example.com', role: 'Member' },
  { name: 'Kevin Schmidt', title: 'Mobile Developer', email: 'kevin.s@example.com', role: 'Member' },
  { name: 'Emma Lemoine', title: 'Scrum Master', email: 'emma.l@example.com', role: 'Admin' },
  { name: 'Lucas Fontaine', title: 'Project Manager', email: 'lucas.f@example.com', role: 'Member' },
  { name: 'Nina Moreau', title: 'QA Engineer', email: 'nina.moreau@example.com', role: 'Member' },
  { name: 'Olivier Girard', title: 'Support Specialist', email: 'olivier.g@example.com', role: 'Member' },
  { name: 'Camille Petit', title: 'Growth Hacker', email: 'camille.p@example.com', role: 'Admin' },
  { name: 'Thomas Robert', title: 'Tech Lead', email: 'thomas.r@example.com', role: 'Admin' },
  { name: 'Sarah Bouchard', title: 'Content Manager', email: 'sarah.b@example.com', role: 'Member' },
  { name: 'Antoine Caron', title: 'Security Engineer', email: 'antoine.c@example.com', role: 'Member' },
  { name: 'Laura Marchand', title: 'SEO Specialist', email: 'laura.m@example.com', role: 'Member' },
  { name: 'Romain Lefevre', title: 'Product Designer', email: 'romain.l@example.com', role: 'Admin' }
]

</script>

<template>
  <List :list="users" title="Users" description="List of all users.">
    <template #actions>
      <button class="rounded bg-indigo-600 px-4 py-2 text-white text-sm hover:bg-indigo-500">Add User</button>
    </template>

    <template #rowActions="{ item }">
      <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
    </template>
  </List>
</template>


<style scoped>

</style>
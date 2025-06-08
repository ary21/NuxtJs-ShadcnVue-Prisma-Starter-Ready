<script setup lang="ts">
import type { User } from '@prisma/client';
import { columns } from './columns'
import DataTable from '@/components/DataTable.vue'

defineProps<{
  users: User[]
}>()

const emit = defineEmits(['refresh'])

// Pass the refresh event up to parent
function handleRefresh() {
  emit('refresh')
}
</script>

<template>
  <DataTable :columns="columns" :data="users" @refresh="handleRefresh" />
</template>

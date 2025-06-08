<!-- eslint-disable @typescript-eslint/unified-signatures -->
<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination'

defineProps<{
  page: number
  totalPages: number
}>()

const emit = defineEmits<{
  (e: 'prev'): void
  (e: 'next'): void
}>()
</script>

<template>
  <Pagination
    class="mt-4"
    :page="page"
    :items-per-page="1"
    :total="totalPages"
  >
    <PaginationContent>
      <PaginationItem :value="page-1">
        <PaginationPrevious :disabled="page <= 1" @click="emit('prev')" />
      </PaginationItem>

      <PaginationItem :value="page">
        <span class="text-sm text-muted-foreground px-4 py-2">
          Page {{ page }} of {{ totalPages }}
        </span>
      </PaginationItem>

      <PaginationItem :value="page+1">
        <PaginationNext
          :disabled="page >= totalPages"
          @click="emit('next')"
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
</template>

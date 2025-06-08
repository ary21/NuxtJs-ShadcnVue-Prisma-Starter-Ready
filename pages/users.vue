<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { ref } from 'vue'
import UserTable from '@/components/user/data-table.vue'
import PaginationWrapper from '@/components/PaginationWrapper.vue'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { useDebounceFn } from '@vueuse/core'
import type { User } from '@prisma/client'
import CreateUserDialog from '@/components/user/create-user-dialog.vue'
import type { PaginatedResponse } from '~/types/data'

export type UserResponse = PaginatedResponse<User>
const route = useRoute()
const router = useRouter()

// State
const search = ref((route.query.search as string) || '')
const page = ref(Number(route.query.page) || 1)
const pageSize = 10

// Fetch data
const { data: users, pending, refresh } = await useFetch<UserResponse>('/api/users', {
  query: () => ({
    page: page.value,
    limit: pageSize,
    search: search.value,
  }),
  watch: [page, search],
})

// Debounced search update
const updateSearch = useDebounceFn((val: string) => {
  router.push({ query: { ...route.query, search: val, page: 1 } })
  search.value = val
}, 500)

// Wrapper to handle string | number payloads from v-model event
function handleUpdateSearch(payload: string | number) {
  updateSearch(String(payload))
}

// Pagination
const nextPage = () => {
  if ((users.value?.page ?? 1) < (users.value?.totalPages ?? 1)) {
    page.value++
    router.push({ query: { ...route.query, page: page.value } })
  }
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
    router.push({ query: { ...route.query, page: page.value } })
  }
}

function handleUserCreated() {
  refresh()
}

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
</script>

<template>
  <div class="p-4">
    <div class="mb-4">
      <h1 class="text-2xl font-semibold">User Akses</h1>
      <p>Manajemen data akses user admin</p>
      <div v-if="pending" class="space-y-2 mt-4">
        <div class="h-10 w-full max-w-sm">
          <Skeleton class="h-10 w-full" />
        </div>
        <div v-for="i in 5" :key="i" class="flex gap-2">
          <Skeleton class="h-10 w-1/4" />
          <Skeleton class="h-10 w-1/4" />
          <Skeleton class="h-10 w-1/4" />
          <Skeleton class="h-10 w-1/4" />
        </div>
      </div>
      <div v-else>
        <div class="flex items-center justify-between mb-4">
          <Input 
            v-model="search"
            placeholder="Pencarian berdasar nama atau email..."
            class="max-w-xs"
            @update:model-value="handleUpdateSearch"
          />
          <CreateUserDialog @created="handleUserCreated" />
        </div>
        <UserTable :users="users?.data || []" @refresh="refresh" />
        <PaginationWrapper :page="page" :total-pages="users?.totalPages || 1" @prev="prevPage" @next="nextPage" />
      </div>
    </div>
  </div>
</template>
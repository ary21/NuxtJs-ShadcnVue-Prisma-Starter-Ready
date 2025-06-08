<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import type { User } from '@prisma/client';
import EditUserDialog from './edit-user-dialog.vue'
import DeleteUserDialog from './delete-user-dialog.vue'

const props = defineProps<{ user: User }>()

// Get the refresh function from the DataTable component
const refreshTable = inject('datatable-refresh') as () => void
const showEditDialog = ref(false)
const showDeleteDialog = ref(false)

function onEdit() {
  showEditDialog.value = true
}

function onDelete() {
  showDeleteDialog.value = true
}

function handleUpdated() {
  refreshTable()
  showEditDialog.value = false
}

function handleDeleted() {
  refreshTable()
  showDeleteDialog.value = false
}
</script>

<template>
  <div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <button class="p-2 rounded hover:bg-muted">
          <MoreHorizontal :size="16" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem class="cursor-pointer" @click="onEdit">Edit</DropdownMenuItem>
        <DropdownMenuItem class="cursor-pointer text-red-600 focus:text-red-600" @click="onDelete">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <EditUserDialog 
      :show="showEditDialog"
      :user="user"
      @close="showEditDialog = false"
      @updated="handleUpdated"
    />
    <DeleteUserDialog
      :show="showDeleteDialog"
      :user="user"
      @close="showDeleteDialog = false"
      @deleted="handleDeleted"
    />
  </div>
</template>

<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from 'vue-sonner'
import type { User } from '@prisma/client'

const props = defineProps<{
  show: boolean
  user: User
}>()

const emit = defineEmits(['close', 'deleted'])
const loading = ref(false)

async function onConfirm() {
  try {
    loading.value = true
    await $fetch('/api/users/delete', {
      method: 'POST',
      body: {
        ids: [props.user.id]
      }
    })
    
    toast.success('User berhasil dihapus')
    emit('close')
    emit('deleted')
  } catch (error: any) {
    toast.error(error?.message || 'Terjadi kesalahan')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AlertDialog :open="show" @update:open="emit('close')">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Hapus User</AlertDialogTitle>
        <AlertDialogDescription>
          Apakah Anda yakin ingin menghapus user "{{ user.name }}"? <br>
          Aksi ini tidak dapat dibatalkan.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel :disabled="loading">Batal</AlertDialogCancel>
        <AlertDialogAction 
          :disabled="loading"
          @click="onConfirm"
        >
          {{ loading ? 'Menghapus...' : 'Ya, Hapus' }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
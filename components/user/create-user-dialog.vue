<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'vue-sonner'
import { z } from 'zod'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

const open = ref(false)
const loading = ref(false)

const createUserSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, 'Nama wajib diisi'),
    email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
    passwordConfirm: z.string().min(1, 'Konfirmasi password wajib diisi')
  }).refine((data) => data.password === data.passwordConfirm, {
    message: "Password tidak sama",
    path: ["passwordConfirm"]
  })
)

const { handleSubmit, resetForm, errors, meta, values } = useForm({
  validationSchema: createUserSchema,
  validateOnMount: false,
  initialValues: {
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  }
})

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true
    const { passwordConfirm, ...userData } = values
    
    await $fetch('/api/users', {
      method: 'POST',
      body: userData
    })
    
    toast.success('User berhasil dibuat')
    open.value = false
    resetForm()
    emit('created')
  } catch (error: any) {
    toast.error(error?.message || 'Terjadi kesalahan')
  } finally {
    loading.value = false
  }
})

const emit = defineEmits(['created'])
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger asChild>
      <Button class="mb-4">Tambah User Baru</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Tambah User Baru</DialogTitle>
      </DialogHeader>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div class="space-y-2">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input type="name" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class="space-y-2">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class="space-y-2">
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Minimal 6 digits" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class="space-y-2">
          <FormField v-slot="{ componentField }" name="passwordConfirm">
            <FormItem>
              <FormLabel>Konfirmasi Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Harus sama dengan password" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <Button type="submit" :disabled="loading">
          {{ loading ? 'Membuat User...' : 'Buat User' }}
        </Button>
      </form>
    </DialogContent>
  </Dialog>
</template>
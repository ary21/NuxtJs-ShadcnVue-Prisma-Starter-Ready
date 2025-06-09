<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { loginSchema, type LoginSchema } from '../schemas/loginSchema'
import { toast } from 'vue-sonner'
import { navigateTo } from 'nuxt/app'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useAuth } from '~/composables/useAuth'

const { isAuthenticated } = useAuth()
const router = useRouter()

const { handleSubmit, isSubmitting } = useForm<LoginSchema>({
  validationSchema: toTypedSchema(loginSchema),
})

const onSubmit = handleSubmit(async (values) => {
  try {
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: values,
    })
    if (res.token) {
      const { login } = useAuth()
      login(res.token, res.user.id)

      toast.success('Login berhasil, redirecting...')
      await navigateTo('/dashboard', { replace: true })
    } else {
      toast.error('Login gagal, kesalahan sistem.')
    }
  } catch (err) {
    console.error(err);
    toast.error('Email atau password salah')
  }
})

onMounted(() => {
  if (isAuthenticated.value) {
    router.push('/dashboard')
  }
})
</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <h5 class="mb-2">Hi 👋, Login untuk memulai</h5>
    <div class="min-w-sm flex justify-center items-center item-center px-4 my-2">
      <form class="w-full max-w-md p-6 border rounded-lg space-y-6" @submit.prevent="onSubmit">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="you@example.com" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="••••••••" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" class="w-full cursor-pointer" :disabled="isSubmitting">
          <template v-if="isSubmitting">
            <Loader2 class="w-4 h-4 mr-2 animate-spin" />
            Logging in...
          </template>
          <template v-else>
            Login
          </template>
        </Button>
      </form>
    </div>
  </div>
</template>

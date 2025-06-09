<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from 'vue-sonner'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useAuth } from '~/composables/useAuth'
import type { User } from '@prisma/client'

const props = defineProps<{
    show: boolean
}>()

const emit = defineEmits(['close'])
const loading = ref(false)
const { userId } = useAuth()

// Watch for dialog visibility changes
watch(() => props.show, (newValue) => {
    if (newValue && userId.value) {
        fetchUserData()
    }
})

const profileSchema = toTypedSchema(
    z.object({
        name: z.string().min(1, 'Nama wajib diisi'),
        email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
        password: z.string()
            .min(6, 'Password minimal 6 karakter')
            .optional()
            .or(z.string().length(0)),
        passwordConfirm: z.string().optional().or(z.string().length(0))
    })
        .refine((data) => {
            if (data.password || data.passwordConfirm) {
                if (!data.password || data.password.length < 6) return false
                if (!data.passwordConfirm) return false
                return data.password === data.passwordConfirm
            }
            return true
        }, {
            message: "Password tidak sama atau tidak memenuhi syarat",
            path: ["passwordConfirm"]
        })
)

const { handleSubmit, resetForm, errors } = useForm({
    validationSchema: profileSchema,
    validateOnMount: false,
})

async function fetchUserData() {
    try {
        if (!userId.value) return
        const user = await $fetch<User>(`/api/users/${userId.value}`)
        resetForm({
            values: {
                name: user.name,
                email: user.email,
                password: '',
                passwordConfirm: ''
            }
        })
    } catch (error) {
        console.error(error)
        toast.error('Gagal mengambil data user')
    }
}

onMounted(() => {
    console.log("mounted >", props.show, userId.value);
    fetchUserData()
    //   if (props.show) {
    //   }
})

const onSubmit = handleSubmit(async (values) => {
    try {
        loading.value = true
        await $fetch(`/api/users/${userId.value}`, {
            method: 'PUT',
            body: values
        })

        toast.success('Profile berhasil diupdate')
        emit('close')
    } catch (error: any) {
        toast.error(error?.message || 'Terjadi kesalahan')
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <Dialog :open="show" @update:open="emit('close')">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Update Profile</DialogTitle>
            </DialogHeader>
            <form @submit.prevent="onSubmit" class="space-y-4">
                <div class="space-y-2">
                    <FormField v-slot="{ componentField }" name="name">
                        <FormItem>
                            <FormLabel>Nama</FormLabel>
                            <FormControl>
                                <Input v-bind="componentField" />
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
                                <Input type="email" v-bind="componentField" />
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
                                <Input type="password"
                                    placeholder="*Hanya isi jika ingin merubah Password, mins 6 digits"
                                    v-bind="componentField" />
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
                                <Input type="password" v-bind="componentField" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </div>
                <Button type="submit" :disabled="loading">
                    {{ loading ? 'Menyimpan...' : 'Simpan' }}
                </Button>
            </form>
        </DialogContent>
    </Dialog>
</template>
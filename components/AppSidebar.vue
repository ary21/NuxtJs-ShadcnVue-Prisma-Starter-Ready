<script setup lang="ts">
import { User2, ChevronUp, GalleryVerticalEnd } from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import UserProfileDialog from '@/components/user/profile-dialog.vue'
import { menuItems } from "~/common/constant";
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'

const router = useRouter()
const { logout } = useAuth()
const loading = ref(false)
const showProfileDialog = ref(false)

function handleProfileClick() {
  showProfileDialog.value = true
}

async function handleLogout() {
  try {
    loading.value = true
    // Call logout API
    await $fetch('/api/auth/logout', {
      method: 'POST'
    })
    
    // Use auth composable to clear state
    logout()
    
    // Redirect to login
    await router.push('/login')
  } catch (error) {
    console.error('Logout failed:', error)
  } finally {
    loading.value = false
  }
}

// interface Props {
//   modelValue?: boolean
// }
// const props = defineProps<Props>()

// import { ref } from 'vue'
// import { useMediaQuery } from '@vueuse/core'
// const props = withDefaults(defineProps<SidebarProps>(), {
//   collapsible: 'icon',
//   open: false,
// })

// const isMobile = useMediaQuery('(max-width: 768px)')
// const sidebarRef = ref<HTMLElement | null>(null)
// const emit = defineEmits(['update:open'])

// function handleEnter() {
//   emit('update:modelValue', true)
// }

// function handleLeave() {
//   emit('update:modelValue', false)
// }

// Menu items.
const items = menuItems;
</script>

<template>
  <Sidebar 
    collapsible="icon"
    class="transition-all duration-300"
  >
    <SidebarHeader class="flex flex-row">
      <div
        class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <component :is="GalleryVerticalEnd" class="size-4" />
      </div>
      <div class="grid flex-1 text-left text-sm leading-tight">
        <span class="truncate font-medium">
          ZBT
        </span>
        <span class="truncate text-xs">Zaid Bin Tsabit</span>
      </div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Main Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton asChild>
                <a :href="item.url">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <User2 /> User Profile
                <ChevronUp class="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" class="w-[--reka-popper-anchor-width]">
              <DropdownMenuItem class="cursor-pointer" @click="handleProfileClick">
                <span>Update Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem class="cursor-pointer text-red-600 focus:text-red-600" :disabled="loading" @click="handleLogout">
                <span>{{ loading ? 'Logging out...' : 'Logout' }}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
  <UserProfileDialog 
    :show="showProfileDialog" 
    @close="showProfileDialog = false"
  />
</template>
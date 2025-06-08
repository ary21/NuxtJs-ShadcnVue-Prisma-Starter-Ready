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
import { menuItems } from "~/common/constant";

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
                <User2 /> Username
                <ChevronUp class="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" class="w-[--reka-popper-anchor-width]">
              <DropdownMenuItem>
                <span>User Akun</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Keluar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
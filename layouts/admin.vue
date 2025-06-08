<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ChevronRight, Menu } from 'lucide-vue-next' // tambahkan import ini
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import AppSidebar from "@/components/AppSidebar.vue";
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { menuItems } from '~/common/constant';

const route = useRoute()
const menu = menuItems.find((item: any) => item.url === route.path)

// const route = useRoute()
const isSidebarOpen = ref(false)

const triggerIcon = computed(() => {
  return isSidebarOpen.value ? ChevronRight : Menu
})
definePageMeta({
  middleware: 'auth'
})

/**
<SidebarProvider
    v-model:open="isSidebarOpen"
    @mouseenter="isSidebarOpen = true"
    @mouseleave="isSidebarOpen = false"
  >
*/
</script>

<template>
  <SidebarProvider
    v-model:open="isSidebarOpen"
    style="--sidebar-width: 15rem; --sidebar-width-mobile: 20rem;"
  >
    <AppSidebar v-model="isSidebarOpen" />
    <main class="px-4 pt-2 w-full">
      <SidebarInset>
        <header
          class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div class="flex items-center gap-2 px-4">
            <SidebarTrigger class="-ml-1">
              <template #icon>
                <component :is="triggerIcon" class="h-4 w-4" />
              </template>
            </SidebarTrigger>
            <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">
                    Sekolah Tahfizh Zaid Bin Tsabit
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator class="hidden md:block" />
                <BreadcrumbItem class="hidden md:block">
                  <BreadcrumbPage>{{menu?.title}}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
      </SidebarInset>
      <div class="pl-2">
        <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
          <slot />
        </div>
      </div>
    </main>
  </SidebarProvider>
</template>

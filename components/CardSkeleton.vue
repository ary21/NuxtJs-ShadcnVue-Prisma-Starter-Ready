<script setup lang="ts">
interface SidebarProps {
  width?: string
}

const props = withDefaults(defineProps<SidebarProps>(), {
  width: 'min-w-2xs',
})
</script>

<template>
  <div :class="['bg-muted/50 aspect-video rounded-xl', props.width]" />
</template>
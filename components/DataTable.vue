<script setup lang="ts" generic="TData, TValue">
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  type ColumnDef
} from '@tanstack/vue-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}>()

const emit = defineEmits(['refresh'])

// Add a provide/inject key for the refresh function
provide('datatable-refresh', () => emit('refresh'))

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel()
})
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
        <TableHead v-for="header in headerGroup.headers" :key="header.id">
          <span v-if="!header.isPlaceholder">
            <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
          </span>
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
        <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
          <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>

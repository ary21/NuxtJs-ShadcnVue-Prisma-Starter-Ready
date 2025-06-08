import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import DropdownAction from "./data-table-dropdown.vue";
import type { User } from "@prisma/client";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) =>
      h(DropdownAction, {
        user: row.original,
      }),
  },
];

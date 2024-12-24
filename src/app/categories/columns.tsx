import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ICategory } from "../models/categories/categoryModel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const handleDelete = async (category: ICategory) => {
  const confirm = window.confirm(
    `Tem certeza que deseja excluir ${category.name}?`
  );
  if (confirm) {
    console.log(`Categoria ${category.name} excluída com sucesso!`);
  }
};

export const columns: ColumnDef<ICategory>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Ativo",
    cell: ({ row }) => {
      const isActive = row.original.is_active;
      return (
        <Badge variant={isActive ? "default" : "destructive"}>
          {isActive ? "Ativo" : "Inativo"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      const [isDialogOpen, setIsDialogOpen] = useState(false); // Controlando o estado do Dialog

      const closeDialog = () => setIsDialogOpen(false); // Fechar o dialog
      const openDialog = () => setIsDialogOpen(true); // Abrir o dialog
      useEffect(() => {
        console.log(isDialogOpen); // Esse log será chamado apenas quando 'someState' mudar
      }, [isDialogOpen]);
      
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem>
              <a href={`/categories/${category.id}`}>Editar</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
            <Button variant="destructive" onClick={openDialog}>
                                  Excluir
                                </Button>
              {isDialogOpen && ( 
                              <Dialog open={isDialogOpen} onOpenChange={openDialog}>
                              <DialogTrigger>Open</DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                                  <DialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>                            
              )}

            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

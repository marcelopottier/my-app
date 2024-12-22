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
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IProduct } from "../models/product/productModel";

const handleDelete = async (product: IProduct) => {
  const confirm = window.confirm(`Tem certeza que deseja excluir o produto ${product.name}?`);
  if (confirm) {
    console.log(`Produto ${product.name} excluído com sucesso!`);
    // Aqui você pode adicionar a lógica para excluir o produto no banco de dados
  }
};

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nome
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => row.original.category, // Supondo que a categoria seja um objeto com nome
  },
  {
    accessorKey: "price",
    header: "Preço à Vista",
    cell: ({ row }) => `R$ ${row.original.price.cash.toFixed(2)}`, // Exibindo preço com duas casas decimais
  },
  {
    accessorKey: "installmentPrice",
    header: "Preço Parcelado",
    cell: ({ row }) => `R$ ${row.original.price.installment.toFixed(2)}`,
  },
  {
    accessorKey: "stock",
    header: "Estoque",
    cell: ({ row }) => row.original.stock,
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      const [isDialogOpen, setIsDialogOpen] = useState(false);

      const closeDialog = () => setIsDialogOpen(false);
      const openDialog = () => setIsDialogOpen(true);

      useEffect(() => {
        console.log(isDialogOpen); // Log para depuração
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
              <a href={`/products/${product._id}`}>Editar</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button variant="destructive" onClick={openDialog}>
                Excluir
              </Button>
              {isDialogOpen && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger>Open</DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Tem certeza?</DialogTitle>
                      <DialogDescription>
                        Esta ação não pode ser desfeita. O produto será excluído permanentemente.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogContent>
                      <Button variant="destructive" onClick={() => handleDelete(product)}>
                        Confirmar Exclusão
                      </Button>
                      <Button variant="outline" onClick={closeDialog}>
                        Cancelar
                      </Button>
                    </DialogContent>
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

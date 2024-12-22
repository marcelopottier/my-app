"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const validationSchema = z.object({
  name: z.string().min(1, {
    message: "O nome da categoria é obrigatório",
  }),
  isActive: z.boolean().optional(),
});

type FormValues = z.infer<typeof validationSchema>;

export default function AddProduct() {

  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      isActive: true,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const newCategory = await response.json();
        alert(`Categoria ${newCategory.name} adicionada com sucesso!`);
        window.location.href = "/categories";
      } else {
        alert("Erro ao adicionar categoria");
      }
    } catch (error) {
      console.error("Erro ao enviar dados para a API:", error);
      alert("Erro ao adicionar categoria");
    }
  };

  return (
    <div className="sm:ml-14 p-4">
      <div className='flex flex-row justify-between'>
        <h2 className='text-3xl font-bold'>Inserir Categoria</h2>
        <Button>
          <a href='/categories'>Voltar</a>
        </Button>
      </div>
      <div className="flex justify-center h-screen mt-4">
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 max-w-md  lg:max-w-full space-y-5"
          >
            <div className="form-group grid grid-cols-1 lg:grid-cols-4 gap-4 border-2 rounded-md p-4">
              {/* Nome da categoria */}
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome da Categoria</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da Categoria" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* isActive */}
              <FormField
                name="isActive"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ativo</FormLabel>
                    <FormControl>
                      <select
                          {...field}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="">Selecione uma categoria</option>
                          <option value={true}>Ativo</option>
                          <option value={false}>Inativo</option>
                        </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">
                Adicionar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

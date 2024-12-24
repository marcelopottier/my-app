'use client'
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { use, useEffect, useState } from "react";
import { redirect } from "next/dist/server/api-utils";
import toast from "react-hot-toast";

const validationSchema = z.object({
  name: z.string().min(1, {
    message: "O nome da categoria é obrigatório",
  }),
  isActive: z.boolean().optional(),
});

type FormValues = z.infer<typeof validationSchema>;

export default function EditCategory({ params } : { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  const [category, setCategory] = useState<FormValues | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      isActive: true,
    },
  }); 

  useEffect(() => {
    if (slug) {
      fetch(`/api/categories/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setCategory(data);
            form.reset(data);
          }
        })
        .catch((error) => {
          console.error("Erro ao carregar categoria:", error);
        });
    }
  }, [slug, form]);
  
  const onSubmit = async (values: FormValues) => {
    if (slug) {      
      try {
        values.id = slug;
        const response = await fetch(`/api/categories/${slug}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        
        const updatedCategory: any = response;

        if (response) {
          toast.success(`Categoria ${updatedCategory.name} atualizada com sucesso`);
          
        } else {
          alert("Erro ao atualizar categoria");
        }
      } catch (error) {
        console.error("Erro ao atualizar categoria:", error);
      }
    }
  };

  return (
    <div className="sm:ml-14 p-4">
      <div className='flex flex-row justify-between'>
        <h2 className='text-3xl font-bold'>Editar Categoria</h2>
        <Button>
          <a href='/categories'>Voltar</a>
        </Button>
      </div>
      <div className="flex justify-center h-screen mt-4">
        <Form {...form}>
          <form
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
              <Button onClick={ () => toast.success('teste' )}></Button>
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
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

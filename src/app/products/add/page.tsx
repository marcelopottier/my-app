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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Dropzone from "react-dropzone";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import Select from "react-select";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories } from "@/actions";
import { useEffect, useState } from "react";
import { ICategory } from "@/app/models/categories/categoryModel";

const validationSchema = z.object({
  name: z.string().min(1, {
    message: "O nome do produto é obrigatório",
  }),
  sku: z.string().optional(),
  category: z.string().min(1, {
    message: "A categoria é obrigatória",
  }),
  width: z.coerce.number().min(0, {
    message: "A largura deve ser maior ou igual a zero",
  }),
  height: z.coerce.number().min(0, {
    message: "A altura deve ser maior ou igual a zero",
  }),
  depth: z.coerce.number().min(0, {
    message: "A profundidade deve ser maior ou igual a zero",
  }),
  colors: z
    .array(z.string())
    .min(1, { message: "Pelo menos uma cor é obrigatória" }),
  details: z.string().min(1, {
    message: "Os detalhes/características são obrigatórios",
  }),
  design: z.string().min(1, {
    message: "O design é obrigatório",
  }),
  priceCash: z.coerce.number().min(0, {
    message: "O preço à vista deve ser maior ou igual a zero",
  }),
  priceInstallment: z.coerce.number().min(0, {
    message: "O preço parcelado deve ser maior ou igual a zero",
  }),
  media: z
    .array(
      z.object({
        file: z.any(),
        description: z
          .string()
          .min(1, { message: "A descrição da mídia é obrigatória" }),
      })
    )
    .nonempty({ message: "Ao menos uma mídia é obrigatória" }),
});

type FormValues = z.infer<typeof validationSchema>;

export default function AddProduct() {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      sku: "",
      category: "",
      width: 0,
      height: 0,
      depth: 0,
      colors: [] as string[],
      details: "",
      design: "",
      priceCash: 0,
      priceInstallment: 0,
      media: [],
    },
  });

  const { fields, append } = useFieldArray({
    name: "media",
    control: form.control,
  });

  const onSubmit = async (values: FormValues) => {
    try {
      
      const mediaData = values.media.map((media) => ({
        url: /*media.file ? URL.createObjectURL(media.file)*/ "http:exemplo",
        description: media.description || "",
      }));

      const formData = {
        name: values.name,
        sku: values.sku,
        category: values.category,
        dimensions: {
          width: values.width,
          height: values.height,
          depth: values.depth,
        },
        avaliable_colors: values.colors,
        details: values.details,
        design: values.design,
        price: {
          cash: values.priceCash,
          installment: values.priceInstallment,
        },
        medias: mediaData,
        stock: 1
      };
  
      console.log(formData);
  
      // Envia os dados para o servidor
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Envia os dados do formulário
      });
  
      if (!response.ok) {
        throw new Error("Erro ao enviar os dados");
      }
  
      const data = await response.json();
      console.log("Produto adicionado com sucesso:", data);
      // Aqui você pode adicionar lógica para limpar o formulário ou redirecionar o usuário.
    } catch (error) {
      console.error("Erro ao adicionar o produto:", error);
      // Exiba uma mensagem de erro se necessário
    }
  };
  

  return (
    <div className="sm:ml-14 p-4">
      <div className='flex flex-row justify-between'>
        <h2 className='text-3xl font-bold'>Inserir Produtos</h2>
        <Button>
          <a href='/products'>Voltar</a>
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
              {/* Nome do Produto */}
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Produto</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do Produto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* SKU */}
              <FormField
                name="sku"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input placeholder="SKU" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Preço à Vista */}
              <FormField
                name="priceCash"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço à Vista</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o preço à vista"
                        type="number"
                        min={0}
                        step="0.01"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Preço Parcelado */}
              <FormField
                name="priceInstallment"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço Parcelado</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite o preço parcelado"
                        type="number"
                        min={0}
                        step="0.01"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Categoria */}
              <FormField
                name="category"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">Selecione uma categoria</option>
                        {categories?.map((category: any) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dimensões */}
              <FormField
                name="width"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Largura</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Largura (cm)"
                        type="number"
                        min={0}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="height"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Altura</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Altura (cm)"
                        type="number"
                        min={0}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="depth"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profundidade</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Profundidade (cm)"
                        type="number"
                        min={0}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="colors"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cores Disponíveis</FormLabel>
                    <FormControl>
                      <Select
                        isMulti
                        options={[
                          { value: "vermelho", label: "Vermelho" },
                          { value: "azul", label: "Azul" },
                          { value: "verde", label: "Verde" },
                        ]}
                        value={field.value?.map((color: string) => ({
                          value: color,
                          label: color.charAt(0).toUpperCase() + color.slice(1),
                        }))}
                        onChange={(selected) =>
                          field.onChange(selected.map((option) => option.value))
                        }
                        placeholder="Selecione as cores"
                        styles={{
                          control: (base) => ({
                            ...base,
                            borderColor: "#E5E7EB",
                          }),
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="details"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detalhes/Características</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Descrição curta"
                        maxLength={100}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="design"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Design</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Escreva os detalhes do design"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="relative media_name_price_desc grid grid-cols-1 lg:grid-cols-4">
              {fields.map((_, index) => {
                return (
                  <div key={index}>
                    <div className="mt-7 mb-2 text-xl font-bold">
                      {form.getValues(`media.${index}.file.name`)}
                    </div>
                    <div className="flex gap-x-3">
                      <FormField
                        control={form.control}
                        key={index + 1}
                        name={`media.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descritivo de Mídia</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Ex: foto interior guarda-roupa XX"
                              />
                            </FormControl>
                            <FormMessage className="text-red-500 capitalize" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="relative media">
              <FormField
                control={form.control}
                name="media"
                render={() => (
                  <Dropzone
                    accept={{
                      "image/*": [".jpg", ".jpeg", ".png", ".gif"],
                      "video/*": [".mp4", ".mov", ".avi"],
                    }}
                    onDropAccepted={(acceptedFiles) => {
                      acceptedFiles.map((acceptedFile) => {
                        return append({
                          file: acceptedFile,
                          description: "",
                        });
                      });
                    }}
                    multiple={true}
                    maxSize={5000000}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps({
                          className: cn(
                            "p-3 mb-4 flex flex-col items-center justify-center w-full rounded-md cursor-pointer border border-[#e2e8f0]"
                          ),
                        })}
                      >
                        <div className="flex items-center gap-x-3 mt-2 mb-2">
                          <label
                            htmlFor="media"
                            className={`text-sm text-[7E8DA0] cursor-pointer focus:outline-none focus:underline ${
                              form.formState.errors.media && "text-red-500"
                            }`}
                            tabIndex={0}
                          >
                            Adicione imagens ao produto
                            <input {...getInputProps()} />
                          </label>
                        </div>
                      </div>
                    )}
                  </Dropzone>
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

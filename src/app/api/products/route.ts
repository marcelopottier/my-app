
import { supabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

// Endpoint para obter todos os produtos
export async function GET() {
  try {
    const { data: products, error } = await supabase
      .from('products') // Nome da tabela no Supabase
      .select('*');

    if (error) throw error;

    return NextResponse.json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
  }
}

// Endpoint para editar um produto
export async function PUT(req: Request) {
  try {
    const { id, name, isActive } = await req.json(); // Obtém os dados da requisição

    const { data: updatedProduct, error } = await supabase
      .from('products')
      .update({ name, isActive })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.message === "Row not found") {
        return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
      }
      throw error;
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Erro ao editar produto:', error);
    return NextResponse.json({ error: 'Erro ao editar produto' }, { status: 500 });
  }
}

// Endpoint para excluir um produto
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      if (error.message === "Row not found") {
        return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
      }
      throw error;
    }

    return NextResponse.json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    return NextResponse.json({ error: 'Erro ao excluir produto' }, { status: 500 });
  }
}

// Endpoint para criar um novo produto
export async function POST(req: Request) {
  try {
    const {
      name,
      sku,
      category,
      dimensions,
      available_colors,
      details,
      design,
      price,
      medias,
      stock,
    } = await req.json();


    const { data: newProduct, error } = await supabase
      .from('products')
      .insert([
        {
          name,
          sku,
          category,
          dimensions,
          available_colors,
          details,
          design,
          price,
          medias,
          stock,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return NextResponse.json({ error: 'Erro ao criar produto', data: error }, { status: 500 });
  }
}

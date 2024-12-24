
import { supabase } from "@/lib/mongodb";
import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

// Função para padronizar erros
function errorResponse(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;

    // Busca a categoria pelo ID (slug)
    const { data: category, error } = await supabase
      .from('categories') // Nome da tabela no Supabase
      .select('*')
      .eq('id', slug) // Filtra pelo ID (slug)
      .single(); // Garante que retorna apenas um registro

    if (error) {
      if (error.message === "Row not found") {
        return NextResponse.json({ error: 'Categoria não encontrada', data: params }, { status: 404 });
      }
      throw error;
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error('Erro ao buscar categoria:', error);
    return NextResponse.json({ error: 'Erro ao buscar categoria' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, name, is_active } = await req.json();
    console.log(id, name, is_active);
    
    if (!id) {
      return errorResponse("O campo 'id' é obrigatório", 400);
    }

    const { data, error } = await supabase
      .from('categories')
      .update({ name, is_active })
      .eq('id', id)
      .select();
    
    if (error) {
      throw error;
    }
    
    if (!data || data.length === 0) { // Verifica se dados foram retornados
      return errorResponse('Categoria não encontrada', 404);
    }

    return NextResponse.json(data[0]);
    
  } catch (error) {
    console.error('Erro ao editar categoria:', error);
    return errorResponse('Erro ao editar categoria');
  }
}



import { supabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

function errorResponse(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET() {
  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true);
      
    if (error) {
      throw error;
    }

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return errorResponse('Erro ao buscar categorias');
  }
}

// Endpoint para criar uma nova categoria
export async function POST(req: Request) {
  try {
    const { name, isActive } = await req.json();

    if (!name) {
      return errorResponse("O campo 'name' é obrigatório", 400);
    }

    const { data, error } = await supabase
      .from('categories') // Nome da tabela no Supabase
      .insert({ name, is_active: isActive ?? true, created_at: new Date().toISOString() });

    if (error) {
      throw error;
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    return errorResponse('Erro ao criar categoria');
  }
}

// Endpoint para excluir uma categoria
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return errorResponse("O campo 'id' é obrigatório", 400);
    }

    const { data, error } = await supabase
      .from('categories') // Nome da tabela no Supabase
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return errorResponse('Categoria não encontrada', 404);
    }

    return NextResponse.json({ message: 'Categoria excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir categoria:', error);
    return errorResponse('Erro ao excluir categoria');
  }
}

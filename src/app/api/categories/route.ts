import { NextResponse } from 'next/server';
import Category from '@/app/models/categories/categoryModel';

// Endpoint para obter todas as categorias
export async function GET() {
  try {
    const categories = await Category.find({ isActive: true }).lean();
    const formattedCategories = categories.map((category: { _id: any }) => ({
      ...category,
      _id: category._id.toString(),
    }));

    return NextResponse.json(formattedCategories);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return NextResponse.json({ error: 'Erro ao buscar categorias' }, { status: 500 });
  }
}

// Endpoint para editar uma categoria
export async function PUT(req: Request) {
  try {
    const { id, name, isActive } = await req.json(); // Obtém os dados da requisição

    const category = await Category.findByIdAndUpdate(
      id,
      { name, isActive },
      { new: true } // Retorna o documento atualizado
    );

    if (!category) {
      return NextResponse.json({ error: 'Categoria não encontrada' }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error('Erro ao editar categoria:', error);
    return NextResponse.json({ error: 'Erro ao editar categoria' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return NextResponse.json({ error: 'Categoria não encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Categoria excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir categoria:', error);
    return NextResponse.json({ error: 'Erro ao excluir categoria' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, isActive } = await req.json();

    const newCategory = new Category({
      name,
      isActive: isActive || true,
      createdAt: new Date(),
    });

    await newCategory.save();

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    return NextResponse.json({ error: 'Erro ao criar categoria' }, { status: 500 });
  }
}

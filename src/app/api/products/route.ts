import productModel from '@/app/models/product/productModel';
import { NextResponse } from 'next/server';

// Endpoint para obter todas as categorias
export async function GET() {
  try {
    const categories = await productModel.find({}).lean();
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

    const product = await productModel.findByIdAndUpdate(
      id,
      { name, isActive },
      { new: true } // Retorna o documento atualizado
    );

    if (!product) {
      return NextResponse.json({ error: 'Categoria não encontrada' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Erro ao editar categoria:', error);
    return NextResponse.json({ error: 'Erro ao editar categoria' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
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
    // Extrair os dados do corpo da requisição
    const {
      sku,
      uniqueId,
      category,
      dimensions,
      availableColors,
      description,
      design,
      price,
      medias,
      stock,
    } = await req.json();

    // Criar o novo produto com os dados recebidos
    const newProduct = new productModel({
      sku,
      uniqueId, // ID único obrigatório
      category,
      dimensions, // Contém width, height e depth
      availableColors,
      description,
      design,
      price, // Contém cash e installment
      medias, // Lista de mídias
      stock,
    });

    // Salvar o novo produto no banco de dados
    await newProduct.save();

    // Retornar o produto criado com sucesso
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    // Em caso de erro, exibir a mensagem de erro no console e retornar resposta de erro
    console.error('Erro ao criar produto:', error);
    return NextResponse.json({ error: 'Erro ao criar produto', data: error }, { status: 500 });
  }
}

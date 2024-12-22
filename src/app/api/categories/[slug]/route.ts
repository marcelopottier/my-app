import Category from "@/app/models/categories/categoryModel";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { slug: string } }) {
    try { 
      const category = await Category.findById(params.slug).lean();
      if (!category) {
        return NextResponse.json({ error: 'Categoria não encontrada', data: params }, { status: 404 });
      }
      return NextResponse.json(category);
    } catch (error) {
      console.error('Erro ao buscar categoria:', error);
      return NextResponse.json({ error: 'Erro ao buscar categoria' }, { status: 500 });
    }
  }
"use server";

import Category from "./app/models/categories/categoryModel";
import { connectToDatabase } from "./lib/mongodb";

export const getCategories = async () => {
  try {
    await connectToDatabase();
    const categories = await Category.find({ isActive: true }).lean();
    const formattedCategories = categories.map((category: { _id: any }) => ({
      ...category,
      _id: category._id.toString(),
    }));

    console.log('Categorias formatadas:', formattedCategories);

    return formattedCategories;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }
};

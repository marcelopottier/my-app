import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  sku?: string; // SKU opcional
  uniqueId: string; // ID único obrigatório
  category: string; // Categoria do produto
  dimensions: {
    width: number;
    height: number;
    depth: number;
  }; // Dimensões do produto
  availableColors: string[]; // Lista de cores disponíveis
  description: string; // Descrição/características do produto
  design: string; // Design do produto
  price: {
    cash: number; // Preço à vista
    installment: number; // Preço parcelado
  };
  medias: {
    url: string; // URL pública do arquivo (gerada pelo Nextcloud e encurtada pelo Shlink)
    description?: string; // Descritivo para ajudar a IA
  }[]; // Lista de mídias (fotos/vídeos)
  stock: number; // Quantidade em estoque
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true }, // Nome do produto
  sku: { type: String }, // SKU opcional
  category: { type: String, required: true }, // Categoria do produto
  dimensions: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    depth: { type: Number, required: true },
  }, // Dimensões do produto
  availableColors: { type: [String], required: true }, // Cores disponíveis
  description: { type: String, required: true }, // Descrição/características do produto
  design: { type: String, required: true }, // Design do produto
  price: {
    cash: { type: Number, required: true }, // Preço à vista
    installment: { type: Number, required: true }, // Preço parcelado
  },
  medias: [
    {
      url: { type: String, required: true }, // URL pública do arquivo
      description: { type: String }, // Descritivo opcional
    },
  ], // Mídias (fotos/vídeos)
  stock: { type: Number, required: true }, // Estoque
});

export default mongoose.models.products || mongoose.model<IProduct>('products', ProductSchema);


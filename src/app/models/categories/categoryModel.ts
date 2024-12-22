import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  _id: string;
  name: string;
  isActive: boolean;
}

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

// Configuração para transformar o `_id` em string
CategorySchema.set('toJSON', {
  transform: (doc, ret) => {
    ret._id = ret._id.toString(); // Converte ObjectId para string
    return ret; // Retorna o objeto transformado
  },
});

const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;

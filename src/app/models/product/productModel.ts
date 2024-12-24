export interface IProduct {
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
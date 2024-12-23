"use client";
import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'
import productModel, { IProduct } from '../models/product/productModel';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';  
import withAuth from '@/components/AuthProtector';
  
const Page = () => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
      const fetchCategories = async () => {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      };
  
      fetchCategories();
    }, []);
  
  return (
    <section className='sm:ml-14 p-4'>
      <div className='flex flex-col h-screen'>
        <div className='flex flex-row justify-between'>
          <h1 className='mb-6 text-3xl font-bold'>Produtos</h1>
          <Button>
              <a href='/products/add'>Adicionar</a>
          </Button>
        </div>
          <DataTable columns={columns} data={products} />
      </div>
    </section>
  )
}
export default withAuth(Page);
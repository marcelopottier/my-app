'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { ICategory } from '../models/categories/categoryModel';
import withAuth from '@/components/AuthProtector';

const CategoriesPage = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);
  
  return (
    <section className="sm:ml-14 p-4">
      <div className="flex flex-col h-screen">
        <div className="flex flex-row justify-between">
          <h1 className="mb-6 text-3xl font-bold">Categorias</h1>
          <Button>
            <a href="/categories/add">Adicionar</a>
          </Button>
        </div>
        <DataTable columns={columns} data={categories} />
      </div>
    </section>
  );
}

export default withAuth(CategoriesPage);

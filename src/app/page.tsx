"use client";
import { ChartOverview } from '@/components/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Percent, Receipt, Users } from 'lucide-react';
import withAuth from '@/components/AuthProtector';

const Home = () => {

  return (
    <main className='sm:ml-14 p-4'>
      <section className='grid lg:grid-cols-3 grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <div className='flex items-center justify-center'>
              <CardTitle className='text-lg sm:text-xl text-gray-600'>Total Vendas</CardTitle>
              <DollarSign className='ml-auto w-4 h-4'/>
            </div>
            <CardDescription>
                Total de vendas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-base sm:text-lg font-bold'>R$40.000</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className='flex items-center justify-center'>
              <CardTitle className='text-lg sm:text-xl text-gray-600'>Novos Clientes</CardTitle>
              <Users className='ml-auto w-4 h-4'/>
            </div>
            <CardDescription>
                Novos Clientes em 30 dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-base sm:text-lg font-bold'>234</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className='flex items-center justify-center'>
              <CardTitle className='text-lg sm:text-xl text-gray-600'>Pedidos Hoje</CardTitle>
              <Percent className='ml-auto w-4 h-4'/>
            </div>
            <CardDescription>
                Total de pedidos hoje
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-base sm:text-lg font-bold'>34</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className='flex items-center justify-center'>
              <CardTitle className='text-lg sm:text-xl text-gray-600'>Total pedidos</CardTitle>
              <Receipt className='ml-auto w-4 h-4'/>
            </div>
            <CardDescription>
                Total de pedidos em 30 dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-base sm:text-lg font-bold'>300</p>
          </CardContent>
        </Card>

      </section>
      <section className='mt-4 flex flex-col md:flex-row gap-4'>
        <ChartOverview/>
      </section>
    </main>
  );
}

export default withAuth(Home);
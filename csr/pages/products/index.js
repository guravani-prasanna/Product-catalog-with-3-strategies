import { useState, useEffect } from 'react';
import ProductGrid from '../../components/ProductGrid';
import Head from 'next/head';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=20')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-500">
      <Head>
        <title>Products - CSR</title>
      </Head>
      
      <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-2">Discover Products</h1>
          <p className="text-gray-500 font-medium">Find the best tech gadgets and accessories.</p>
        </div>
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            data-testid="search-input"
            placeholder="Search products..." 
            className="w-full pl-11 pr-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm font-medium text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white/50 backdrop-blur rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-96">
              <div className="h-56 bg-gray-200 animate-pulse w-full"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-5/6 mb-6"></div>
                <div className="h-10 bg-gray-200 animate-pulse rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
}
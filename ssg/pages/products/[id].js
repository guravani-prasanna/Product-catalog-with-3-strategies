import { useCart } from '../../components/CartContext';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function ProductDetailPage({ product }) {
  const { addToCart } = useCart();
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div className="max-w-5xl mx-auto mt-8 animate-pulse flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 h-96 bg-gray-200 rounded-3xl"></div>
        <div className="md:w-1/2 space-y-6 py-4">
          <div className="h-12 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded w-full"></div>
          <div className="h-14 bg-gray-200 rounded-xl w-48"></div>
        </div>
      </div>
    );
  }

  if (!product) return <div className="text-center py-20 text-2xl font-bold text-gray-500">Product not found</div>;

  return (
    <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-lg rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row mt-8 border border-white/50 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <Head>
        <title>{product.title}</title>
      </Head>
      <div className="md:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-12 relative group">
        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        <img src={product.thumbnail} alt={product.title} className="max-h-[28rem] object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-700" />
      </div>
      <div className="md:w-1/2 p-10 lg:p-14 flex flex-col justify-center bg-white/60 z-10 relative">
        <div className="mb-2 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 border border-blue-100 w-max">
          {product.category || 'Tech'}
        </div>
        <h1 data-testid="product-title" className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight leading-tight">{product.title}</h1>
        <div className="flex items-center gap-4 mb-6">
          <p className="text-lg font-medium text-gray-500">{product.brand}</p>
          <div className="h-1.5 w-1.5 rounded-full bg-gray-300"></div>
          <div className="flex items-center text-yellow-500 font-bold">
            <span className="mr-1">★</span> {product.rating || '4.8'}
          </div>
        </div>
        <p className="text-5xl font-black text-blue-600 mb-8 tracking-tighter">${product.price}</p>
        <p className="text-gray-600 text-lg mb-10 leading-relaxed">{product.description}</p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-auto">
          <button 
            data-testid="add-to-cart-btn"
            onClick={addToCart}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-bold py-4 px-8 rounded-2xl shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transform transition hover:-translate-y-1 flex items-center justify-center gap-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch('https://dummyjson.com/products?limit=20');
  const data = await res.json();
  
  const paths = data.products.map(product => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();
  
  if (!data || data.message) {
    return { notFound: true };
  }

  return {
    props: {
      product: data,
    },
    revalidate: 60,
  };
}
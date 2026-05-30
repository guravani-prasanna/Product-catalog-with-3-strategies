import Link from 'next/link';
import { useCart } from './CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div data-testid="product-item" className="group bg-white/60 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
      <Link href={`/products/${product.id}`} className="flex-grow flex flex-col relative overflow-hidden">
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm z-10">
          {product.category || 'Tech'}
        </div>
        <div className="h-56 bg-gray-50 relative w-full overflow-hidden flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent z-0"></div>
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500 z-10" 
          />
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{product.title}</h2>
          </div>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow">{product.description}</p>
          <div className="flex items-center justify-between mt-auto">
            <p className="text-2xl font-black text-gray-900">${product.price}</p>
            <div className="flex items-center space-x-1 text-yellow-400 text-sm">
              <span>★</span>
              <span className="text-gray-600 font-medium">{product.rating || '4.5'}</span>
            </div>
          </div>
        </div>
      </Link>
      <div className="p-6 pt-0 mt-2">
        <button 
          data-testid="add-to-cart-btn" 
          onClick={addToCart}
          className="w-full relative overflow-hidden rounded-xl bg-gray-900 text-white font-bold py-3 px-4 shadow-md transition-all duration-300 hover:bg-blue-600 hover:shadow-blue-500/30 group/btn"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover/btn:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add to Cart
          </span>
        </button>
      </div>
    </div>
  );
}
import Link from 'next/link';
import { useCart } from './CartContext';

export default function Header() {
  const { cartCount } = useCart();
  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link href="/products" className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight hover:opacity-80 transition-opacity">
          NovaShop
        </Link>
        <div className="flex items-center gap-6">
          <div className="relative group cursor-pointer">
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-5 rounded-full font-semibold shadow-md hover:shadow-lg transform transition hover:-translate-y-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span data-testid="cart-count">Cart: {cartCount}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

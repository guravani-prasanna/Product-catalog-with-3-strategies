import Header from './Header';
import { CartProvider } from './CartContext';

export default function Layout({ children }) {
  return (
    <CartProvider>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-200 selection:text-blue-900 overflow-hidden relative">
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.15]"></div>
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-3xl pointer-events-none"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/20 blur-3xl pointer-events-none"></div>
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out relative z-10">
          {children}
        </main>
      </div>
    </CartProvider>
  );
}
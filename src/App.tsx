import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { StoreProvider } from './store';
import { Header, Footer } from './components';
import { HomePage, ShopPage, ProductPage, AboutPage, ContactPage, CartPage, NotFoundPage } from './pages';
import { products } from './catalog';

function RouteEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    const titles: Record<string, string> = { '/': 'Everyday, considered', '/shop': 'Shop the collection', '/about': 'Our story', '/contact': 'Get in touch', '/cart': 'Your bag' };
    const product = products.find(item => pathname === `/product/${item.id}`);
    document.title = `${product?.name || titles[pathname] || 'Page not found'} — FORME`;
    window.scrollTo(0, 0);
    document.querySelector<HTMLElement>('#main-content')?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}

export default function App() {
  return <BrowserRouter><StoreProvider>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <RouteEffects />
    <Header />
    <main id="main-content" tabIndex={-1}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
    <Footer />
    <Toaster theme="light" position="bottom-right" closeButton />
  </StoreProvider></BrowserRouter>;
}

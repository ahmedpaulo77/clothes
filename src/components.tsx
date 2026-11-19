import { useState, type FormEvent } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Search, ShoppingBag, Menu } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { useStore } from './store';
import { money, type Product } from './catalog';

export function Header() {
  const { cart } = useStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const search = (event: FormEvent) => {
    event.preventDefault();
    setSearchOpen(false);
    navigate(`/shop${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`);
  };
  return <>
    <div className="announcement"><span>LESS, BUT BETTER.</span><span>Collection 01 — Everyday, considered.</span><span>AN INDEPENDENT CONCEPT LABEL</span></div>
    <header className="site-header">
      <nav className="desktop-nav" aria-label="Main navigation"><NavLink to="/shop">Shop all</NavLink><NavLink to="/about">Our story</NavLink></nav>
      <button className="icon-button mobile-menu" aria-label="Open navigation menu" onClick={() => setMenuOpen(true)}><Menu size={22} /></button>
      <Link to="/" className="wordmark" aria-label="FORME home">FORME<span>®</span></Link>
      <div className="header-actions"><NavLink to="/contact" className="contact-link">Get in touch</NavLink><button className="icon-button" aria-label="Search products" onClick={() => setSearchOpen(true)}><Search size={20} /></button><Link className="bag-link" to="/cart" aria-label={`Shopping bag, ${count} items`}><ShoppingBag size={19} /><span className="bag-text">Bag</span><span className="bag-count">{count}</span></Link></div>
    </header>
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}><DialogContent className="forme-dialog"><DialogTitle>Find your everyday.</DialogTitle><DialogDescription>Search the collection by name, colour or category.</DialogDescription><form onSubmit={search} className="search-form"><label className="sr-only" htmlFor="global-search">Search the collection</label><input id="global-search" autoFocus value={query} onChange={event => setQuery(event.target.value)} placeholder="Try “tee” or “charcoal”" maxLength={100} /><button className="button button-dark" type="submit"><Search size={18} /><span>Search</span></button></form><div className="suggested-searches"><span className="eyebrow">EXPLORE</span>{['T-shirts', 'Layers', 'Bottoms'].map(category => <DialogClose asChild key={category}><Link to={`/shop?category=${encodeURIComponent(category)}`}>{category}<ArrowUpRight size={16} /></Link></DialogClose>)}</div></DialogContent></Dialog>
    <Dialog open={menuOpen} onOpenChange={setMenuOpen}><DialogContent className="forme-dialog mobile-nav-dialog"><DialogTitle>FORME</DialogTitle><DialogDescription>Everyday, considered.</DialogDescription><nav aria-label="Mobile navigation">{[['/', 'Home'], ['/shop', 'Shop all'], ['/about', 'Our story'], ['/contact', 'Get in touch'], ['/cart', `Your bag (${count})`]].map(([path, label]) => <DialogClose asChild key={path}><NavLink to={path}>{label}<ArrowUpRight size={20} /></NavLink></DialogClose>)}</nav></DialogContent></Dialog>
  </>;
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return <article className="product-card">
    <Link className="product-image" to={`/product/${product.id}`} aria-label={`View ${product.name}`}><img src={product.image} alt={`${product.name} in ${product.color}`} loading="lazy" width="600" height="750" />{product.tag && <span className="product-tag">{product.tag}</span>}<span className="product-number">{String(index + 1).padStart(2, '0')}</span><span className="quick-view">Discover the piece <ArrowUpRight size={18} /></span></Link>
    <div className="product-card-info"><Link to={`/product/${product.id}`}>{product.name}</Link><span>{money(product.price)}</span></div>
    <div className="product-card-meta"><span>{product.color}</span><span className="color-dot" style={{ background: product.hex }} aria-label={product.color} /></div>
  </article>;
}

export function Breadcrumb({ current, shop = false }: { current: string; shop?: boolean }) {
  return <nav className="breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span>{shop && <><Link to="/shop">Shop</Link><span>/</span></>}<span aria-current="page">{current}</span></nav>;
}

export function Footer() {
  return <footer className="site-footer">
    <div className="footer-top"><div><span className="eyebrow">LESS NOISE. MORE YOU.</span><h2>Your everyday.<br /><em>In good forme.</em></h2></div><div className="footer-links"><div><h3>EXPLORE</h3><Link to="/shop">Shop the collection</Link><Link to="/about">Our story</Link><Link to="/contact">Get in touch</Link></div><div><h3>YOUR VISIT</h3><Link to="/cart">Shopping bag</Link><Link to="/shop?category=T-shirts">The essentials</Link><Link to="/contact?topic=Sizing">Sizing & questions</Link></div></div><Link className="footer-cta" to="/shop" aria-label="Explore the collection"><ArrowUpRight size={36} /></Link></div>
    <Link to="/" className="footer-wordmark" aria-label="FORME home">FORME<span>®</span></Link>
    <div className="footer-bottom"><span>© 2026 FORME — A portfolio concept.</span><span>Fictional brand · Stock imagery · Demo prices · No real orders</span><Link to="/about">Behind the concept <ArrowRight size={13} /></Link></div>
  </footer>;
}

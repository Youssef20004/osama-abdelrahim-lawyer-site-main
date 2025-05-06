
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // إغلاق القائمة عند تغيير الصفحة
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
          <img src="/static/logo2.webp" alt="مكتب الأستاذ اسامة عبدالرحيم للمحاماه" className="h-20 w-auto" />
        </Link>

        <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
          <nav className="flex items-center space-x-6 rtl:space-x-reverse text-foreground font-medium">
            <Link 
              to="/" 
              className={`transition-colors ${isActive('/') ? 'text-primary font-bold' : 'hover:text-primary'}`}
            >
              الرئيسية
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors ${isActive('/about') ? 'text-primary font-bold' : 'hover:text-primary'}`}
            >
              عن المكتب
            </Link>
            <Link 
              to="/services" 
              className={`transition-colors ${isActive('/services') ? 'text-primary font-bold' : 'hover:text-primary'}`}
            >
              خدماتنا
            </Link>
            <Link 
              to="/articles" 
              className={`transition-colors ${isActive('/articles') ? 'text-primary font-bold' : 'hover:text-primary'}`}
            >
              المقالات
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <ThemeToggle />
            <Button asChild>
              <Link to="/consult">طلب استشارة</Link>
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 rtl:space-x-reverse lg:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-foreground">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* القائمة للأجهزة المحمولة */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <nav className="container flex flex-col py-4 space-y-3 text-foreground font-medium">
            <Link 
              to="/" 
              className={`py-2 transition-colors ${isActive('/') ? 'text-primary font-bold' : 'hover:text-primary'}`}
            >
              الرئيسية
            </Link>
            <Link 
              to="/about" 
              className={`py-2 transition-colors ${isActive('/about') ? 'text-primary font-bold' : 'hover:text-primary'}`}
            >
              عن المكتب
            </Link>
            <Link 
              to="/services" 
              className={`py-2 transition-colors ${isActive('/services') ? 'text-primary font-bold' : 'hover:text-primary'}`}
            >
              خدماتنا
            </Link>
            <Link 
              to="/articles" 
              className={`py-2 transition-colors ${isActive('/articles') ? 'text-primary font-bold' : 'hover:text-primary'}`}
            >
              المقالات
            </Link>
            <Link to="/login" className="text-foreground py-2 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
              لوحة التحكم
            </Link>
            <Button className="w-full mt-4" asChild>
              <Link to="/consult">طلب استشارة</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};


import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Link 
        to="/cars" 
        className="text-gray-600 hover:text-gray-900 transition-colors"
        onClick={() => setIsOpen(false)}
      >
        Browse Cars
      </Link>
      <Link 
        to="/about" 
        className="text-gray-600 hover:text-gray-900 transition-colors"
        onClick={() => setIsOpen(false)}
      >
        About
      </Link>
      <Link 
        to="/contact" 
        className="text-gray-600 hover:text-gray-900 transition-colors"
        onClick={() => setIsOpen(false)}
      >
        Contact
      </Link>
    </>
  );

  const AuthButtons = () => (
    <>
      {user ? (
        <div className="flex flex-col md:flex-row gap-4">
          <Link to="/dashboard" onClick={() => setIsOpen(false)}>
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Button 
            variant="default" 
            onClick={() => {
              signOut();
              setIsOpen(false);
            }}
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <Link to="/login" onClick={() => setIsOpen(false)}>
          <Button variant="default" className="w-full md:w-auto bg-accent hover:bg-accent-dark text-white">
            Sign In
          </Button>
        </Link>
      )}
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-semibold text-gray-900">
            CarRental
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <AuthButtons />
          </div>
          
          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xl font-semibold">Menu</span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <div className="flex flex-col space-y-6">
                  <NavLinks />
                  <div className="pt-6 border-t">
                    <AuthButtons />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

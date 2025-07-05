import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Sun, Moon, Stethoscope, Pill, FolderHeart as HomeIcon, HeartPulse, CalendarDays, Mail, SearchCheck, User as UserIcon, LogOut, LogIn, Settings } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { motion } from 'framer-motion';
import { useUser } from '@/contexts/UserContext.jsx';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Ensure this import path is correct

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, logoutUser, triggerLoginModal } = useUser();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/', icon: <HomeIcon className="h-5 w-5" /> },
    { name: 'Symptom Checker', path: '/symptom-checker', icon: <SearchCheck className="h-5 w-5" /> },
    { name: 'Find Doctors', path: '/find-doctors', icon: <Stethoscope className="h-5 w-5" /> },
    { name: 'Find Medicines', path: '/find-medicines', icon: <Pill className="h-5 w-5" /> },
    { name: 'Appointments', path: '/appointments', icon: <CalendarDays className="h-5 w-5" /> },
    { name: 'Contact Us', path: '/contact', icon: <Mail className="h-5 w-5" /> },
  ];

  const NavLinkItem = ({ to, children, onClick }) => (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out
         ${isActive 
           ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground shadow-inner' 
           : 'text-slate-700 hover:bg-slate-200/50 dark:text-slate-200 dark:hover:bg-slate-700/50'
         }`
      }
    >
      {children}
    </NavLink>
  );

  const handleLogout = () => {
    logoutUser();
    setIsOpen(false); 
    navigate('/'); // Redirect to home on logout
  };

  const handleLoginClick = () => {
    triggerLoginModal();
    setIsOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setIsOpen(false);
  }

  return (
    <nav className="sticky top-0 z-50 shadow-lg glassmorphism">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              className="flex items-center space-x-2"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                <HeartPulse className="h-10 w-10 text-primary" />
              </motion.div>
              <span className="text-2xl font-bold gradient-text">MEDIFIND</span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <motion.div key={item.name} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                <NavLinkItem to={item.path}>
                  {item.icon}
                  <span className="ml-2 text-xs lg:text-sm">{item.name}</span>
                </NavLinkItem>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 p-2 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20">
                    <UserIcon className="h-6 w-6 text-primary" />
                    <span className="hidden lg:inline text-sm text-slate-700 dark:text-slate-200">Hi, {user?.name?.split(' ')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                   <AlertDialog>
                    <AlertDialogTrigger asChild>
                       <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600 dark:text-red-400 focus:bg-red-100 dark:focus:bg-red-700/50 focus:text-red-700 dark:focus:text-red-300 cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                       </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                        <AlertDialogDescription>
                          You will need to re-enter your details to personalize your experience again.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout} className="bg-red-500 hover:bg-red-600">Logout</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" onClick={handleLoginClick} className="hidden md:flex items-center border-primary text-primary hover:bg-primary/10">
                <LogIn className="h-4 w-4 mr-2" /> Login / Sign Up
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6 text-slate-700" />}
            </Button>
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open menu">
                    <Menu className="h-6 w-6 text-slate-700 dark:text-slate-200" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] p-6 bg-background dark:bg-slate-800">
                  <div className="flex justify-between items-center mb-6">
                     <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                        <motion.div 
                          className="flex items-center space-x-2"
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <HeartPulse className="h-8 w-8 text-primary" />
                          <span className="text-xl font-bold gradient-text">MEDIFIND</span>
                        </motion.div>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close menu">
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                  {user ? (
                    <div className="mb-4 p-3 rounded-md bg-primary/10 dark:bg-primary/20">
                      <div className="flex items-center space-x-2 text-sm font-medium text-primary dark:text-primary-foreground">
                        <UserIcon className="h-5 w-5" />
                        <span>Hello, {user?.name}!</span>
                      </div>
                      <Button variant="link" className="text-primary p-0 h-auto mt-1 text-xs flex items-center" onClick={handleProfileClick}>
                        <Settings className="h-3 w-3 mr-1" /> My Profile
                      </Button>
                       <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="link" className="text-red-500 p-0 h-auto mt-1 text-xs flex items-center">
                            <LogOut className="h-3 w-3 mr-1" /> Logout
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                            <AlertDialogDescription>
                              You will need to re-enter your details to personalize your experience again.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleLogout} className="bg-red-500 hover:bg-red-600">Logout</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ) : (
                     <Button variant="outline" className="w-full mb-4 flex items-center border-primary text-primary hover:bg-primary/10" onClick={handleLoginClick}>
                        <LogIn className="h-4 w-4 mr-2" /> Login / Sign Up
                      </Button>
                  )}
                  <nav className="flex flex-col space-y-3">
                    {navItems.map((item) => (
                      <NavLinkItem key={item.name} to={item.path} onClick={() => setIsOpen(false)}>
                        {item.icon}
                        <span className="ml-2">{item.name}</span>
                      </NavLinkItem>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
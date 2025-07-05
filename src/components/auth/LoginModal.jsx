import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/contexts/UserContext.jsx';
import { useToast } from '@/components/ui/use-toast';
import { User, Phone, Cake, Mail } from 'lucide-react';

const LoginModal = ({ isOpen, onOpenChange, onLoginSuccess, isDismissable = true }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const { loginUser } = useUser();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !age || !email) {
      toast({
        title: "Uh oh! Missing fields",
        description: "Please fill in all the details.",
        variant: "destructive",
      });
      return;
    }
    const ageNum = parseInt(age);
    if (!/^\d+$/.test(age) || ageNum <= 0 || ageNum > 120) {
      toast({
        title: "Invalid Age",
        description: "Please enter a valid age (must be a positive number and less than 120).",
        variant: "destructive",
      });
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
     if (!/^\+?[1-9]\d{1,14}$/.test(phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number (e.g., +911234567890 or 1234567890).",
        variant: "destructive",
      });
      return;
    }

    loginUser({ name, phone, age: ageNum.toString(), email, healthDetailsProvided: false });
    toast({
      title: "Welcome to MEDIFIND!",
      description: "Your basic details have been saved.",
      className: "bg-green-500 text-white",
    });
    
    if (onLoginSuccess) {
      onLoginSuccess();
    } else {
      onOpenChange(false); // Fallback if no specific success handler
    }
  };
  
  const handleOpenChange = (open) => {
    if (isDismissable) {
      onOpenChange(open);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent 
        className="sm:max-w-[425px] bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-sky-900"
        onInteractOutside={(e) => {
          if (!isDismissable) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e) => {
          if (!isDismissable) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center gradient-text">Welcome to MEDIFIND</DialogTitle>
          <DialogDescription className="text-center text-slate-600 dark:text-slate-300">
            Please enter your details to personalize your experience.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="name" className="text-left flex items-center text-slate-700 dark:text-slate-200">
                <User className="mr-2 h-5 w-5 text-primary" /> Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full bg-white/70 dark:bg-slate-800/70 border-slate-300 dark:border-slate-600 focus:border-primary"
                required
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="email" className="text-left flex items-center text-slate-700 dark:text-slate-200">
                <Mail className="mr-2 h-5 w-5 text-primary" /> Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. john.doe@example.com"
                className="w-full bg-white/70 dark:bg-slate-800/70 border-slate-300 dark:border-slate-600 focus:border-primary"
                required
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="phone" className="text-left flex items-center text-slate-700 dark:text-slate-200">
                <Phone className="mr-2 h-5 w-5 text-primary" /> Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full bg-white/70 dark:bg-slate-800/70 border-slate-300 dark:border-slate-600 focus:border-primary"
                required
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-2">
              <Label htmlFor="age" className="text-left flex items-center text-slate-700 dark:text-slate-200">
                <Cake className="mr-2 h-5 w-5 text-primary" /> Age
              </Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 30"
                className="w-full bg-white/70 dark:bg-slate-800/70 border-slate-300 dark:border-slate-600 focus:border-primary"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Save & Continue
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
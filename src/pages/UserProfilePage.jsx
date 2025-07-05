import React, { useState, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { User, Mail, Phone, Cake, Activity, Edit3, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { Navigate } from 'react-router-dom';

const UserProfilePage = () => {
  const { user, updateUserProfile, isLoading } = useUser();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    healthDetails: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        age: user.age || '',
        healthDetails: user.healthDetails || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ageNum = parseInt(formData.age);
    if (!/^\d+$/.test(formData.age) || ageNum <= 0 || ageNum > 120) {
      toast({
        title: "Invalid Age",
        description: "Please enter a valid age (must be a positive number and less than 120).",
        variant: "destructive",
      });
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
     if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number (e.g., +911234567890 or 1234567890).",
        variant: "destructive",
      });
      return;
    }

    const success = updateUserProfile({ ...formData, age: ageNum.toString() });
    if (success) {
      toast({
        title: 'Profile Updated!',
        description: 'Your profile details have been saved successfully.',
        className: "bg-green-500 text-white",
      });
      setIsEditing(false);
    } else {
      toast({
        title: 'Update Failed',
        description: 'Could not update your profile. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><p>Loading profile...</p></div>;
  }

  if (!user && !isLoading) {
    return <Navigate to="/" replace />;
  }
  
  const ProfileField = ({ icon, label, name, value, type = "text", isEditing, onChange, placeholder, children, rows }) => (
    <div className="space-y-1">
      <Label htmlFor={name} className="text-sm font-medium text-slate-600 dark:text-slate-300 flex items-center">
        {React.cloneElement(icon, { className: "h-5 w-5 mr-2 text-primary"})}
        {label}
      </Label>
      {isEditing ? (
        type === "textarea" ? (
          <Textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows || 3}
            className="bg-white/80 dark:bg-slate-700/80 border-slate-300 dark:border-slate-600 focus:border-primary"
          />
        ) : (
          <Input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="bg-white/80 dark:bg-slate-700/80 border-slate-300 dark:border-slate-600 focus:border-primary"
          />
        )
      ) : (
        <p className="text-slate-800 dark:text-slate-100 text-lg p-2 rounded-md bg-slate-100 dark:bg-slate-700 min-h-[40px]">
          {value || (children || "Not provided")}
        </p>
      )}
    </div>
  );


  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12"
    >
      <Card className="max-w-2xl mx-auto shadow-2xl glassmorphism">
        <CardHeader className="text-center border-b pb-6">
          <div className="inline-block p-3 bg-gradient-to-tr from-primary/20 to-pink-500/20 rounded-full mb-4">
            <User className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold gradient-text">My Profile</CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400">
            {isEditing ? "Update your personal information below." : "View and manage your personal information."}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <ProfileField icon={<User />} label="Full Name" name="name" value={formData.name} isEditing={isEditing} onChange={handleChange} placeholder="Enter your full name" />
            <ProfileField icon={<Mail />} label="Email Address" name="email" type="email" value={formData.email} isEditing={isEditing} onChange={handleChange} placeholder="Enter your email address" />
            <ProfileField icon={<Phone />} label="Phone Number" name="phone" type="tel" value={formData.phone} isEditing={isEditing} onChange={handleChange} placeholder="Enter your phone number" />
            <ProfileField icon={<Cake />} label="Age" name="age" type="number" value={formData.age} isEditing={isEditing} onChange={handleChange} placeholder="Enter your age" />
            <ProfileField icon={<Activity />} label="Health Issues/Concerns" name="healthDetails" type="textarea" value={formData.healthDetails} isEditing={isEditing} onChange={handleChange} placeholder="e.g., Frequent headaches, seasonal allergies..." rows={4} />
            
            <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-4">
              {isEditing ? (
                <>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsEditing(false);
                      if (user) setFormData({ name: user.name, email: user.email, phone: user.phone, age: user.age, healthDetails: user.healthDetails || '' });
                    }}
                    className="w-full sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white">
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                </>
              ) : (
                <Button 
                  type="button" 
                  onClick={() => setIsEditing(true)} 
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                >
                  <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserProfilePage;
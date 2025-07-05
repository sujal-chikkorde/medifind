import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; 
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Phone, Mail, MapPin, Send, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const officeLocation = "MEDIFIND Head Office, MG Road, Bangalore, Karnataka, India";

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Incomplete Form",
        description: "Please fill out all fields before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Message Sent!",
      description: `Thank you, ${formData.name}. Your message regarding "${formData.subject}" has been received. We'll get back to you soon. (This is a demo)`,
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleGetDirections = () => {
    const query = encodeURIComponent(officeLocation);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="space-y-12 py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 bg-gradient-to-br from-primary/5 to-pink-500/5 dark:from-primary/10 dark:to-pink-500/10 rounded-xl shadow-lg"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Get In <span className="gradient-text">Touch</span></h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          We're here to help. Reach out to us with any questions or concerns. Our team is based in Bangalore, Karnataka.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-card glassmorphism">
            <CardHeader>
              <CardTitle className="text-2xl">Contact Information</CardTitle>
              <CardDescription>Find us or drop us a line.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100">Our Office</h3>
                  <p className="text-slate-600 dark:text-slate-300">{officeLocation}</p>
                  <Button variant="link" className="p-0 h-auto text-sm text-primary hover:underline" onClick={handleGetDirections}>
                    Get Directions <Navigation className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100">Email Us</h3>
                  <a href="mailto:support@medifind.co.in" className="text-primary hover:underline">support@medifind.co.in</a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100">Call Us (Karnataka)</h3>
                  <a href="tel:+918012345678" className="text-primary hover:underline">+91 80 1234 5678</a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-card glassmorphism">
            <CardHeader>
              <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              <CardDescription>Fill out the form and we'll get back to you.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-slate-700 dark:text-slate-200">Full Name</Label>
                  <Input id="name" type="text" placeholder="Your Name" value={formData.name} onChange={handleChange} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-slate-700 dark:text-slate-200">Email Address</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" value={formData.email} onChange={handleChange} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-slate-700 dark:text-slate-200">Subject</Label>
                  <Input id="subject" type="text" placeholder="Regarding..." value={formData.subject} onChange={handleChange} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="message" className="text-slate-700 dark:text-slate-200">Message</Label>
                  <Textarea id="message" placeholder="Your message here..." value={formData.message} onChange={handleChange} className="mt-1 min-h-[120px]" />
                </div>
                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg">
                  <Send className="h-5 w-5 mr-2" /> Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-12"
      >
        <Card className="bg-card glassmorphism">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Our Location in Bangalore</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden">
              <iframe 
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.5760%2C12.9660%2C77.6160%2C12.9860&layer=mapnik&marker=12.9760%2C77.5960" 
                style={{border: 0, width: '100%', height: '100%'}}
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Map of Bangalore Office Location"
              ></iframe>
            </div>
            <p className="text-center mt-2 text-sm text-slate-500 dark:text-slate-400">Interactive map showing our approximate office location on MG Road, Bangalore.</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ContactPage;
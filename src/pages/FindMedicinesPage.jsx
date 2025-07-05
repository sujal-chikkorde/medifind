import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pill, MapPin, Search, Store, CheckCircle, XCircle, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { getMedicines as fetchAllMedicines } from '@/data/medicines';

const MedicineCard = ({ medicine }) => {
  const { toast } = useToast();
  
  const totalStock = medicine.availability.reduce((sum, avail) => sum + avail.stock, 0);
  const availablePharmacies = medicine.availability.filter(a => a.stock > 0).length;

  const handleGetDirections = (pharmacy) => {
    if (pharmacy.coordinates) {
      const { lat, lng } = pharmacy.coordinates;
      window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
    } else {
      const query = encodeURIComponent(`${pharmacy.pharmacyName}, ${pharmacy.location}`);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm flex flex-col h-full">
        <CardHeader className="flex flex-row items-center gap-4 p-4 bg-gradient-to-br from-sky-500/10 to-teal-500/10 dark:from-sky-500/20 dark:to-teal-500/20">
          <div className="p-3 bg-white rounded-lg shadow">
            <Pill className="h-10 w-10 text-teal-500" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100">{medicine.name}</CardTitle>
            <CardDescription className="text-teal-600 dark:text-teal-400 font-medium">{medicine.category}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-3 flex-grow">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">{medicine.description}</p>
          
          <div className="space-y-2 pt-2">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Overall Availability:</h4>
             {totalStock > 0 ? (
              <div className="flex items-center text-green-600 dark:text-green-400">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>Available in {availablePharmacies} pharmacies (Total: {totalStock} units)</span>
              </div>
            ) : (
              <div className="flex items-center text-red-600 dark:text-red-400">
                <XCircle className="h-4 w-4 mr-2" />
                <span>Currently out of stock</span>
              </div>
            )}
          </div>
          {availablePharmacies > 0 && medicine.availability.find(p => p.stock > 0) && (
            <div className="pt-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Nearest available at: {medicine.availability.find(p => p.stock > 0)?.pharmacyName} ({medicine.availability.find(p => p.stock > 0)?.distance})
              </p>
              <Button 
                variant="link" 
                size="sm" 
                className="p-0 h-auto text-xs text-primary hover:underline"
                onClick={() => handleGetDirections(medicine.availability.find(p => p.stock > 0))}
              >
                Get Directions <Navigation className="h-3 w-3 ml-1" />
              </Button>
            </div>
          )}
        </CardContent>
        <CardContent className="p-4 pt-0 mt-auto">
           <Button asChild variant="default" size="sm" className="w-full bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white shadow-md hover:shadow-lg justify-center">
              <Link to={`/medicines/${medicine.id}`}>
                View Details & All Stock <Store className="h-4 w-4 ml-2" />
              </Link>
            </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const FindMedicinesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [allMedicines, setAllMedicines] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);

  useEffect(() => {
    setAllMedicines(fetchAllMedicines());
  }, []);

  useEffect(() => {
    let medicines = allMedicines;
    if (searchTerm) {
      medicines = medicines.filter(med =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.availability.some(avail => avail.location.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (categoryFilter) {
      medicines = medicines.filter(med => med.category === categoryFilter);
    }
    setFilteredMedicines(medicines);
  }, [searchTerm, categoryFilter, allMedicines]);

  const categories = [...new Set(allMedicines.map(med => med.category))].sort();

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 bg-gradient-to-br from-sky-500/5 to-teal-500/5 dark:from-sky-500/10 dark:to-teal-500/10 rounded-xl shadow-lg"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Find Your <span className="gradient-text bg-gradient-to-r from-sky-500 to-teal-500">Essential Medicines in Karnataka</span></h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Quickly locate pharmacies in Karnataka, India that stock your required medications.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-6 rounded-lg shadow-xl bg-card border border-border glassmorphism"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <Label htmlFor="search-medicine" className="text-sm font-medium text-slate-700 dark:text-slate-200">Search by Name, Description, or Location (Karnataka)</Label>
            <div className="relative mt-1">
              <Input
                id="search-medicine"
                type="text"
                placeholder="e.g., Crocin, cough syrup, Indiranagar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            </div>
          </div>
          <div>
            <Label htmlFor="filter-category" className="text-sm font-medium text-slate-700 dark:text-slate-200">Filter by Category</Label>
            <select
              id="filter-category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-input bg-background rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
            >
              <option value="">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>
      </motion.div>

      {filteredMedicines.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredMedicines.map(medicine => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))}
          </AnimatePresence>
        </div>
      ) : (
         <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <img  alt="No medicines found illustration" className="mx-auto h-40 w-40 mb-4 text-slate-400" src="https://images.unsplash.com/photo-1696861286643-341a8d7a79e9" />
          <p className="text-xl text-slate-500 dark:text-slate-400">No medicines found matching your criteria in Karnataka.</p>
          <p className="text-sm text-slate-400 dark:text-slate-500">Try adjusting your search or filters.</p>
        </motion.div>
      )}
    </div>
  );
};

export default FindMedicinesPage;
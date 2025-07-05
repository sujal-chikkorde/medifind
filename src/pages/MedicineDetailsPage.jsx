import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pill, MapPin, Store, CheckCircle, XCircle, Phone, Mail, Edit3, Package, Info, AlertTriangle, Thermometer, ArrowLeft, Navigation, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { getMedicineById, updateMedicineStock as updateStoreMedicineStock } from '@/data/medicines';

const MedicineInfoHeader = ({ medicine }) => (
  <CardHeader className="p-0 relative">
    <div className="h-56 bg-gradient-to-br from-sky-500/80 to-teal-500/80 flex items-center justify-center">
      <img  alt={`${medicine.name} packaging or related imagery`} className="h-32 w-32 text-white opacity-70" src="https://images.unsplash.com/photo-1547813949-f3e9e32d3ab7" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
      <h1 className="text-3xl md:text-4xl font-bold text-white shadow-black/50 [text-shadow:_0_2px_4px_var(--tw-shadow-color)]">{medicine.name}</h1>
      <p className="text-xl font-medium text-teal-200">{medicine.category}</p>
    </div>
  </CardHeader>
);

const InfoCard = ({ icon, title, value }) => (
  <div className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800/60 flex items-start space-x-3 shadow hover:shadow-md transition-shadow">
    <div className="flex-shrink-0 text-primary pt-1">{icon}</div>
    <div>
      <h4 className="font-semibold text-slate-700 dark:text-slate-200">{title}</h4>
      <p className="text-sm text-slate-600 dark:text-slate-300">{value}</p>
    </div>
  </div>
);

const PharmacyAvailabilityCard = ({ pharmacy, onGetDirections }) => (
  <Card className={`${pharmacy.stock > 0 ? 'border-green-400 dark:border-green-600' : 'border-red-400 dark:border-red-600'} bg-white/60 dark:bg-slate-800/60 hover:shadow-lg transition-shadow`}>
    <CardContent className="p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">{pharmacy.pharmacyName}</h3>
        {pharmacy.stock > 0 ? (
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-700/80 dark:text-green-100 flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" /> In Stock ({pharmacy.stock})
          </span>
        ) : (
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700 dark:bg-red-700/80 dark:text-red-100 flex items-center">
            <XCircle className="h-3 w-3 mr-1" /> Out of Stock
          </span>
        )}
      </div>
      <div className="text-sm text-slate-500 dark:text-slate-400 space-y-1">
        <p className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-primary/70 flex-shrink-0" />{pharmacy.location} ({pharmacy.distance})</p>
        <p className="flex items-center"><Phone className="h-4 w-4 mr-2 text-primary/70 flex-shrink-0" /> <a href={`tel:${pharmacy.phone}`} className="hover:underline">{pharmacy.phone}</a></p>
        <p className="flex items-center"><Mail className="h-4 w-4 mr-2 text-primary/70 flex-shrink-0" /> <a href={`mailto:${pharmacy.email}`} className="hover:underline">{pharmacy.email}</a></p>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-3 w-full text-primary border-primary hover:bg-primary/10"
        onClick={() => onGetDirections(pharmacy)}
      >
        <Navigation className="h-4 w-4 mr-2" /> Get Directions
      </Button>
    </CardContent>
  </Card>
);

const StockUpdateForm = ({ medicine, onStockUpdated }) => {
  const [selectedPharmacyId, setSelectedPharmacyId] = useState(null);
  const [newStockLevel, setNewStockLevel] = useState('');
  const { toast } = useToast();

  const handleStockUpdateSubmit = (e) => {
    e.preventDefault();
    if (!selectedPharmacyId || newStockLevel === '' || isNaN(parseInt(newStockLevel)) || parseInt(newStockLevel) < 0) {
      toast({
        title: 'Invalid Input',
        description: 'Please select a pharmacy and enter a valid non-negative stock number.',
        variant: 'destructive',
      });
      return;
    }
    const updatedMedicine = updateStoreMedicineStock(medicine.id, selectedPharmacyId, parseInt(newStockLevel, 10));
    if (updatedMedicine) {
      onStockUpdated(updatedMedicine);
      toast({
        title: 'Stock Updated',
        description: `Stock for ${medicine.name} at selected pharmacy set to ${newStockLevel}.`,
      });
      setSelectedPharmacyId(null);
      setNewStockLevel('');
    } else {
      toast({
        title: 'Update Failed',
        description: 'Could not update stock. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="bg-slate-50 dark:bg-slate-800/40 glassmorphism p-2 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center text-slate-800 dark:text-slate-100">
          <Edit3 className="h-5 w-5 mr-2 text-primary" /> Update Stock (Shopkeeper)
        </CardTitle>
        <CardDescription>Select a pharmacy to update its stock level for this medicine.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleStockUpdateSubmit} className="space-y-4">
          <div>
            <Label htmlFor="pharmacySelect" className="text-slate-700 dark:text-slate-200">Pharmacy</Label>
            <select 
              id="pharmacySelect" 
              value={selectedPharmacyId || ''} 
              onChange={(e) => setSelectedPharmacyId(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-input bg-background rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
            >
              <option value="" disabled>Select Pharmacy</option>
              {medicine.availability.map(avail => (
                <option key={avail.pharmacyId} value={avail.pharmacyId}>{avail.pharmacyName} - {avail.location.split(',')[0]}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="stockLevel" className="text-slate-700 dark:text-slate-200">New Stock Level</Label>
            <Input 
              id="stockLevel" 
              type="number" 
              min="0"
              value={newStockLevel}
              onChange={(e) => setNewStockLevel(e.target.value)}
              placeholder="e.g., 50" 
              className="mt-1" 
              disabled={!selectedPharmacyId}
            />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={!selectedPharmacyId || newStockLevel === ''}>
            Update Stock
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};


const MedicineDetailsPage = () => {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  
  useEffect(() => {
    const foundMedicine = getMedicineById(id);
    setMedicine(foundMedicine);
  }, [id]);

  const handleStockUpdated = (updatedMedicine) => {
    setMedicine(updatedMedicine);
  };

  const handleGetDirections = (pharmacy) => {
     if (pharmacy.coordinates) {
      const { lat, lng } = pharmacy.coordinates;
      window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank');
    } else {
      const query = encodeURIComponent(`${pharmacy.pharmacyName}, ${pharmacy.location}`);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
    }
  };

  if (!medicine) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
          <Building className="h-16 w-16 text-primary" />
        </motion.div>
        <p className="ml-4 text-xl">Loading medicine details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-8">
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <Button variant="outline" asChild className="mb-6 group">
          <Link to="/find-medicines">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Medicines
          </Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="overflow-hidden shadow-2xl bg-card glassmorphism">
          <MedicineInfoHeader medicine={medicine} />

          <CardContent className="p-6 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-3 text-slate-800 dark:text-slate-100">Description</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{medicine.description}</p>
              </section>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <InfoCard icon={<Package className="h-5 w-5" />} title="Manufacturer" value={medicine.manufacturer} />
                <InfoCard icon={<Info className="h-5 w-5" />} title="Dosage" value={medicine.dosage} />
                <InfoCard icon={<AlertTriangle className="h-5 w-5 text-amber-500" />} title="Side Effects" value={medicine.sideEffects} />
                <InfoCard icon={<Thermometer className="h-5 w-5 text-blue-500" />} title="Storage" value={medicine.storage} />
              </div>

              <section>
                <h2 className="text-2xl font-semibold mt-6 mb-4 text-slate-800 dark:text-slate-100">Availability in Karnataka</h2>
                {medicine.availability.length > 0 ? (
                  <div className="space-y-4">
                    {medicine.availability.map(avail => (
                      <PharmacyAvailabilityCard key={avail.pharmacyId} pharmacy={avail} onGetDirections={handleGetDirections} />
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 dark:text-slate-400">No availability information for this medicine in Karnataka.</p>
                )}
              </section>
            </div>
            
            <aside className="md:col-span-1 space-y-6">
              <StockUpdateForm medicine={medicine} onStockUpdated={handleStockUpdated} />
            </aside>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default MedicineDetailsPage;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, Search, Phone, MessageSquare, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { getDoctors as fetchAllDoctors } from '@/data/doctors'; 

const DoctorCard = ({ doctor }) => {
  const { toast } = useToast();

  const handleCall = () => {
    toast({
      title: "Calling Doctor",
      description: `Initiating call to ${doctor.name} at ${doctor.phone}. (This is a demo)`,
    });
  };
  
  const handleEnquire = () => {
    toast({
      title: "Enquiry Sent",
      description: `Your enquiry for ${doctor.name} has been noted. (This is a demo)`,
    });
  };

  const handleGetDirections = () => {
    const query = encodeURIComponent(`${doctor.name}, ${doctor.location}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm flex flex-col h-full">
        <CardHeader className="flex flex-row items-start gap-4 p-4 bg-gradient-to-br from-primary/10 to-pink-500/10 dark:from-primary/20 dark:to-pink-500/20">
          <Avatar className="h-20 w-20 border-2 border-primary/50">
            <AvatarImage src={`https://source.unsplash.com/random/100x100/?doctor,${doctor.image},indian`} alt={`Dr. ${doctor.name}`} />
            <AvatarFallback>{doctor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-100">{doctor.name}</CardTitle>
            <CardDescription className="text-primary font-medium">{doctor.specialty}</CardDescription>
            <div className="flex items-center mt-1">
              {[...Array(Math.floor(doctor.rating))].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />)}
              {doctor.rating % 1 >= 0.5 && <Star key="half" className="h-4 w-4 text-yellow-400" style={{clipPath: "inset(0 50% 0 0)"}}/>}
              {[...Array(5 - Math.ceil(doctor.rating))].map((_, i) => <Star key={`empty-${i}`} className="h-4 w-4 text-slate-300 dark:text-slate-600" />)}
              <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">({doctor.rating.toFixed(1)} from {doctor.reviews} reviews)</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-3 flex-grow">
          <div className="flex items-start text-sm text-slate-600 dark:text-slate-300">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
            <span>{doctor.location}</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">{doctor.bio}</p>
        </CardContent>
        <CardContent className="p-4 pt-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <Button asChild variant="default" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg">
              <Link to={`/doctors/${doctor.id}`}>View Profile</Link>
            </Button>
            <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-primary/10" onClick={handleCall}>
              <Phone className="h-4 w-4 mr-2" /> Call
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
             <Button variant="outline" className="flex-1 border-secondary text-secondary-foreground hover:bg-secondary/80" onClick={handleEnquire}>
              <MessageSquare className="h-4 w-4 mr-2" /> Enquire
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleGetDirections}>
              <Navigation className="h-4 w-4 mr-2" /> Directions
            </Button>
          </div>
           {doctor.available ? (
            <span className="text-xs text-green-600 dark:text-green-400 font-medium inline-block mt-3">Available for appointments</span>
          ) : (
            <span className="text-xs text-red-600 dark:text-red-400 font-medium inline-block mt-3">Currently unavailable</span>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const FindDoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const [doctorsData, setDoctorsData] = useState([]); 
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    const allDocs = fetchAllDoctors(); 
    const updatedDocs = allDocs.map(doc => {
      const storedReviews = JSON.parse(localStorage.getItem(`reviews_${doc.id}`)) || [];
      const totalRating = storedReviews.reduce((acc, review) => acc + review.rating, 0);
      const averageRating = storedReviews.length > 0 ? (totalRating / storedReviews.length) : doc.rating;
      const numReviews = storedReviews.length > 0 ? storedReviews.length : doc.reviews;
      return {
        ...doc,
        rating: parseFloat(averageRating.toFixed(1)),
        reviews: numReviews,
      };
    });
    setDoctorsData(updatedDocs);
    setFilteredDoctors(updatedDocs);
  }, []);


  useEffect(() => {
    let doctors = [...doctorsData]; 
    if (searchTerm) {
      doctors = doctors.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doc.bio && doc.bio.toLowerCase().includes(searchTerm.toLowerCase())) ||
        doc.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (specialtyFilter) {
      doctors = doctors.filter(doc => doc.specialty === specialtyFilter);
    }
    setFilteredDoctors(doctors);
  }, [searchTerm, specialtyFilter, doctorsData]);

  const specialties = [...new Set(doctorsData.map(doc => doc.specialty))].sort();

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8 bg-gradient-to-br from-primary/5 to-pink-500/5 dark:from-primary/10 dark:to-pink-500/10 rounded-xl shadow-lg"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Find Your <span className="gradient-text">Trusted Doctor in Karnataka</span></h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Search by name, specialty, or location to connect with the best healthcare professionals in Karnataka, India.
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
            <Label htmlFor="search-doctor" className="text-sm font-medium text-slate-700 dark:text-slate-200">Search by Name, Keyword, or Location (Karnataka)</Label>
            <div className="relative mt-1">
              <Input
                id="search-doctor"
                type="text"
                placeholder="e.g., Dr. Sharma, cardiologist, Jayanagar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            </div>
          </div>
          <div>
            <Label htmlFor="filter-specialty" className="text-sm font-medium text-slate-700 dark:text-slate-200">Filter by Specialty</Label>
            <select
              id="filter-specialty"
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-input bg-background rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
            >
              <option value="">All Specialties</option>
              {specialties.map(spec => <option key={spec} value={spec}>{spec}</option>)}
            </select>
          </div>
        </div>
      </motion.div>

      {filteredDoctors.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredDoctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
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
          <img  alt="No doctors found illustration" className="mx-auto h-40 w-40 mb-4 text-slate-400" src="https://images.unsplash.com/photo-1682624400764-d2c9eaeae972" />
          <p className="text-xl text-slate-500 dark:text-slate-400">No doctors found matching your criteria in Karnataka.</p>
          <p className="text-sm text-slate-400 dark:text-slate-500">Try adjusting your search or filters.</p>
        </motion.div>
      )}
    </div>
  );
};

export default FindDoctorsPage;
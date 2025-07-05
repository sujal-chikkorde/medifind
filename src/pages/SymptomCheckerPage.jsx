import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox'; 
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, UserCheck, AlertTriangle, ListChecks, FolderHeart as SearchHeart, Stethoscope, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { symptomsData, getSpecialtiesForSymptoms } from '@/data/symptoms';
import { getDoctors } from '@/data/doctors';

const DoctorResultCard = ({ doctor }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="h-full"
  >
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-card flex flex-col h-full glassmorphism">
      <CardHeader className="flex flex-row items-center gap-4 p-4 bg-gradient-to-br from-primary/10 to-pink-500/10 dark:from-primary/20 dark:to-pink-500/20">
        <Avatar className="h-16 w-16 border-2 border-primary/50 shadow-md">
          <AvatarImage src={`https://source.unsplash.com/random/80x80/?doctor,${doctor.image},indian`} alt={doctor.name} />
          <AvatarFallback>{doctor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100">{doctor.name}</CardTitle>
          <CardDescription className="text-primary font-medium">{doctor.specialty}</CardDescription>
          <div className="flex items-center mt-1">
            {[...Array(Math.floor(doctor.rating))].map((_, i) => <Star key={`star-${i}`} className="h-4 w-4 text-yellow-400 fill-yellow-400" />)}
            {doctor.rating % 1 >= 0.5 && <Star key="half-star" className="h-4 w-4 text-yellow-400" style={{ clipPath: "inset(0 50% 0 0)" }} />}
            <span className="ml-1 text-xs text-slate-500 dark:text-slate-400">({doctor.rating.toFixed(1)} from {doctor.reviews} reviews)</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-2 flex-grow">
        <div className="flex items-start text-sm text-slate-600 dark:text-slate-300">
          <MapPin className="h-4 w-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
          <span>{doctor.location}</span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">{doctor.bio}</p>
      </CardContent>
      <CardContent className="p-4 pt-0">
        <Button asChild variant="default" className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-md hover:shadow-lg">
          <Link to={`/doctors/${doctor.id}`}>View Profile</Link>
        </Button>
      </CardContent>
    </Card>
  </motion.div>
);


const SymptomCheckerPage = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [suggestedSpecialties, setSuggestedSpecialties] = useState([]);
  const [suggestedDoctors, setSuggestedDoctors] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);

  useEffect(() => {
    setAllDoctors(getDoctors());
  }, []);

  const handleSymptomToggle = (symptomId) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  useEffect(() => {
    if (selectedSymptoms.length > 0) {
      const specialties = getSpecialtiesForSymptoms(selectedSymptoms);
      setSuggestedSpecialties(specialties);
      
      const doctors = allDoctors.filter(doc => 
        specialties.includes(doc.specialty) || 
        (specialties.length === 0 && doc.specialty === 'General Physician') // Suggest GP if no specific specialty
      );
      setSuggestedDoctors(doctors.sort((a, b) => b.rating - a.rating).slice(0, 10));
    } else {
      setSuggestedSpecialties([]);
      setSuggestedDoctors([]);
    }
  }, [selectedSymptoms, allDoctors]);

  const symptomCategories = Object.keys(symptomsData);

  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center p-10 bg-gradient-to-br from-primary/10 via-transparent to-pink-500/10 dark:from-primary/15 dark:to-pink-500/15 rounded-2xl shadow-xl overflow-hidden relative"
      >
        <div className="absolute inset-0 opacity-5 dark:opacity-10" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/diagmonds.png')"}}></div>
        <div className="relative z-10">
          <motion.div 
            className="inline-block p-4 bg-white dark:bg-slate-800 rounded-full shadow-2xl mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <SearchHeart className="h-20 w-20 text-primary" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-5 tracking-tight">
            Symptom <span className="gradient-text">Analyzer</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Feeling unwell? Select your symptoms below, and we'll suggest relevant medical specialties and doctors in Karnataka.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-4 xl:col-span-3 space-y-6"
        >
          <Card className="glassmorphism sticky top-24 shadow-lg border border-border/50">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="flex items-center text-2xl font-semibold">
                <ListChecks className="h-7 w-7 mr-3 text-primary" />
                Your Symptoms
              </CardTitle>
              <CardDescription>Check all that apply. The more specific, the better!</CardDescription>
            </CardHeader>
            <CardContent className="max-h-[calc(100vh-200px)] overflow-y-auto space-y-5 p-4 custom-scrollbar">
              {symptomCategories.map(categoryKey => (
                <div key={categoryKey}>
                  <h3 className="font-semibold text-lg capitalize mb-3 text-slate-700 dark:text-slate-200 border-b-2 border-primary/30 pb-1.5">
                    {categoryKey.replace(/_/g, ' ')}
                  </h3>
                  <div className="space-y-2.5 pl-2">
                  {symptomsData[categoryKey].map(symptom => (
                    <motion.div 
                      key={symptom.id} 
                      className="flex items-center space-x-3 p-2.5 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-colors duration-200 cursor-pointer"
                      onClick={() => handleSymptomToggle(symptom.id)}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Checkbox
                        id={symptom.id}
                        checked={selectedSymptoms.includes(symptom.id)}
                        onCheckedChange={() => handleSymptomToggle(symptom.id)}
                        className="form-checkbox h-5 w-5 text-primary border-primary focus:ring-primary shrink-0"
                        aria-labelledby={`label-${symptom.id}`}
                      />
                      <Label id={`label-${symptom.id}`} htmlFor={symptom.id} className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none flex-1">
                        {symptom.name}
                      </Label>
                    </motion.div>
                  ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="lg:col-span-8 xl:col-span-9 space-y-8"
        >
          {selectedSymptoms.length > 0 && (
            <Card className="glassmorphism shadow-lg border border-border/50">
              <CardHeader className="border-b border-border/50">
                <CardTitle className="flex items-center text-2xl font-semibold">
                  <UserCheck className="h-7 w-7 mr-3 text-green-500" />
                  Suggested Specialties
                </CardTitle>
                {suggestedSpecialties.length > 0 ? (
                    <CardDescription>Based on your symptoms, you might consider consulting these specialists:</CardDescription>
                ) : (
                    <CardDescription>No specific specialties strongly match all selected symptoms. A <strong className="text-primary">General Physician</strong> is a good starting point.</CardDescription>
                )}
              </CardHeader>
              <CardContent className="pt-6">
                {(suggestedSpecialties.length > 0 ? suggestedSpecialties : ['General Physician']).map(specialty => (
                  <motion.span 
                    key={specialty}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-block px-4 py-2 mr-2 mb-2 bg-primary text-primary-foreground rounded-full text-sm font-medium shadow-md hover:bg-primary/90 transition-colors"
                  >
                    {specialty}
                  </motion.span>
                ))}
              </CardContent>
            </Card>
          )}

          {suggestedDoctors.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 flex items-center">
                <Stethoscope className="h-8 w-8 mr-3 text-primary" />
                Recommended Doctors
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence>
                  {suggestedDoctors.map(doctor => (
                    <DoctorResultCard key={doctor.id} doctor={doctor} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {selectedSymptoms.length > 0 && suggestedDoctors.length === 0 && (
             <Card className="glassmorphism shadow-lg border border-border/50">
                <CardHeader className="border-b border-border/50">
                    <CardTitle className="flex items-center text-xl font-semibold">
                        <HelpCircle className="h-6 w-6 mr-2 text-amber-500" />
                        Further Assistance Recommended
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                        We couldn't find specific doctors matching all your selected symptoms and suggested specialties in our current list.
                        For a comprehensive evaluation, we recommend consulting a <strong className="text-primary">General Physician</strong>. They can provide an initial assessment and refer you to a specialist if needed.
                    </p>
                    <Button asChild className="bg-gradient-to-r from-primary to-pink-600 hover:from-primary/90 hover:to-pink-600/90 text-white">
                        <Link to="/find-doctors?specialty=General Physician">Find a General Physician</Link>
                    </Button>
                </CardContent>
            </Card>
          )}

          {selectedSymptoms.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 px-6 rounded-xl glassmorphism shadow-lg border border-border/50"
            >
               <img  alt="Illustration of a doctor with a checklist" className="mx-auto h-56 w-56 mb-8 opacity-80" src="https://images.unsplash.com/photo-1618939307874-206a5940ece7" />
              <p className="text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-3">Start by selecting your symptoms.</p>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">Once you choose symptoms from the list on the left, we'll suggest relevant medical specialties and doctors.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
      <Card className="mt-16 bg-amber-50 border-amber-400 dark:bg-amber-900/40 dark:border-amber-700/60 glassmorphism shadow-lg">
        <CardHeader className="border-b border-amber-400/50 dark:border-amber-700/80">
          <CardTitle className="flex items-center text-xl font-semibold text-amber-700 dark:text-amber-300">
            <AlertTriangle className="h-6 w-6 mr-3" />
            Important Medical Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
          The Symptom Analyzer is an informational tool and <strong className="font-semibold">should not be considered a substitute for professional medical diagnosis or treatment</strong>. The information provided is not intended to cover all possible diseases, ailments, or conditions.
          Always seek the direct advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. <strong className="font-semibold">Never disregard professional medical advice or delay in seeking it because of something you have read on this website.</strong>
          If you believe you are experiencing a medical emergency, call your local emergency number (e.g., 108 or 112 in India) or go to the nearest emergency room immediately. Reliance on any information provided by this website is solely at your own risk.
        </CardContent>
      </Card>
    </div>
  );
};

export default SymptomCheckerPage;
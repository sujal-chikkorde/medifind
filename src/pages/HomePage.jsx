import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Stethoscope, Pill, CalendarDays, Phone, MapPin, SearchCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description, link, linkText }) => (
  <motion.div
    whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
    className="h-full"
  >
    <Card className="h-full flex flex-col bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:border-primary/50 transition-all duration-300">
      <CardHeader className="items-center text-center">
        <motion.div
          className="p-4 bg-gradient-to-br from-primary/20 to-pink-500/20 rounded-full mb-4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
        >
          {React.cloneElement(icon, { className: "h-10 w-10 text-primary" })}
        </motion.div>
        <CardTitle className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow text-center">
        <CardDescription className="text-slate-600 dark:text-slate-300 mb-6">{description}</CardDescription>
      </CardContent>
      <CardContent className="text-center mt-auto">
        <Button asChild size="lg" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <Link to={link}>{linkText}</Link>
        </Button>
      </CardContent>
    </Card>
  </motion.div>
);

const HomePage = () => {
  return (
    <div className="space-y-16 py-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <div className="relative inline-block">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            Your Health, <span className="gradient-text">Connected.</span>
          </h1>
          <motion.div 
            className="absolute -top-4 -right-8 md:-top-6 md:-right-12 h-12 w-12 md:h-16 md:w-16 bg-pink-500/30 rounded-full -z-10"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
           <motion.div 
            className="absolute -bottom-4 -left-8 md:-bottom-6 md:-left-12 h-10 w-10 md:h-14 md:w-14 bg-purple-500/30 rounded-full -z-10"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }}
          />
        </div>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10">
          Easily find trusted doctors, specialists, and essential medicines near you. Book appointments, check symptoms, and manage your health journey with confidence.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button asChild size="lg" className="px-10 py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-xl hover:shadow-2xl transform transition-all duration-300">
            <Link to="/find-doctors">Get Started</Link>
          </Button>
        </motion.div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<SearchCheck />}
            title="Symptom Checker"
            description="Analyze your symptoms and find relevant doctor specialties."
            link="/symptom-checker"
            linkText="Check Symptoms"
          />
          <FeatureCard
            icon={<Stethoscope />}
            title="Find Doctors"
            description="Search for qualified doctors by specialty, location, and reviews."
            link="/find-doctors"
            linkText="Search Doctors"
          />
          <FeatureCard
            icon={<Pill />}
            title="Locate Medicines"
            description="Quickly find pharmacies stocking your required medications."
            link="/find-medicines"
            linkText="Find Medicines"
          />
          <FeatureCard
            icon={<CalendarDays />}
            title="Book Appointments"
            description="Schedule appointments with healthcare providers seamlessly."
            link="/appointments"
            linkText="Book Now"
          />
        </div>
      </motion.section>

      <motion.section 
        className="py-12 bg-gradient-to-r from-primary/5 to-pink-500/5 dark:from-primary/10 dark:to-pink-500/10 rounded-xl shadow-inner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800 dark:text-slate-100">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-slate-700/30 transition-colors">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-xl font-bold shadow-md">1</div>
              <div>
                <h3 className="text-xl font-semibold mb-1 text-slate-700 dark:text-slate-200">Search or Analyze</h3>
                <p className="text-slate-600 dark:text-slate-300">Use the Symptom Checker, or search by specialty or medicine.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-slate-700/30 transition-colors">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-xl font-bold shadow-md">2</div>
              <div>
                <h3 className="text-xl font-semibold mb-1 text-slate-700 dark:text-slate-200">Compare Options</h3>
                <p className="text-slate-600 dark:text-slate-300">Review profiles, ratings, and medicine availability.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-slate-700/30 transition-colors">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-xl font-bold shadow-md">3</div>
              <div>
                <h3 className="text-xl font-semibold mb-1 text-slate-700 dark:text-slate-200">Connect & Act</h3>
                <p className="text-slate-600 dark:text-slate-300">Book appointments, find pharmacies, or get directions.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section 
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800 dark:text-slate-100">Ready to take control of your health?</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
          Join thousands of users who trust MEDIFIND for their healthcare needs.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <Link to="/symptom-checker">Check Symptoms</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <Link to="/find-doctors">Find a Doctor</Link>
          </Button>
        </div>
      </motion.section>

    </div>
  );
};

export default HomePage;
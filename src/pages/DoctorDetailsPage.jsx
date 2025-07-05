import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/date-picker';
import { Star, MapPin, Phone, Mail, CalendarDays, CheckCircle, MessageSquare, ArrowLeft, Briefcase, ShieldCheck, Clock, Navigation, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { getDoctorById } from '@/data/doctors';
import { DoctorReviews } from '@/components/doctor/DoctorReviewComponents';

const DoctorProfileHeader = React.memo(({ doctor }) => {
  if (!doctor) return null; 
  return (
    <CardHeader className="p-0 relative">
      <div className="h-64 bg-gradient-to-br from-primary/80 to-pink-500/80 flex items-center justify-center">
        <img alt={`${doctor.name || 'Doctor'}'s clinic or hospital exterior`} className="object-cover w-full h-full opacity-30" src="https://images.unsplash.com/photo-1580281658206-5c4f9339ee32" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6">
        <Avatar className="h-32 w-32 border-4 border-white shadow-lg -mt-16 md:mt-0">
          <AvatarImage src={`https://source.unsplash.com/random/128x128/?doctor,${doctor.image || 'profile'},indian`} alt={doctor.name} />
          <AvatarFallback className="text-4xl">{doctor.name?.substring(0, 2).toUpperCase() || 'Dr'}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white shadow-black/50 [text-shadow:_0_2px_4px_var(--tw-shadow-color)]">{doctor.name || 'Doctor Profile'}</h1>
          <p className="text-xl font-medium text-pink-200">{doctor.specialty || 'Specialist'}</p>
          {doctor.rating !== undefined && doctor.reviews !== undefined && (
            <div className="flex items-center mt-1">
              {[...Array(Math.floor(doctor.rating))].map((_, i) => <Star key={`star-${i}`} className="h-5 w-5 text-yellow-300 fill-yellow-300" />)}
              {doctor.rating % 1 >= 0.5 && <Star key="half-star" className="h-5 w-5 text-yellow-300" style={{clipPath: "inset(0 50% 0 0)"}} />}
              {[...Array(5 - Math.ceil(doctor.rating))].map((_, i) => <Star key={`empty-star-${i}`} className="h-5 w-5 text-slate-400" />)}
              <span className="ml-2 text-sm text-slate-200">({doctor.rating.toFixed(1)} from {doctor.reviews} reviews)</span>
            </div>
          )}
        </div>
      </div>
    </CardHeader>
  );
});

const DoctorInfoItem = React.memo(({ icon, title, children }) => (
  <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200">
    <div className="flex-shrink-0 text-primary pt-1">{icon}</div>
    <div>
      <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-0.5">{title}</h4>
      <div className="text-slate-600 dark:text-slate-300 text-sm">{children || 'N/A'}</div>
    </div>
  </div>
));

const DoctorDetailsTabsContent = React.memo(({ doctor }) => {
  if (!doctor) return null;
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 bg-slate-200 dark:bg-slate-700">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="contact">Contact & Hours</TabsTrigger>
        <TabsTrigger value="services">Services & Insurance</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <CardDescription className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">{doctor.bio || 'No biography available.'}</CardDescription>
        <DoctorInfoItem icon={<Briefcase className="h-5 w-5" />} title="Qualifications">
          {doctor.qualifications && doctor.qualifications.length > 0 ? (
            <ul className="list-disc list-inside">
              {doctor.qualifications.map(q => <li key={q}>{q}</li>)}
            </ul>
          ) : 'Not specified.'}
        </DoctorInfoItem>
      </TabsContent>

      <TabsContent value="contact" className="space-y-3">
        <DoctorInfoItem icon={<MapPin className="h-5 w-5" />} title="Location">
          {doctor.location}
        </DoctorInfoItem>
        <DoctorInfoItem icon={<Phone className="h-5 w-5" />} title="Phone">
          {doctor.phone ? <a href={`tel:${doctor.phone}`} className="hover:underline">{doctor.phone}</a> : 'Not available'}
        </DoctorInfoItem>
        <DoctorInfoItem icon={<Mail className="h-5 w-5" />} title="Email">
          {doctor.email ? <a href={`mailto:${doctor.email}`} className="hover:underline">{doctor.email}</a> : 'Not available'}
        </DoctorInfoItem>
        <DoctorInfoItem icon={<Clock className="h-5 w-5" />} title="Working Hours">
          {doctor.workingHours}
        </DoctorInfoItem>
      </TabsContent>

      <TabsContent value="services" className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2 text-slate-800 dark:text-slate-100 flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-primary" /> Services Offered
          </h3>
          {doctor.services && doctor.services.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {doctor.services.map(service => (
                <span key={service} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full dark:bg-primary/20 dark:text-primary-foreground/80">{service}</span>
              ))}
            </div>
          ) : <p className="text-sm text-slate-500 dark:text-slate-400">Services not specified.</p>}
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 text-slate-800 dark:text-slate-100 flex items-center">
            <ShieldCheck className="h-5 w-5 mr-2 text-primary" /> Insurance Accepted
          </h3>
          {doctor.insuranceAccepted && doctor.insuranceAccepted.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {doctor.insuranceAccepted.map(insurance => (
                <span key={insurance} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">{insurance}</span>
              ))}
            </div>
          ) : <p className="text-sm text-slate-500 dark:text-slate-400">Insurance information not specified.</p>}
        </div>
      </TabsContent>
      
      <TabsContent value="reviews">
        <DoctorReviews doctorId={doctor.id} />
      </TabsContent>
    </Tabs>
  );
});

const AppointmentDialog = React.memo(({ doctor, onBookAppointment }) => {
  const [appointmentDate, setAppointmentDate] = useState(undefined);
  const [appointmentTime, setAppointmentTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientContact, setPatientContact] = useState('');

  if (!doctor) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onBookAppointment({ 
      appointmentDate: appointmentDate ? appointmentDate.toISOString().split('T')[0] : null, 
      appointmentTime, 
      patientName, 
      patientContact 
    });
    setAppointmentDate(undefined);
    setAppointmentTime('');
    setPatientName('');
    setPatientContact('');
  };

  return (
    <DialogContent className="sm:max-w-[480px] glassmorphism">
      <DialogHeader>
        <DialogTitle className="text-2xl">Book Appointment with {doctor.name}</DialogTitle>
        <DialogDescription>
          Fill in your details below to request an appointment.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="patientNameDialog" className="text-right">Name</Label>
          <Input id="patientNameDialog" value={patientName} onChange={(e) => setPatientName(e.target.value)} className="col-span-3" placeholder="Your Full Name" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="patientContactDialog" className="text-right">Contact</Label>
          <Input id="patientContactDialog" value={patientContact} onChange={(e) => setPatientContact(e.target.value)} className="col-span-3" placeholder="Phone or Email" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="appointmentDateDialog" className="text-right">Date</Label>
          <DatePicker date={appointmentDate} setDate={setAppointmentDate} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="appointmentTimeDialog" className="text-right">Time</Label>
          <Input id="appointmentTimeDialog" type="time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} className="col-span-3" />
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90">Request Appointment</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
});


const DoctorDetailsPage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const foundDoctor = getDoctorById(id);
    if (foundDoctor) {
      setDoctor(foundDoctor);
    } else {
      toast({
        title: "Doctor Not Found",
        description: `Could not find details for a doctor with ID: ${id}. You are being redirected.`,
        variant: "destructive",
      });
    }
  }, [id, toast]);

  const handleBookAppointment = ({ appointmentDate, appointmentTime, patientName, patientContact }) => {
    if (!doctor) return;
    if (!appointmentDate || !appointmentTime || !patientName || !patientContact) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to book an appointment.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Appointment Requested!",
      description: `Appointment for ${patientName} with ${doctor.name} on ${new Date(appointmentDate).toLocaleDateString()} at ${appointmentTime} has been requested. You will receive a confirmation shortly. (This is a demo)`,
      action: <CheckCircle className="text-green-500" />,
    });
  };
  
  const handleCall = () => {
    if (!doctor || !doctor.phone) return;
    toast({
      title: "Calling Doctor",
      description: `Initiating call to ${doctor.name} at ${doctor.phone}. (This is a demo)`,
    });
    window.location.href = `tel:${doctor.phone}`;
  };
  
  const handleEnquire = () => {
    if (!doctor || !doctor.email) return;
    toast({
      title: "Enquiry Sent",
      description: `Your enquiry for ${doctor.name} has been noted. (This is a demo)`,
    });
    window.location.href = `mailto:${doctor.email}?subject=Enquiry for Dr. ${doctor.name}`;
  };

  const handleGetDirections = () => {
    if (!doctor || !doctor.location) return;
    const query = encodeURIComponent(`${doctor.name}, ${doctor.location}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  if (!doctor) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center p-4">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="mb-4">
          <Building className="h-16 w-16 text-primary" />
        </motion.div>
        <p className="text-xl text-slate-700 dark:text-slate-200 mb-2">Loading doctor details or doctor not found...</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">If this persists, the doctor ID might be incorrect or the doctor is no longer listed.</p>
        <Button asChild variant="outline">
          <Link to="/find-doctors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Doctors List
          </Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-8 py-8">
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <Button variant="outline" asChild className="mb-6 group">
          <Link to="/find-doctors">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Doctors
          </Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="overflow-hidden shadow-2xl bg-card glassmorphism">
          <DoctorProfileHeader doctor={doctor} />
          <CardContent className="p-6">
            <DoctorDetailsTabsContent doctor={doctor} />
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl">
                    <CalendarDays className="h-5 w-5 mr-2" /> Book Appointment
                  </Button>
                </DialogTrigger>
                <AppointmentDialog doctor={doctor} onBookAppointment={handleBookAppointment} />
              </Dialog>
              <Button size="lg" variant="outline" className="w-full border-primary text-primary hover:bg-primary/10" onClick={handleCall} disabled={!doctor.phone}>
                <Phone className="h-5 w-5 mr-2" /> Call Doctor
              </Button>
              <Button size="lg" variant="outline" className="w-full" onClick={handleEnquire} disabled={!doctor.email}>
                <MessageSquare className="h-5 w-5 mr-2" /> Send Enquiry
              </Button>
              <Button size="lg" variant="outline" className="w-full" onClick={handleGetDirections} disabled={!doctor.location}>
                <Navigation className="h-5 w-5 mr-2" /> Get Directions
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DoctorDetailsPage;
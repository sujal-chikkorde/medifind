import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker'; 
import { CalendarDays, Clock, User, Phone, Edit, Trash2, PlusCircle, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { getDoctors } from '@/data/doctors'; 

const AppointmentForm = ({ onSubmit, onCancel, doctors, appointment }) => {
  const [selectedDoctorId, setSelectedDoctorId] = useState(appointment ? appointment.doctorId : '');
  const [date, setDate] = useState(appointment ? new Date(appointment.date) : undefined);
  const [time, setTime] = useState(appointment ? appointment.time : '');
  const [patientName, setPatientName] = useState(appointment ? appointment.patientName : '');
  const [patientContact, setPatientContact] = useState(appointment ? appointment.patientContact : '');
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDoctorId || !date || !time || !patientName || !patientContact) {
      toast({
        title: "Missing Information",
        description: "Please fill all fields to book/update an appointment.",
        variant: "destructive",
      });
      return;
    }
    onSubmit({
      id: appointment ? appointment.id : uuidv4(),
      doctorId: selectedDoctorId,
      doctorName: doctors.find(doc => doc.id === selectedDoctorId)?.name || 'N/A',
      date: date.toISOString().split('T')[0], 
      time,
      patientName,
      patientContact,
      status: appointment ? appointment.status : 'Pending'
    });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <Card className="bg-card glassmorphism">
        <CardHeader>
          <CardTitle className="text-2xl">{appointment ? 'Edit Appointment' : 'Book a New Appointment'}</CardTitle>
          <CardDescription>{appointment ? 'Update the details for your appointment.' : 'Fill in the details below to schedule your appointment.'}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="doctor" className="text-slate-700 dark:text-slate-200">Doctor</Label>
              <select 
                id="doctor" 
                value={selectedDoctorId} 
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-input bg-background rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
              >
                <option value="" disabled>Select a doctor</option>
                {doctors.map(doc => <option key={doc.id} value={doc.id}>{doc.name} - {doc.specialty}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date" className="text-slate-700 dark:text-slate-200">Date</Label>
                <DatePicker date={date} setDate={setDate} className="mt-1 w-full" />
              </div>
              <div>
                <Label htmlFor="time" className="text-slate-700 dark:text-slate-200">Time</Label>
                <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="patientName" className="text-slate-700 dark:text-slate-200">Patient Name</Label>
              <Input id="patientName" type="text" placeholder="Your Full Name" value={patientName} onChange={(e) => setPatientName(e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label htmlFor="patientContact" className="text-slate-700 dark:text-slate-200">Patient Contact (Phone/Email)</Label>
              <Input id="patientContact" type="text" placeholder="Your Phone or Email" value={patientContact} onChange={(e) => setPatientContact(e.target.value)} className="mt-1" />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
              <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                {appointment ? 'Update Appointment' : 'Book Appointment'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const AppointmentCard = ({ appointment, onEdit, onDelete, onConfirm, onCancelAppt }) => {
  const getStatusColor = (status) => {
    if (status === 'Confirmed') return 'text-green-500 dark:text-green-400';
    if (status === 'Cancelled') return 'text-red-500 dark:text-red-400';
    return 'text-yellow-500 dark:text-yellow-400';
  };

  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
      <Card className="hover:shadow-lg transition-shadow duration-200 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl text-slate-800 dark:text-slate-100">{appointment.doctorName}</CardTitle>
              <CardDescription className="text-primary">{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {appointment.time}</CardDescription>
            </div>
            <span className={`text-sm font-semibold ${getStatusColor(appointment.status)}`}>{appointment.status}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
            <User className="h-4 w-4 mr-2 text-primary/80" /> Patient: {appointment.patientName}
          </div>
          <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
            <Phone className="h-4 w-4 mr-2 text-primary/80" /> Contact: {appointment.patientContact}
          </div>
          <div className="flex space-x-2 pt-3 border-t border-slate-200 dark:border-slate-700 mt-3">
            {appointment.status === 'Pending' && (
              <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50 dark:hover:bg-green-900/50" onClick={() => onConfirm(appointment.id)}>
                <CheckCircle className="h-4 w-4 mr-1" /> Confirm
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => onEdit(appointment)}>
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
            {appointment.status !== 'Cancelled' && (
              <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/50" onClick={() => onCancelAppt(appointment.id)}>
                <XCircle className="h-4 w-4 mr-1" /> Cancel
              </Button>
            )}
            <Button variant="destructive" size="sm" onClick={() => onDelete(appointment.id)}>
              <Trash2 className="h-4 w-4 mr-1" /> Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(storedAppointments.sort((a,b) => new Date(a.date) - new Date(b.date)));
    setDoctors(getDoctors());
  }, []);

  const saveAppointments = (updatedAppointments) => {
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments.sort((a,b) => new Date(a.date) - new Date(b.date)));
  };

  const handleFormSubmit = (appointmentData) => {
    let updatedAppointments;
    if (editingAppointment) {
      updatedAppointments = appointments.map(appt => appt.id === editingAppointment.id ? { ...appointmentData, status: appt.status } : appt);
      toast({ title: "Appointment Updated!", description: `Your appointment with ${appointmentData.doctorName} has been updated.` });
    } else {
      updatedAppointments = [...appointments, appointmentData];
      toast({ title: "Appointment Booked!", description: `Appointment with ${appointmentData.doctorName} successfully scheduled.` });
    }
    saveAppointments(updatedAppointments);
    setShowForm(false);
    setEditingAppointment(null);
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const updatedAppointments = appointments.filter(appt => appt.id !== id);
    saveAppointments(updatedAppointments);
    toast({ title: "Appointment Deleted", description: "The appointment has been removed.", variant: "destructive" });
  };
  
  const handleConfirm = (id) => {
    const updatedAppointments = appointments.map(appt => appt.id === id ? { ...appt, status: 'Confirmed' } : appt);
    saveAppointments(updatedAppointments);
    toast({ title: "Appointment Confirmed!", description: "The appointment status has been updated to Confirmed." });
  };

  const handleCancelAppt = (id) => {
     const updatedAppointments = appointments.map(appt => appt.id === id ? { ...appt, status: 'Cancelled' } : appt);
    saveAppointments(updatedAppointments);
    toast({ title: "Appointment Cancelled", description: "The appointment status has been updated to Cancelled." });
  };


  const upcomingAppointments = appointments.filter(appt => new Date(appt.date) >= new Date() && appt.status !== 'Cancelled');
  const pastAppointments = appointments.filter(appt => new Date(appt.date) < new Date() || appt.status === 'Cancelled');

  return (
    <div className="space-y-8 py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold">Your <span className="gradient-text">Appointments</span></h1>
        {!showForm && (
          <Button size="lg" onClick={() => { setEditingAppointment(null); setShowForm(true); }} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
            <PlusCircle className="h-5 w-5 mr-2" /> Book New Appointment
          </Button>
        )}
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <AppointmentForm 
            onSubmit={handleFormSubmit} 
            onCancel={() => { setShowForm(false); setEditingAppointment(null); }}
            doctors={doctors}
            appointment={editingAppointment}
          />
        )}
      </AnimatePresence>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Upcoming Appointments</h2>
        {upcomingAppointments.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {upcomingAppointments.map(appt => (
                <AppointmentCard key={appt.id} appointment={appt} onEdit={handleEdit} onDelete={handleDelete} onConfirm={handleConfirm} onCancelAppt={handleCancelAppt} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <p className="text-slate-500 dark:text-slate-400">You have no upcoming appointments.</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">Past & Cancelled Appointments</h2>
        {pastAppointments.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {pastAppointments.map(appt => (
                <AppointmentCard key={appt.id} appointment={appt} onEdit={handleEdit} onDelete={handleDelete} onConfirm={handleConfirm} onCancelAppt={handleCancelAppt} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <p className="text-slate-500 dark:text-slate-400">No past or cancelled appointments found.</p>
        )}
      </section>
    </div>
  );
};

export default AppointmentsPage;
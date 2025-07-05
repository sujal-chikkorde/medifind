import { v4 as uuidv4 } from 'uuid';

const K_DOCTORS = [
  { 
    id: 'doc_k_001', 
    name: 'Dr. Priya Sharma', 
    specialty: 'Cardiologist', 
    rating: 4.8, 
    reviews: 152, 
    location: 'Manipal Hospital, HAL Airport Road, Bangalore, Karnataka', 
    image: 'doc_priya_sharma', 
    available: true, 
    phone: '080-2502-3888', 
    email: 'priya.sharma@manipal.com',
    bio: 'Renowned cardiologist with 15+ years experience in interventional cardiology. Based in Bangalore.',
    qualifications: ['MBBS, MD (Cardiology)', 'Fellowship in Interventional Cardiology (USA)'],
    workingHours: 'Mon-Fri: 10 AM - 6 PM',
    services: ['Angioplasty', 'Echocardiogram', 'Stress Test', 'Pacemaker Implantation'],
    insuranceAccepted: ['Star Health', 'Apollo Munich', 'ICICI Lombard']
  },
  { 
    id: 'doc_k_002', 
    name: 'Dr. Arjun Reddy', 
    specialty: 'Pediatrician', 
    rating: 4.9, 
    reviews: 215, 
    location: 'Rainbow Children\'s Hospital, Marathahalli, Bangalore, Karnataka', 
    image: 'doc_arjun_reddy', 
    available: true, 
    phone: '080-4170-4170', 
    email: 'arjun.reddy@rainbow.com',
    bio: 'Compassionate pediatrician specializing in neonatal care and child development. Serving families in Bangalore.',
    qualifications: ['MBBS, DNB (Pediatrics)', 'Fellowship in Neonatology'],
    workingHours: 'Mon-Sat: 9 AM - 7 PM',
    services: ['Vaccinations', 'Well-child visits', 'Neonatal ICU', 'Developmental screenings'],
    insuranceAccepted: ['Bajaj Allianz', 'HDFC Ergo', 'Max Bupa']
  },
  { 
    id: 'doc_k_003', 
    name: 'Dr. Sneha Patel', 
    specialty: 'Dermatologist', 
    rating: 4.7, 
    reviews: 105, 
    location: 'Fortis Hospital, Bannerghatta Road, Bangalore, Karnataka', 
    image: 'doc_sneha_patel', 
    available: false, 
    phone: '080-6621-4444', 
    email: 'sneha.patel@fortis.com',
    bio: 'Expert in cosmetic dermatology and skin conditions. Practices in South Bangalore.',
    qualifications: ['MBBS, MD (Dermatology, Venereology & Leprosy)'],
    workingHours: 'Tue-Sat: 11 AM - 5 PM',
    services: ['Acne Treatment', 'Laser Hair Removal', 'Chemical Peels', 'Skin Cancer Screening'],
    insuranceAccepted: ['United India', 'New India Assurance', 'Religare']
  },
  { 
    id: 'doc_k_004', 
    name: 'Dr. Vikram Singh', 
    specialty: 'Neurologist', 
    rating: 4.6, 
    reviews: 85, 
    location: 'Apollo Hospitals, Jayanagar, Bangalore, Karnataka', 
    image: 'doc_vikram_singh', 
    available: true, 
    phone: '080-2630-4050', 
    email: 'vikram.singh@apollo.com',
    bio: 'Specialist in treating complex neurological disorders. Located in Jayanagar, Bangalore.',
    qualifications: ['MBBS, DM (Neurology)'],
    workingHours: 'Mon-Fri: 9 AM - 5 PM, Sat: 9 AM - 1 PM',
    services: ['EEG', 'EMG', 'Stroke Management', 'Epilepsy Treatment'],
    insuranceAccepted: ['Star Health', 'ICICI Lombard', 'HDFC Ergo']
  },
  { 
    id: 'doc_k_005', 
    name: 'Dr. Ananya Rao', 
    specialty: 'Oncologist', 
    rating: 4.9, 
    reviews: 160, 
    location: 'HCG Cancer Centre, Kalinga Rao Road, Bangalore, Karnataka', 
    image: 'doc_ananya_rao', 
    available: true, 
    phone: '080-4020-6000', 
    email: 'ananya.rao@hcg.com',
    bio: 'Leading oncologist with focus on personalized cancer care. Central Bangalore.',
    qualifications: ['MBBS, MD (Radiation Oncology)', 'Fellowship in Clinical Oncology (UK)'],
    workingHours: 'Mon-Sat: 10 AM - 6 PM',
    services: ['Chemotherapy', 'Radiation Therapy', 'Immunotherapy', 'Palliative Care'],
    insuranceAccepted: ['Max Bupa', 'Apollo Munich', 'Bajaj Allianz']
  },
  { 
    id: 'doc_k_006', 
    name: 'Dr. Rohan Desai', 
    specialty: 'Orthopedist', 
    rating: 4.5, 
    reviews: 120, 
    location: 'Sakra World Hospital, Devarabisanahalli, Bangalore, Karnataka', 
    image: 'doc_rohan_desai', 
    available: true, 
    phone: '080-4969-4969', 
    email: 'rohan.desai@sakra.com',
    bio: 'Specializing in joint replacement and sports injuries. Serving Outer Ring Road area, Bangalore.',
    qualifications: ['MBBS, MS (Orthopedics)'],
    workingHours: 'Mon-Fri: 9 AM - 5 PM',
    services: ['Knee Replacement', 'Hip Replacement', 'Arthroscopy', 'Trauma Care'],
    insuranceAccepted: ['Religare', 'Star Health', 'United India']
  },
  { 
    id: 'doc_k_007', 
    name: 'Dr. Meera Krishnan', 
    specialty: 'Gynecologist', 
    rating: 4.8, 
    reviews: 190, 
    location: 'Cloudnine Hospital, Old Airport Road, Bangalore, Karnataka', 
    image: 'doc_meera_krishnan', 
    available: true, 
    phone: '1860-108-9999', 
    email: 'meera.krishnan@cloudnine.com',
    bio: 'Experienced gynecologist providing comprehensive women\'s health services in Bangalore.',
    qualifications: ['MBBS, DGO, DNB (Obstetrics & Gynecology)'],
    workingHours: 'Mon-Sat: 10 AM - 7 PM',
    services: ['Prenatal Care', 'Delivery Services', 'Infertility Treatment', 'Menopause Management'],
    insuranceAccepted: ['ICICI Lombard', 'HDFC Ergo', 'New India Assurance']
  },
  { 
    id: 'doc_k_008', 
    name: 'Dr. Sameer Gupta', 
    specialty: 'Psychiatrist', 
    rating: 4.7, 
    reviews: 95, 
    location: 'NIMHANS, Hosur Road, Bangalore, Karnataka', 
    image: 'doc_sameer_gupta', 
    available: false, 
    phone: '080-2699-5000', 
    email: 'sameer.gupta@nimhans.ac.in',
    bio: 'Consultant psychiatrist at NIMHANS, Bangalore, focusing on mental wellness.',
    qualifications: ['MBBS, MD (Psychiatry)'],
    workingHours: 'By Appointment',
    services: ['Counseling', 'Therapy Sessions', 'Mood Disorder Treatment', 'Anxiety Management'],
    insuranceAccepted: ['Government Schemes', 'Limited Private Insurance']
  },
  { 
    id: 'doc_k_009', 
    name: 'Dr. Divya Nair', 
    specialty: 'Endocrinologist', 
    rating: 4.6, 
    reviews: 70, 
    location: 'Aster CMI Hospital, Hebbal, Bangalore, Karnataka', 
    image: 'doc_divya_nair', 
    available: true, 
    phone: '080-4342-0100', 
    email: 'divya.nair@aster.com',
    bio: 'Specialist in diabetes and thyroid disorders. Located in Hebbal, Bangalore.',
    qualifications: ['MBBS, DM (Endocrinology)'],
    workingHours: 'Mon-Fri: 10 AM - 4 PM',
    services: ['Diabetes Management', 'Thyroid Disorder Treatment', 'Hormone Therapy', 'PCOS Management'],
    insuranceAccepted: ['Star Health', 'Max Bupa', 'Apollo Munich']
  },
  { 
    id: 'doc_k_010', 
    name: 'Dr. Karthik Iyer', 
    specialty: 'Urologist', 
    rating: 4.4, 
    reviews: 88, 
    location: 'Columbia Asia Hospital, Yeshwanthpur, Bangalore, Karnataka', 
    image: 'doc_karthik_iyer', 
    available: true, 
    phone: '080-6165-6666', 
    email: 'karthik.iyer@columbiaasia.com',
    bio: 'Expert in urological conditions and minimally invasive surgery. Serving Yeshwanthpur, Bangalore.',
    qualifications: ['MBBS, MS (General Surgery), MCh (Urology)'],
    workingHours: 'Mon, Wed, Fri: 2 PM - 6 PM',
    services: ['Kidney Stone Treatment', 'Prostate Health', 'Urinary Incontinence', 'Male Infertility'],
    insuranceAccepted: ['Bajaj Allianz', 'Religare', 'United India']
  },
  { 
    id: 'doc_k_011', 
    name: 'Dr. Lakshmi Murthy', 
    specialty: 'General Physician', 
    rating: 4.7, 
    reviews: 250, 
    location: 'St. John\'s Medical College Hospital, Koramangala, Bangalore, Karnataka', 
    image: 'doc_lakshmi_murthy', 
    available: true, 
    phone: '080-2206-5000', 
    email: 'lakshmi.murthy@stjohns.in',
    bio: 'Highly-rated GP for all common ailments. Koramangala, Bangalore.',
    qualifications: ['MBBS, MD (General Medicine)'],
    workingHours: 'Mon-Sat: 9 AM - 1 PM, 3 PM - 6 PM',
    services: ['General Checkups', 'Fever Treatment', 'Infectious Diseases', 'Chronic Disease Management'],
    insuranceAccepted: ['Most Major Insurances', 'Government Schemes']
  },
  { 
    id: 'doc_k_012', 
    name: 'Dr. Rajesh Kumar', 
    specialty: 'Pulmonologist', 
    rating: 4.6, 
    reviews: 115, 
    location: 'BGS Gleneagles Global Hospitals, Kengeri, Bangalore, Karnataka', 
    image: 'doc_rajesh_kumar', 
    available: true, 
    phone: '080-2625-5555', 
    email: 'rajesh.kumar@bgsgleneagles.com',
    bio: 'Specialist in respiratory diseases and critical care. Kengeri, Bangalore.',
    qualifications: ['MBBS, MD (Pulmonary Medicine)'],
    workingHours: 'Mon-Fri: 11 AM - 5 PM',
    services: ['Asthma Management', 'COPD Treatment', 'Bronchoscopy', 'Sleep Apnea Diagnosis'],
    insuranceAccepted: ['Star Health', 'ICICI Lombard', 'HDFC Ergo']
  },
  { 
    id: 'doc_k_013', 
    name: 'Dr. Sunita Reddy', 
    specialty: 'Ophthalmologist', 
    rating: 4.8, 
    reviews: 140, 
    location: 'Narayana Nethralaya, Rajajinagar, Bangalore, Karnataka', 
    image: 'doc_sunita_reddy', 
    available: true, 
    phone: '080-6612-1300', 
    email: 'sunita.reddy@narayananethralaya.org',
    bio: 'Leading eye surgeon specializing in cataract and refractive surgery. Rajajinagar, Bangalore.',
    qualifications: ['MBBS, MS (Ophthalmology), FICO'],
    workingHours: 'Mon-Sat: 9 AM - 6 PM',
    services: ['Cataract Surgery', 'LASIK', 'Glaucoma Treatment', 'Retina Checkup'],
    insuranceAccepted: ['Max Bupa', 'Apollo Munich', 'Religare']
  },
  { 
    id: 'doc_k_014', 
    name: 'Dr. Alok Jain', 
    specialty: 'ENT Specialist', 
    rating: 4.5, 
    reviews: 100, 
    location: 'Vikram Hospital, Millers Road, Bangalore, Karnataka', 
    image: 'doc_alok_jain', 
    available: false, 
    phone: '080-4206-7878', 
    email: 'alok.jain@vikramhospital.com',
    bio: 'Experienced ENT surgeon for ear, nose, and throat conditions. Central Bangalore.',
    qualifications: ['MBBS, MS (ENT)'],
    workingHours: 'Tue, Thu, Sat: 3 PM - 7 PM',
    services: ['Tonsillectomy', 'Sinus Surgery', 'Hearing Aid Fitting', 'Vertigo Treatment'],
    insuranceAccepted: ['United India', 'New India Assurance', 'Star Health']
  },
  { 
    id: 'doc_k_015', 
    name: 'Dr. Geetha Rao', 
    specialty: 'Rheumatologist', 
    rating: 4.7, 
    reviews: 80, 
    location: 'Hosmat Hospital, Magrath Road, Bangalore, Karnataka', 
    image: 'doc_geetha_rao', 
    available: true, 
    phone: '080-2559-3796', 
    email: 'geetha.rao@hosmatnet.com',
    bio: 'Specialist in arthritis and autoimmune diseases. Practices in Bangalore.',
    qualifications: ['MBBS, MD (General Medicine), DM (Rheumatology)'],
    workingHours: 'Mon, Wed, Fri: 10 AM - 2 PM',
    services: ['Rheumatoid Arthritis Management', 'Lupus Treatment', 'Gout Management', 'Fibromyalgia Care'],
    insuranceAccepted: ['ICICI Lombard', 'HDFC Ergo', 'Bajaj Allianz']
  },
  {
    id: 'doc_k_016',
    name: 'Dr. Suresh Gowda',
    specialty: 'Dentist',
    rating: 4.9,
    reviews: 180,
    location: 'Vasan Dental Care, Mysore Road, Bangalore, Karnataka',
    image: 'doc_suresh_gowda',
    available: true,
    phone: '080-4111-2222',
    email: 'suresh.gowda@vasandental.com',
    bio: 'Expert general and cosmetic dentist with a gentle approach. Mysore Road, Bangalore.',
    qualifications: ['BDS, MDS (Prosthodontics)'],
    workingHours: 'Mon-Sat: 9 AM - 8 PM',
    services: ['Dental Implants', 'Root Canal Treatment', 'Teeth Whitening', 'Smile Makeovers'],
    insuranceAccepted: ['Star Health', 'Religare', 'Cigna TTK']
  },
  {
    id: 'doc_k_017',
    name: 'Dr. Kavita Patil',
    specialty: 'Dietitian/Nutritionist',
    rating: 4.7,
    reviews: 90,
    location: 'Healthy Living Clinic, Dollars Colony, Bangalore, Karnataka',
    image: 'doc_kavita_patil',
    available: true,
    phone: '080-3344-5566',
    email: 'kavita.patil@healthyliving.com',
    bio: 'Certified dietitian focusing on weight management and therapeutic diets. Dollars Colony, Bangalore.',
    qualifications: ['BSc (Nutrition), MSc (Dietetics)', 'Registered Dietitian (RD)'],
    workingHours: 'Mon-Fri: 10 AM - 5 PM (By Appointment)',
    services: ['Weight Loss Programs', 'Diabetes Diet Counseling', 'Sports Nutrition', 'PCOD/PCOS Diet Plans'],
    insuranceAccepted: ['Not Typically Covered', 'Check with Provider']
  },
  {
    id: 'doc_k_018',
    name: 'Dr. Anand Kumar',
    specialty: 'Physiotherapist',
    rating: 4.6,
    reviews: 130,
    location: 'Active Life Physiotherapy, Bellandur, Bangalore, Karnataka',
    image: 'doc_anand_kumar',
    available: true,
    phone: '080-7788-9900',
    email: 'anand.kumar@activelifephysio.com',
    bio: 'Experienced physiotherapist specializing in sports injuries and post-operative rehabilitation. Bellandur, Bangalore.',
    qualifications: ['BPT (Bachelor of Physiotherapy)', 'MPT (Master of Physiotherapy - Orthopedics)'],
    workingHours: 'Mon-Sat: 8 AM - 7 PM',
    services: ['Manual Therapy', 'Exercise Prescription', 'Electrotherapy', 'Sports Taping'],
    insuranceAccepted: ['Apollo Munich', 'HDFC Ergo', 'Some Corporate Tie-ups']
  }
];

export const getDoctors = () => {
  const storedDoctors = localStorage.getItem('doctorsData_k');
  if (storedDoctors) {
    const parsedDoctors = JSON.parse(storedDoctors);
    if (Array.isArray(parsedDoctors) && parsedDoctors.length > 0) {
      return parsedDoctors;
    }
  }
  const doctorsWithUUIDs = K_DOCTORS.map(doc => ({ ...doc, id: doc.id || uuidv4() }));
  localStorage.setItem('doctorsData_k', JSON.stringify(doctorsWithUUIDs));
  return doctorsWithUUIDs;
};

export const getDoctorById = (id) => {
  const doctors = getDoctors();
  const doctor = doctors.find(doc => doc.id === id);

  if (doctor) {
    const storedReviews = JSON.parse(localStorage.getItem(`reviews_${id}`)) || [];
    const totalRating = storedReviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = storedReviews.length > 0 ? (totalRating / storedReviews.length) : doctor.rating;
    const numReviews = storedReviews.length > 0 ? storedReviews.length : doctor.reviews;
    
    return {
      ...doctor,
      rating: parseFloat(averageRating.toFixed(1)),
      reviews: numReviews,
    };
  }
  return null;
};
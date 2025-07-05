import { v4 as uuidv4 } from 'uuid';

export const initialMockMedicines = [
  { 
    id: uuidv4(), 
    name: 'Crocin Pain Relief Tablets (15 count)', 
    category: 'Pain Relief', 
    image: 'med_crocin', 
    description: 'Provides effective relief from headache, body ache, and fever. Contains Paracetamol.',
    manufacturer: 'GSK Consumer Healthcare',
    dosage: '1-2 tablets every 4-6 hours as needed, max 8 tablets in 24 hours for adults.',
    sideEffects: 'Generally well-tolerated. Rare cases of allergic reactions.',
    storage: 'Store in a cool, dry place below 30°C.',
    availability: [
      { pharmacyId: uuidv4(), pharmacyName: 'Apollo Pharmacy', stock: 75, location: 'MG Road, Bangalore, Karnataka 560001', distance: '0.8 km', phone: '080-25581234', email: 'mgroad.blr@apollopharmacy.in', coordinates: { lat: 12.9751, lng: 77.6068 } },
      { pharmacyId: uuidv4(), pharmacyName: 'MedPlus Pharmacy', stock: 40, location: '100 Feet Road, Indiranagar, Bangalore, Karnataka 560038', distance: '1.5 km', phone: '080-41267890', email: 'indiranagar.blr@medplusindia.com', coordinates: { lat: 12.9718, lng: 77.6385 } },
    ]
  },
  { 
    id: uuidv4(), 
    name: 'Amoxycillin 500mg Capsules (10 count)', 
    category: 'Antibiotic', 
    image: 'med_amoxycillin', 
    description: 'Prescription antibiotic for treating bacterial infections. Complete the full course as prescribed.',
    manufacturer: 'Cipla Ltd.',
    dosage: 'As prescribed by doctor. Typically 1 capsule 2-3 times a day.',
    sideEffects: 'Nausea, diarrhea, rash. Consult doctor if severe.',
    storage: 'Store at room temperature, away from moisture and direct sunlight.',
    availability: [
      { pharmacyId: uuidv4(), pharmacyName: 'Wellness Forever', stock: 30, location: '1st Main Road, Koramangala 8th Block, Bangalore, Karnataka 560095', distance: '2.2 km', phone: '080-25505678', email: 'koramangala.blr@wellnessforever.com', coordinates: { lat: 12.9352, lng: 77.6245 } },
      { pharmacyId: uuidv4(), pharmacyName: 'Shree Medicals', stock: 15, location: 'Near Bus Stand, Hubli, Karnataka 580020', distance: 'N/A', phone: '0836-2261122', email: 'info@shreemedhubli.com', coordinates: { lat: 15.3582, lng: 75.1335 } }
    ]
  },
  { 
    id: uuidv4(), 
    name: 'Cetirizine 10mg Tablets (10 count)', 
    category: 'Allergy Relief', 
    image: 'med_cetirizine', 
    description: 'Antihistamine for relief from allergy symptoms like sneezing, runny nose, and itchy eyes.',
    manufacturer: 'Dr. Reddy\'s Laboratories',
    dosage: '1 tablet daily for adults and children over 6 years.',
    sideEffects: 'Drowsiness (less common), dry mouth, headache.',
    storage: 'Store below 25°C. Protect from light.',
    availability: [
      { pharmacyId: uuidv4(), pharmacyName: 'Trust Pharmacy', stock: 120, location: '4th Block, Jayanagar, Bangalore, Karnataka 560011', distance: '1.0 km', phone: '080-26631122', email: 'jayanagar.blr@trustpharmacy.in', coordinates: { lat: 12.9293, lng: 77.5824 } },
      { pharmacyId: uuidv4(), pharmacyName: 'Apollo Pharmacy', stock: 60, location: 'Sampige Road, Malleshwaram, Bangalore, Karnataka 560003', distance: '3.5 km', phone: '080-23345678', email: 'malleshwaram.blr@apollopharmacy.in', coordinates: { lat: 12.9988, lng: 77.5700 } },
      { pharmacyId: uuidv4(), pharmacyName: 'Mangalore Medicals', stock: 50, location: 'KS Rao Road, Mangalore, Karnataka 575001', distance: 'N/A', phone: '0824-2445566', email: 'contact@mangaloremeds.com', coordinates: { lat: 12.8691, lng: 74.8436 } }
    ]
  },
  { 
    id: uuidv4(), 
    name: 'Pantoprazole 40mg Tablets (10 count)', 
    category: 'Acid Reflux', 
    image: 'med_pantoprazole', 
    description: 'Proton pump inhibitor to reduce stomach acid. Used for heartburn and acid reflux.',
    manufacturer: 'Sun Pharmaceutical Industries Ltd.',
    dosage: '1 tablet daily, preferably before breakfast.',
    sideEffects: 'Headache, diarrhea, dizziness (usually mild).',
    storage: 'Store in a cool, dry place.',
    availability: [
      { pharmacyId: uuidv4(), pharmacyName: 'MedPlus Pharmacy', stock: 20, location: 'ITPL Main Road, Whitefield, Bangalore, Karnataka 560066', distance: '5.0 km', phone: '080-40987654', email: 'whitefield.blr@medplusindia.com', coordinates: { lat: 12.9698, lng: 77.7500 } },
      { pharmacyId: uuidv4(), pharmacyName: 'Belgaum Pharma', stock: 35, location: 'College Road, Belgaum, Karnataka 590001', distance: 'N/A', phone: '0831-2423344', email: 'sales@belgaumpharma.com', coordinates: { lat: 15.8522, lng: 74.5000 } }
    ]
  },
  {
    id: uuidv4(),
    name: 'Combiflam Tablets (20 count)',
    category: 'Pain Relief',
    image: 'med_combiflam',
    description: 'Combination of Ibuprofen and Paracetamol for effective relief from pain and inflammation.',
    manufacturer: 'Sanofi India Ltd.',
    dosage: '1 tablet up to 3 times a day after meals.',
    sideEffects: 'Indigestion, nausea. Not for long-term use without medical advice.',
    storage: 'Store below 25°C.',
    availability: [
      { pharmacyId: uuidv4(), pharmacyName: 'Wellness Forever', stock: 80, location: '27th Main Road, HSR Layout, Bangalore, Karnataka 560102', distance: '2.8 km', phone: '080-25741234', email: 'hsr.blr@wellnessforever.com', coordinates: { lat: 12.9121, lng: 77.6446 } },
      { pharmacyId: uuidv4(), pharmacyName: 'Trust Pharmacy', stock: 55, location: 'Bannerghatta Main Road, Bangalore, Karnataka 560076', distance: '4.1 km', phone: '080-26589012', email: 'bannerghatta.blr@trustpharmacy.in', coordinates: { lat: 12.8765, lng: 77.5960 } },
      { pharmacyId: uuidv4(), pharmacyName: 'Mysore Medical Store', stock: 45, location: 'Sayyaji Rao Road, Mysore, Karnataka 570001', distance: 'N/A', phone: '0821-2421122', email: 'query@mysoremeds.com', coordinates: { lat: 12.3050, lng: 76.6550 } }
    ]
  },
  {
    id: uuidv4(),
    name: 'Asthalin Inhaler (200 MDI)',
    category: 'Asthma Relief',
    image: 'med_asthalin',
    description: 'Salbutamol inhaler for quick relief from asthma symptoms and bronchospasm.',
    manufacturer: 'Cipla Ltd.',
    dosage: '1-2 puffs as needed for symptom relief. Follow doctor\'s advice.',
    sideEffects: 'Tremors, palpitations (usually temporary).',
    storage: 'Store below 30°C. Do not freeze. Pressurized container.',
    availability: [
      { pharmacyId: uuidv4(), pharmacyName: 'Apollo Pharmacy', stock: 45, location: 'Hosur Road, Electronic City, Bangalore, Karnataka 560100', distance: '6.5 km', phone: '080-28523456', email: 'ecity.blr@apollopharmacy.in', coordinates: { lat: 12.8452, lng: 77.6602 } },
      { pharmacyId: uuidv4(), pharmacyName: 'Gulbarga Chemists', stock: 25, location: 'Super Market, Gulbarga, Karnataka 585101', distance: 'N/A', phone: '08472-223344', email: 'orders@gulbargachem.com', coordinates: { lat: 17.3291, lng: 76.8340 } }
    ]
  },
  {
    id: uuidv4(),
    name: 'Vicks Action 500 Advanced Tablets (10 count)',
    category: 'Cold & Flu',
    image: 'med_vicks_action_500',
    description: 'Relief from multiple cold and flu symptoms like headache, fever, nasal congestion.',
    manufacturer: 'Procter & Gamble',
    dosage: '1 tablet every 4-6 hours.',
    sideEffects: 'Drowsiness may occur.',
    storage: 'Store in a cool, dry place.',
    availability: [
      { pharmacyId: uuidv4(), pharmacyName: 'MedPlus Pharmacy', stock: 90, location: 'Dr. Rajkumar Road, Rajajinagar, Bangalore, Karnataka 560010', distance: '3.0 km', phone: '080-23129876', email: 'rajajinagar.blr@medplusindia.com', coordinates: { lat: 12.9940, lng: 77.5520 } },
      { pharmacyId: uuidv4(), pharmacyName: 'Wellness Forever', stock: 65, location: 'DVG Road, Basavanagudi, Bangalore, Karnataka 560004', distance: '2.5 km', phone: '080-26675432', email: 'basavanagudi.blr@wellnessforever.com', coordinates: { lat: 12.9420, lng: 77.5713 } }
    ]
  },
  {
    id: uuidv4(),
    name: 'Digene Gel (Mint Flavour, 200ml)',
    category: 'Antacid',
    image: 'med_digene',
    description: 'Provides quick relief from acidity, heartburn, and gas. Mint flavour.',
    manufacturer: 'Abbott India Ltd.',
    dosage: '2 teaspoonfuls (10ml) after meals and at bedtime, or as directed by physician.',
    sideEffects: 'Rare, may cause constipation or diarrhea in some individuals.',
    storage: 'Store at room temperature, away from direct sunlight. Shake well before use.',
    availability: [
      { pharmacyId: uuidv4(), pharmacyName: 'Trust Pharmacy', stock: 110, location: 'Outer Ring Road, JP Nagar, Bangalore, Karnataka 560078', distance: '3.8 km', phone: '080-26598765', email: 'jpnagar.blr@trustpharmacy.in', coordinates: { lat: 12.9069, lng: 77.5848 } },
      { pharmacyId: uuidv4(), pharmacyName: 'Apollo Pharmacy', stock: 70, location: '80 Feet Road, Koramangala 5th Block, Bangalore, Karnataka 560034', distance: '2.0 km', phone: '080-25531111', email: 'koramangala5.blr@apollopharmacy.in', coordinates: { lat: 12.9345, lng: 77.6269 } }
    ]
  },
   {
    id: uuidv4(),
    name: 'Benadryl Cough Syrup (100ml)',
    category: 'Cough Relief',
    image: 'med_benadryl',
    description: 'Effective relief from cough and sore throat. May cause drowsiness.',
    manufacturer: 'Johnson & Johnson',
    dosage: 'Adults: 10ml every 4 hours. Children (6-12 yrs): 5ml every 4 hours.',
    sideEffects: 'Drowsiness, dizziness, dry mouth.',
    storage: 'Store at room temperature, protect from light.',
    availability: [
      { pharmacyId: uuidv4(), pharmacyName: 'MedPlus Pharmacy', stock: 50, location: 'Outer Ring Road, Marathahalli, Bangalore, Karnataka 560037', distance: '4.5 km', phone: '080-41156789', email: 'marathahalli.blr@medplusindia.com', coordinates: { lat: 12.9592, lng: 77.6974 } },
      { pharmacyId: uuidv4(), pharmacyName: 'Davangere Drugs', stock: 60, location: 'PB Road, Davangere, Karnataka 577002', distance: 'N/A', phone: '08192-232323', email: 'davangere.drugs@mail.com', coordinates: { lat: 14.4644, lng: 75.9218 } }
    ]
  },
  {
    id: uuidv4(),
    name: 'Volini Pain Relief Spray (55g)',
    category: 'Topical Pain Relief',
    image: 'med_volini',
    description: 'Topical spray for quick relief from muscle pain, sprains, and joint pain.',
    manufacturer: 'Sun Pharmaceutical Industries Ltd.',
    dosage: 'Spray on affected area 3-4 times a day.',
    sideEffects: 'Skin irritation or rash in rare cases.',
    storage: 'Store in a cool place. Flammable, keep away from heat.',
    availability: [
      { pharmacyId: uuidv4(), pharmacyName: 'Wellness Forever', stock: 70, location: '16th Main Road, BTM Layout, Bangalore, Karnataka 560068', distance: '3.2 km', phone: '080-26781234', email: 'btm.blr@wellnessforever.com', coordinates: { lat: 12.9166, lng: 77.6101 } },
      { pharmacyId: uuidv4(), pharmacyName: 'Trust Pharmacy', stock: 40, location: 'New BEL Road, Hebbal, Bangalore, Karnataka 560094', distance: '7.0 km', phone: '080-23419876', email: 'hebbal.blr@trustpharmacy.in', coordinates: { lat: 13.0358, lng: 77.5970 } }
    ]
  }
];

export const getMedicines = () => {
  const storedMedicines = localStorage.getItem('medicinesData_k');
  if (storedMedicines) {
    const parsedMedicines = JSON.parse(storedMedicines);
     if (Array.isArray(parsedMedicines) && parsedMedicines.length > 0) {
        return parsedMedicines;
     }
  }
  const medicinesWithUUIDs = initialMockMedicines.map(med => ({...med, id: med.id || uuidv4(), availability: med.availability.map(avail => ({...avail, pharmacyId: avail.pharmacyId || uuidv4() })) }));
  localStorage.setItem('medicinesData_k', JSON.stringify(medicinesWithUUIDs));
  return medicinesWithUUIDs;
};

export const getMedicineById = (id) => {
  const medicines = getMedicines();
  return medicines.find(med => med.id === id);
};

export const updateMedicineStock = (medicineId, pharmacyId, newStock) => {
  const medicines = getMedicines();
  const medicineIndex = medicines.findIndex(med => med.id === medicineId);
  if (medicineIndex !== -1) {
    const pharmacyIndex = medicines[medicineIndex].availability.findIndex(avail => avail.pharmacyId === pharmacyId);
    if (pharmacyIndex !== -1) {
      medicines[medicineIndex].availability[pharmacyIndex].stock = parseInt(newStock, 10);
      localStorage.setItem('medicinesData_k', JSON.stringify(medicines));
      return medicines[medicineIndex];
    }
  }
  return null;
};
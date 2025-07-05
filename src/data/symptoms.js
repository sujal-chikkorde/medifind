export const symptomsData = {
  common: [
    { id: 's_fever', name: 'Fever', relatedSpecialties: ['General Physician', 'Pediatrician'] },
    { id: 's_cough', name: 'Cough', relatedSpecialties: ['General Physician', 'Pulmonologist', 'Pediatrician'] },
    { id: 's_headache', name: 'Headache', relatedSpecialties: ['General Physician', 'Neurologist'] },
    { id: 's_sore_throat', name: 'Sore Throat', relatedSpecialties: ['General Physician', 'ENT Specialist'] },
    { id: 's_fatigue', name: 'Fatigue / Tiredness', relatedSpecialties: ['General Physician'] },
    { id: 's_body_ache', name: 'Body Ache / Muscle Pain', relatedSpecialties: ['General Physician', 'Orthopedist', 'Rheumatologist'] },
    { id: 's_runny_nose', name: 'Runny or Stuffy Nose', relatedSpecialties: ['General Physician', 'ENT Specialist'] },
    { id: 's_nausea', name: 'Nausea / Vomiting', relatedSpecialties: ['General Physician', 'Gastroenterologist'] },
    { id: 's_diarrhea', name: 'Diarrhea', relatedSpecialties: ['General Physician', 'Gastroenterologist'] },
    { id: 's_abdominal_pain', name: 'Abdominal Pain', relatedSpecialties: ['General Physician', 'Gastroenterologist', 'Gynecologist'] },
  ],
  cardiovascular: [
    { id: 's_chest_pain', name: 'Chest Pain or Discomfort', relatedSpecialties: ['Cardiologist', 'General Physician'] },
    { id: 's_shortness_of_breath', name: 'Shortness of Breath', relatedSpecialties: ['Cardiologist', 'Pulmonologist', 'General Physician'] },
    { id: 's_palpitations', name: 'Palpitations (Irregular Heartbeat)', relatedSpecialties: ['Cardiologist'] },
    { id: 's_dizziness', name: 'Dizziness / Lightheadedness', relatedSpecialties: ['General Physician', 'Neurologist', 'Cardiologist'] },
    { id: 's_swelling_legs', name: 'Swelling in Legs/Ankles', relatedSpecialties: ['Cardiologist', 'General Physician', 'Nephrologist'] },
  ],
  respiratory: [
    { id: 's_difficulty_breathing', name: 'Difficulty Breathing', relatedSpecialties: ['Pulmonologist', 'Cardiologist', 'General Physician'] },
    { id: 's_wheezing', name: 'Wheezing', relatedSpecialties: ['Pulmonologist', 'General Physician'] },
    { id: 's_chronic_cough', name: 'Chronic Cough (long-lasting)', relatedSpecialties: ['Pulmonologist', 'General Physician'] },
  ],
  neurological: [
    { id: 's_severe_headache', name: 'Severe or Persistent Headache', relatedSpecialties: ['Neurologist', 'General Physician'] },
    { id: 's_migraine', name: 'Migraine', relatedSpecialties: ['Neurologist'] },
    { id: 's_seizures', name: 'Seizures', relatedSpecialties: ['Neurologist'] },
    { id: 's_numbness_tingling', name: 'Numbness or Tingling', relatedSpecialties: ['Neurologist', 'Orthopedist'] },
    { id: 's_memory_loss', name: 'Memory Loss / Confusion', relatedSpecialties: ['Neurologist', 'Psychiatrist', 'General Physician'] },
    { id: 's_tremors', name: 'Tremors / Shaking', relatedSpecialties: ['Neurologist'] },
  ],
  dermatological: [
    { id: 's_skin_rash', name: 'Skin Rash or Itching', relatedSpecialties: ['Dermatologist', 'General Physician'] },
    { id: 's_acne', name: 'Acne / Pimples', relatedSpecialties: ['Dermatologist'] },
    { id: 's_hair_loss', name: 'Hair Loss', relatedSpecialties: ['Dermatologist', 'Endocrinologist'] },
    { id: 's_mole_changes', name: 'Changes in Moles or Skin Lesions', relatedSpecialties: ['Dermatologist', 'Oncologist'] },
  ],
  gastrointestinal: [
    { id: 's_heartburn', name: 'Heartburn / Acid Reflux', relatedSpecialties: ['Gastroenterologist', 'General Physician'] },
    { id: 's_constipation', name: 'Constipation', relatedSpecialties: ['Gastroenterologist', 'General Physician'] },
    { id: 's_bloating', name: 'Bloating / Gas', relatedSpecialties: ['Gastroenterologist', 'General Physician'] },
    { id: 's_blood_in_stool', name: 'Blood in Stool', relatedSpecialties: ['Gastroenterologist', 'General Physician'] },
  ],
  musculoskeletal: [
    { id: 's_joint_pain', name: 'Joint Pain / Swelling', relatedSpecialties: ['Orthopedist', 'Rheumatologist', 'General Physician'] },
    { id: 's_back_pain', name: 'Back Pain', relatedSpecialties: ['Orthopedist', 'Neurologist', 'Physiotherapist'] },
    { id: 's_neck_pain', name: 'Neck Pain', relatedSpecialties: ['Orthopedist', 'Neurologist', 'Physiotherapist'] },
    { id: 's_limited_motion', name: 'Limited Range of Motion', relatedSpecialties: ['Orthopedist', 'Physiotherapist'] },
  ],
  ent: [
    { id: 's_ear_pain', name: 'Ear Pain / Earache', relatedSpecialties: ['ENT Specialist', 'General Physician'] },
    { id: 's_hearing_loss', name: 'Hearing Loss / Difficulty Hearing', relatedSpecialties: ['ENT Specialist'] },
    { id: 's_sinus_pain', name: 'Sinus Pain / Pressure', relatedSpecialties: ['ENT Specialist', 'General Physician'] },
    { id: 's_hoarseness', name: 'Hoarseness / Voice Changes', relatedSpecialties: ['ENT Specialist'] },
    { id: 's_vertigo', name: 'Vertigo / Dizziness (spinning sensation)', relatedSpecialties: ['ENT Specialist', 'Neurologist'] },
  ],
  mental_health: [
    { id: 's_anxiety', name: 'Anxiety / Worry', relatedSpecialties: ['Psychiatrist', 'General Physician'] },
    { id: 's_depression', name: 'Depression / Low Mood', relatedSpecialties: ['Psychiatrist', 'General Physician'] },
    { id: 's_sleep_problems', name: 'Sleep Problems (Insomnia)', relatedSpecialties: ['Psychiatrist', 'General Physician', 'Neurologist'] },
    { id: 's_stress', name: 'High Stress Levels', relatedSpecialties: ['Psychiatrist', 'General Physician'] },
  ],
  womens_health: [
    { id: 's_menstrual_issues', name: 'Menstrual Irregularities / Pain', relatedSpecialties: ['Gynecologist'] },
    { id: 's_vaginal_discharge', name: 'Unusual Vaginal Discharge / Itching', relatedSpecialties: ['Gynecologist'] },
    { id: 's_breast_lump', name: 'Breast Lump / Pain', relatedSpecialties: ['Gynecologist', 'Oncologist', 'General Physician'] },
  ],
  mens_health: [
    { id: 's_urinary_problems_men', name: 'Urinary Problems (Frequent, Painful)', relatedSpecialties: ['Urologist'] },
    { id: 's_erectile_dysfunction', name: 'Erectile Dysfunction', relatedSpecialties: ['Urologist', 'Endocrinologist'] },
  ],
  endocrine: [
    { id: 's_excessive_thirst_urination', name: 'Excessive Thirst or Urination', relatedSpecialties: ['Endocrinologist', 'General Physician'] },
    { id: 's_unexplained_weight_change', name: 'Unexplained Weight Gain/Loss', relatedSpecialties: ['Endocrinologist', 'General Physician', 'Dietitian/Nutritionist'] },
    { id: 's_thyroid_problems', name: 'Thyroid Problems (Swelling, Fatigue)', relatedSpecialties: ['Endocrinologist'] },
  ],
  pediatric: [
    { id: 's_fussy_infant', name: 'Fussy or Irritable Infant', relatedSpecialties: ['Pediatrician'] },
    { id: 's_delayed_development', name: 'Delayed Development Milestones', relatedSpecialties: ['Pediatrician', 'Neurologist'] },
    { id: 's_rashes_children', name: 'Rashes in Children', relatedSpecialties: ['Pediatrician', 'Dermatologist'] },
  ],
  eye: [
    { id: 's_blurry_vision', name: 'Blurry Vision', relatedSpecialties: ['Ophthalmologist'] },
    { id: 's_eye_pain_redness', name: 'Eye Pain or Redness', relatedSpecialties: ['Ophthalmologist'] },
    { id: 's_double_vision', name: 'Double Vision', relatedSpecialties: ['Ophthalmologist', 'Neurologist'] },
  ],
  other: [
     { id: 's_dental_pain', name: 'Dental Pain / Toothache', relatedSpecialties: ['Dentist'] },
     { id: 's_bleeding_gums', name: 'Bleeding Gums', relatedSpecialties: ['Dentist'] },
     { id: 's_diet_advice', name: 'Need Diet or Nutrition Advice', relatedSpecialties: ['Dietitian/Nutritionist'] },
  ]
};

export const getAllSymptoms = () => {
  return Object.values(symptomsData).flat();
};

export const getSpecialtiesForSymptoms = (selectedSymptomIds) => {
  const allSymptoms = getAllSymptoms();
  const relatedSpecialties = new Set();
  selectedSymptomIds.forEach(symptomId => {
    const symptom = allSymptoms.find(s => s.id === symptomId);
    if (symptom && symptom.relatedSpecialties) {
      symptom.relatedSpecialties.forEach(specialty => relatedSpecialties.add(specialty));
    }
  });
  return Array.from(relatedSpecialties);
};
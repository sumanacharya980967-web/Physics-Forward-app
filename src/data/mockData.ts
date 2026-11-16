import {
  User,
  Program,
  Board,
  Medium,
  ClassLevel,
  Subject,
  Course,
  Batch,
  LiveClass,
  RecordedClass,
  StudyMaterial,
  Exam,
  Assignment,
  PaymentOrder,
  Coupon,
  ContactEnquiry,
  AppNotification,
  AuditLog,
  AppSettings,
  PhysicsFormula,
  SocialChannel
} from '../types';

export const INITIAL_PROGRAMS: Program[] = [
  {
    id: 'prog-class-9',
    code: 'class-9',
    name: 'Class 9',
    nameBn: 'নবম শ্রেণী (Class 9)',
    tagline: 'Learn Physics clearly with structured lessons, concepts, and regular practice.',
    taglineBn: 'সুনির্দিষ্ট অধ্যায়ভিত্তিক পাঠ, স্বচ্ছ ধারণা ও নিয়মিত অনুশীলনের মাধ্যমে পদার্থবিজ্ঞান শেখো।',
    description: 'Physics preparation for Class 9 students. Structured curriculum covering complete Class 9 Physics syllabus, fundamental concepts, numerical problem solving, recorded video library, live doubt sessions, handwritten notes, homework assignments, chapter-wise tests, and final exam preparation.',
    descriptionBn: 'নবম শ্রেণীর শিক্ষার্থীদের জন্য সুবিন্যস্ত পদার্থবিজ্ঞান পাঠক্রম। পরিমাপ, বল ও গতি, কার্য-ক্ষমতা-শক্তি, শব্দ, পদার্থের গঠন ও ধর্ম, হোমওয়ার্ক অ্যাসাইনমেন্ট, লাইভ ডাউট ক্লাস ও চ্যাপ্টার টেস্ট।',
    subject: 'Physics',
    category: 'school',
    active: true,
    archived: false,
    order: 1,
    badge: 'Class 9 Academic',
    badgeBn: 'নবম শ্রেণী অ্যাকাডেমিক',
    accentColor: '#8B5CF6',
    icon: 'GraduationCap',
    imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=700&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80',
    duration: '10 Months',
    basePrice: 1299,
    eligibility: 'Students entering or currently in Class 9',
    eligibilityBn: 'নবম শ্রেণীর সকল ছাত্রছাত্রীদের জন্য',
    displayOnWebsite: true,
    displayOnApp: true,
    flowPath: 'Class 9 → Physics → Chapters → Lessons → Assignments → Tests',
    features: [
      'Class 9 Physics syllabus',
      'Concept lessons',
      'Problem-solving practice',
      'Recorded classes',
      'Live doubt sessions',
      'Study notes',
      'Homework assignments',
      'Chapter-wise tests',
      'Exam preparation'
    ],
    featuresBn: [
      'নবম শ্রেণীর সম্পূর্ণ পদার্থবিজ্ঞান সিলেবাস',
      'কনসেপ্ট লেকচার ও সূত্রের সহজ ব্যাখ্যা',
      'গাণিতিক সমস্যার সমাধান অনুশীলন',
      'রেকর্ডেড ক্লাস সংগ্রহশালা',
      'সাপ্তাহিক লাইভ ডাউট ক্লিয়ারিং সেশন',
      'অধ্যায়ভিত্তিক প্রাঞ্জল বাংলা নোটস',
      'নিয়মিত হোমওয়ার্ক অ্যাসাইনমেন্ট ও মূল্যায়ন',
      'অধ্যায়ভিত্তিক অনলাইন টেস্ট',
      'স্কুল ফাইনাল পরীক্ষার সম্পূর্ণ প্রস্তুতি'
    ],
    includedItems: [
      'Class 9 Physics Syllabus',
      'Concept Lessons',
      'Problem-Solving Practice',
      'Recorded Classes',
      'Live Doubt Sessions',
      'Study Notes',
      'Homework Assignments',
      'Chapter-wise Tests',
      'Exam Preparation'
    ],
    includedItemsBn: [
      'সম্পূর্ণ সিলেবাস',
      'কনসেপ্ট পাঠ',
      'সমস্যা অনুশীলন',
      'রেকর্ডেড ক্লাস',
      'লাইভ ডাউট ক্লাস',
      'স্টাডি নোটস',
      'হোমওয়ার্ক অ্যাসাইনমেন্ট',
      'অধ্যায় টেস্ট',
      'পরীক্ষা প্রস্তুতি'
    ]
  },
  {
    id: 'prog-class-10',
    code: 'class-10',
    name: 'Class 10',
    nameBn: 'দশম শ্রেণী (Class 10)',
    tagline: 'Comprehensive Madhyamik & Board Physics with numerical excellence.',
    taglineBn: 'দশম শ্রেণীর বোর্ড পরীক্ষার সম্পূর্ণ ও সর্বোচ্চ নম্বর অর্জনের নিশ্চিত প্রস্তুতি।',
    description: 'Comprehensive Board curriculum with complete conceptual coverage, numerical problem solving, 10 years solved board papers, live doubt classes, formula sheets, and chapterwise mock exams for Class 10 students.',
    descriptionBn: 'দশম শ্রেণীর সম্পূর্ণ ভৌতবিজ্ঞান সিলেবাস—পরিবেশের ভাবনা, গ্যাসের আচরণ, আলো, চলতড়িৎ, পরমাণুর নিউক্লিয়াস, পদার্থ ও রাসায়নিক গণনা। বিগত ১০ বছরের প্রশ্ন সমাধান ও বোর্ড মক টেস্ট।',
    subject: 'Physics',
    category: 'school',
    active: true,
    archived: false,
    order: 2,
    badge: 'Madhyamik / Board',
    badgeBn: 'মাধ্যমিক / বোর্ড পরীক্ষা',
    accentColor: '#F59E0B',
    icon: 'BookOpen',
    imageUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=700&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=1200&q=80',
    duration: '10 Months',
    basePrice: 1499,
    eligibility: 'Madhyamik & Class 10 Board aspirants',
    eligibilityBn: 'দশম শ্রেণী ও মাধ্যমিক পরীক্ষার্থীদের জন্য',
    displayOnWebsite: true,
    displayOnApp: true,
    flowPath: 'Class 10 → Physics → Chapters → Lessons → Assignments → Tests',
    features: [
      'Class 10 Physics Syllabus',
      'Concept Lectures & Formulas',
      'Live Doubt Clearing',
      'Past 10 Years Board Papers',
      'Chapterwise Mock Tests',
      'Bilingual Study Notes'
    ],
    featuresBn: [
      'সম্পূর্ণ দশম শ্রেণী সিলেবাস',
      'গাণিতিক সমস্যা ও শর্টকাট কৌশল',
      'সরাসরি লাইভ ডাউট ক্লিয়ারিং',
      'বিগত ১০ বছরের বোর্ড প্রশ্ন সমাধান',
      'অধ্যায়ভিত্তিক অনলাইন মক টেস্ট',
      'রঙিন হ্যান্ডরিটেন বাংলা নোটস'
    ],
    includedItems: [
      'Board Syllabus',
      'Formula Booklets',
      'Live Lectures',
      'Chapter Tests',
      'PYQ Solutions',
      'Progress Reports'
    ],
    includedItemsBn: [
      'সম্পূর্ণ সিলেবাস',
      'ফর্মুলা বুকলেট',
      'লাইভ লেকচার',
      'চ্যাপ্টার টেস্ট',
      'পিওয়াইকিউ সমাধান',
      'প্রগ্রেস রিপোর্ট'
    ]
  },
  {
    id: 'prog-class-11',
    code: 'class-11',
    name: 'Class 11',
    nameBn: 'একাদশ শ্রেণী (Class 11)',
    tagline: 'Higher Secondary science fundamentals and calculus-based physics.',
    taglineBn: 'একাদশ উচ্চমাধ্যমিক পদার্থবিজ্ঞানের দৃঢ় বুনিয়াদ ও গভীর ধারণা।',
    description: 'Calculus-based physics, vectors, kinematics, Newton’s laws, work-energy, rotational dynamics, thermodynamics, fluid mechanics, and oscillations for Class 11 Higher Secondary students.',
    descriptionBn: 'উচ্চমাধ্যমিক একাদশ শ্রেণীর গতিবিদ্যা, ভেক্টর, নিউটনের গতিসূত্র, তাপগতিবিদ্যা, সান্দ্রতা ও তরঙ্গের পুঙ্খানুপুঙ্খ বিশ্লেষণ। বোর্ড ও জয়েন্ট এন্ট্রান্সের ভিত্তি মজবুত করার পাঠক্রম।',
    subject: 'Physics',
    category: 'school',
    active: true,
    archived: false,
    order: 3,
    badge: 'Higher Secondary Core',
    badgeBn: 'উচ্চমাধ্যমিক একাদশ',
    accentColor: '#3B82F6',
    icon: 'Layers',
    imageUrl: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=700&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=1200&q=80',
    duration: '12 Months',
    basePrice: 1999,
    eligibility: 'Class 11 Science students (WBCHSE / CBSE / CISCE)',
    eligibilityBn: 'একাদশ বিজ্ঞান বিভাগের শিক্ষার্থীদের জন্য',
    displayOnWebsite: true,
    displayOnApp: true,
    flowPath: 'Class 11 → Physics → Chapters → Lessons → Assignments → Tests',
    features: [
      'Calculus-based Physics',
      'Vectors & Kinematics Mastery',
      'Live Interactive Classes',
      'Weekly Problem Worksheets',
      'Chapter Assessments',
      'PYQs and Entrance Links'
    ],
    featuresBn: [
      'ক্যালকুলাস ভিত্তিক পদার্থবিদ্যা',
      'ভেক্টর ও গতিবিদ্যার সহজ সমাধান',
      'ইন্টারেক্টিভ লাইভ ক্লাস',
      'সাপ্তাহিক প্রবলেম ওয়ার্কশিট',
      'অধ্যায়ভিত্তিক মূল্যায়ন',
      'এইচ.এস ও এন্ট্রান্স সংযোগ'
    ],
    includedItems: [
      'HS 11 Syllabus',
      'Concept Lecture Notes',
      'Live Doubt Rooms',
      'Assignment Evaluations',
      'Chapter Mock Tests'
    ],
    includedItemsBn: [
      'একাদশ সম্পূর্ণ সিলেবাস',
      'কনসেপ্ট লেকচার নোটস',
      'লাইভ ডাউট রুম',
      'অ্যাসাইনমেন্ট মূল্যায়ন',
      'চ্যাপ্টার মক টেস্ট'
    ]
  },
  {
    id: 'prog-class-12',
    code: 'class-12',
    name: 'Class 12',
    nameBn: 'দ্বাদশ শ্রেণী (Class 12)',
    tagline: 'Higher Secondary board rank booster and entrance stepping stone.',
    taglineBn: 'দ্বাদশ শ্রেণীর ফাইনাল বোর্ড ও উচ্চ স্কোরের বিশেষ প্রস্তুতি।',
    description: 'Electrodynamics, magnetism, alternating current, optics, wave physics, and modern physics for Class 12 board examinations with rigorous answer-writing guidance.',
    descriptionBn: 'স্থিরতড়িৎ, চুম্বকত্ব, পরিবর্তী প্রবাহ, আলোকবিজ্ঞান এবং আধুনিক পদার্থবিজ্ঞানের পূর্ণাঙ্গ প্রস্তুতি। ৫ নম্বরের বর্ণনামূলক ও নিউমেরিক্যাল প্রশ্নের নিখুঁত প্রস্তুতি।',
    subject: 'Physics',
    category: 'school',
    active: true,
    archived: false,
    order: 4,
    badge: 'HS Final Rankers',
    badgeBn: 'উচ্চমাধ্যমিক ফাইনাল',
    accentColor: '#EC4899',
    icon: 'Award',
    imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=700&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80',
    duration: '11 Months',
    basePrice: 2199,
    eligibility: 'Class 12 Higher Secondary students',
    eligibilityBn: 'দ্বাদশ শ্রেণীর সকল পরীক্ষার্থীদের জন্য',
    displayOnWebsite: true,
    displayOnApp: true,
    flowPath: 'Class 12 → Physics → Chapters → Lessons → Assignments → Tests',
    features: [
      'Full Class 12 Syllabus',
      '5-Mark Question Guidance',
      'Circuits & Optics Simulations',
      'Practical & Viva Assistance',
      'Full-Length Test Series'
    ],
    featuresBn: [
      'দ্বাদশ শ্রেণীর সম্পূর্ণ সিলেবাস',
      '৫ নম্বরের প্রশ্নের উত্তরের কাঠামো',
      'বর্তনী ও আলোর বিশেষ সিমুলেশন',
      'প্র্যাকটিক্যাল ও ভাইভা সহায়তা',
      'সম্পূর্ণ টেস্ট সিরিজ'
    ],
    includedItems: [
      'Class 12 Syllabus',
      'Live Masterclasses',
      'Full Test Series',
      'Council PYQ Solutions',
      'Rank Analytics'
    ],
    includedItemsBn: [
      'দ্বাদশ সিলেবাস',
      'লাইভ মাস্টারক্লাস',
      'ফুল টেস্ট সিরিজ',
      'কাউন্সিল প্রশ্ন সমাধান',
      'র‍্যাঙ্ক অ্যানালিসিস'
    ]
  },
  {
    id: 'prog-neet',
    code: 'neet',
    name: 'NEET',
    nameBn: 'নিট (NEET)',
    tagline: 'Strengthen your Physics concepts and medical entrance problem-solving speed.',
    taglineBn: 'পদার্থবিজ্ঞানের ভিত্তি শক্ত করো এবং নির্ভুল দ্রুত প্রশ্ন সমাধানের দক্ষতা অর্জন করো।',
    description: 'Physics preparation for NEET students. Concept-building classes, problem-solving sessions, live classes, recorded classes, study materials, chapter-wise practice, mock tests, previous-year questions (PYQs), and performance tracking.',
    descriptionBn: 'নিট মেডিকেল শিক্ষার্থীদের জন্য বিশেষ পদার্থবিজ্ঞান পাঠক্রম। এনসিইআরটি ভিত্তিক স্বচ্ছ ধারণা, দ্রুত নির্ভুল ক্যালকুলেশন, ফর্মুলা শিট ও বিগত ২০ বছরের নিট প্রশ্নের অধ্যায়ভিত্তিক সমাধান।',
    subject: 'Physics',
    category: 'competitive',
    active: true,
    archived: false,
    order: 5,
    badge: 'Medical Entrance',
    badgeBn: 'মেডিকেল প্রবেশিকা',
    accentColor: '#10B981',
    icon: 'Stethoscope',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    duration: '12 Months',
    basePrice: 2499,
    eligibility: 'NEET Medical Aspirants (Class 11, 12 & Droppers)',
    eligibilityBn: 'নিট পরীক্ষার্থী ও ড্রপার শিক্ষার্থীদের জন্য',
    displayOnWebsite: true,
    displayOnApp: true,
    flowPath: 'NEET → Physics → Courses → Chapters → Lessons → Tests',
    features: [
      'NEET Physics syllabus',
      'Concept-building classes',
      'Problem-solving sessions',
      'Live classes',
      'Recorded classes',
      'Study materials',
      'Chapter-wise practice',
      'Mock tests',
      'Previous-year questions',
      'Performance tracking'
    ],
    featuresBn: [
      'নিট পদার্থবিজ্ঞান সম্পূর্ণ সিলেবাস',
      'কনসেপ্ট-বিল্ডিং ক্লাস',
      'প্রবলেম সলভিং বিশেষ সেশন',
      'ইন্টারেক্টিভ লাইভ ক্লাস',
      'রেকর্ডেড ক্লাসের আনলিমিটেড অ্যাক্সেস',
      'হ্যান্ডরিটেন স্টাডি মেটেরিয়াল ও ফর্মুলা বুকলেট',
      'অধ্যায়ভিত্তিক স্পিড ও অ্যাকুরেসি প্র্যাকটিস',
      'ফুল-লেন্থ ও চ্যাপ্টারওয়াইজ মক টেস্ট',
      'বিগত ২০ বছরের নিট প্রশ্ন (PYQ) ব্যাখ্যাসহ',
      'গ্রাফিক্যাল পারফরম্যান্স ট্র্যাকিং'
    ],
    includedItems: [
      'NEET Physics Syllabus',
      'Concept-Building Classes',
      'Problem-Solving Sessions',
      'Live Classes',
      'Recorded Classes',
      'Study Materials',
      'Chapter-wise Practice',
      'Mock Tests',
      'Previous-Year Questions (PYQs)',
      'Performance Tracking'
    ],
    includedItemsBn: [
      'সম্পূর্ণ সিলেবাস',
      'কনসেপ্ট ক্লাস',
      'সমস্যা সমাধান',
      'লাইভ ক্লাস',
      'রেকর্ডেড ক্লাস',
      'স্টাডি মেটেরিয়াল',
      'অধ্যায়ভিত্তিক প্র্যাকটিস',
      'মক টেস্ট',
      'বিগত বছরের প্রশ্ন',
      'পারফরম্যান্স ট্র্যাকিং'
    ]
  },
  {
    id: 'prog-jee-mains',
    code: 'jee-mains',
    name: 'JEE Mains',
    nameBn: 'জেইই মেইনস (JEE Mains)',
    tagline: 'Build strong Physics concepts and prepare with focused competitive practice.',
    taglineBn: 'পদার্থবিজ্ঞানের গভীর ধারণা গড়ে তোলো এবং লক্ষ্যভিত্তিক অনুশীলনে প্রস্তুতি নাও।',
    description: 'Physics preparation for JEE Main students. Comprehensive coverage of the complete syllabus with concept classes, advanced numerical problem solving, live and recorded lectures, practice questions, previous-year questions (PYQs), mock tests, performance analysis, and handwritten study materials.',
    descriptionBn: 'জেইই মেইন পরীক্ষার্থীদের জন্য সম্পূর্ণ পদার্থবিজ্ঞান প্রস্তুতি। মেকানিক্স, ইলেকট্রোডাইনামিক্স, অপটিক্স, বিগত ১৫ বছরের প্রশ্ন সমাধান, লাইভ ও রেকর্ডেড ক্লাস, অনলাইন টেস্ট ও পারফরম্যান্স বিশ্লেষণ।',
    subject: 'Physics',
    category: 'competitive',
    active: true,
    archived: false,
    order: 6,
    badge: 'Engineering Entrance',
    badgeBn: 'ইঞ্জিনিয়ারিং প্রবেশিকা',
    accentColor: '#FF9933',
    icon: 'Compass',
    imageUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=700&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=1200&q=80',
    duration: '12 Months',
    basePrice: 2499,
    eligibility: 'JEE Mains & WBJEE Aspirants',
    eligibilityBn: 'জেইই মেইন ও ডব্লিউবিজেইই পরীক্ষার্থীদের জন্য',
    displayOnWebsite: true,
    displayOnApp: true,
    flowPath: 'JEE Mains → Physics → Courses → Chapters → Lessons → Tests',
    features: [
      'JEE Main Physics syllabus',
      'Chapter-wise courses',
      'Concept classes',
      'Problem-solving classes',
      'Recorded lectures',
      'Live classes',
      'Practice questions',
      'Mock tests',
      'Previous-year questions',
      'Performance analysis',
      'Study materials'
    ],
    featuresBn: [
      'জেইই মেইন পদার্থবিজ্ঞান সম্পূর্ণ সিলেবাস',
      'অধ্যায়ভিত্তিক সুনির্দিষ্ট কোর্স',
      'গভীর কনসেপ্ট ক্লাস ও ভিজ্যুয়ালাইজেশন',
      'অ্যাডভান্সড প্রবলেম সলভিং সেশন',
      'হাই-ডেফিনিশন রেকর্ডেড লেকচার লাইব্রেরি',
      'নিয়মিত ইন্টারেক্টিভ লাইভ ক্লাস',
      'অধ্যায়ভিত্তিক প্র্যাকটিস প্রশ্নাবলী',
      'টাইমড অনলাইন মক টেস্ট ও র‍্যাঙ্কিং',
      'বিগত ১৫ বছরের জেইই প্রশ্ন (PYQ) সমাধান',
      'ব্যক্তিগত পারফরম্যান্স অ্যানালিসিস',
      'হ্যান্ডরিটেন স্টাডি মেটেরিয়ালস ও ফর্মুলা শিট'
    ],
    includedItems: [
      'JEE Main Physics Syllabus',
      'Concept Classes',
      'Problem-Solving Classes',
      'Recorded Lectures',
      'Live Classes',
      'Practice Questions',
      'Mock Tests',
      'Previous-Year Questions (PYQs)',
      'Performance Analysis',
      'Study Materials'
    ],
    includedItemsBn: [
      'সম্পূর্ণ সিলেবাস',
      'কনসেপ্ট ক্লাস',
      'সমস্যা সমাধান',
      'রেকর্ডেড লেকচার',
      'লাইভ ক্লাস',
      'অনুশীলনী প্রশ্ন',
      'মক টেস্ট',
      'বিগত বছরের প্রশ্ন (PYQ)',
      'বিশ্লেষণ রিপোর্ট',
      'স্টাডি মেটেরিয়াল'
    ]
  },
  {
    id: 'prog-foundation',
    code: 'foundation',
    name: 'Foundation',
    nameBn: 'ফাউন্ডেশন (Foundation)',
    tagline: 'Build a strong foundation in Physics from the beginning.',
    taglineBn: 'শুরু থেকেই পদার্থবিজ্ঞানের ভিত্তি সুদৃঢ় ও মজবুত করে গড়ে তোলো।',
    description: 'Foundation-level Physics learning for students who want to develop strong Physics concepts before advanced competitive preparation. Basic Physics concepts, concept-building lessons, visual explanations, problem-solving, practice questions, recorded classes, live classes, study materials, chapter-wise tests, and progress reports.',
    descriptionBn: 'উন্নত প্রতিযোগিতামূলক ও বোর্ড পরীক্ষার পূর্বে পদার্থবিজ্ঞানের মৌলিক ভিত সুদৃঢ় করার বিশেষ পাঠক্রম। ভিজ্যুয়াল অ্যানিমেশন, চিন্তাভাবনার গভীরতা ও বাস্তব উদাহরণের মাধ্যমে পদার্থবিজ্ঞান শেখার সুযোগ।',
    subject: 'Physics',
    category: 'foundation',
    active: true,
    archived: false,
    order: 7,
    badge: 'Pre-Competitive & Core',
    badgeBn: 'ফাউন্ডেশন পাঠক্রম',
    accentColor: '#3B82F6',
    icon: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=700&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=1200&q=80',
    duration: '10 Months',
    basePrice: 1799,
    eligibility: 'Foundation Aspirants preparing early for JEE/NEET/Boards',
    eligibilityBn: 'শুরু থেকেই বিজ্ঞান ও পদার্থবিদ্যার ভিত শক্ত করতে ইচ্ছুক শিক্ষার্থীদের জন্য',
    displayOnWebsite: true,
    displayOnApp: true,
    flowPath: 'Foundation → Physics → Courses → Chapters → Lessons → Tests',
    features: [
      'Basic Physics concepts',
      'Concept-building lessons',
      'Visual explanations',
      'Problem-solving',
      'Practice questions',
      'Recorded classes',
      'Live classes',
      'Study materials',
      'Chapter-wise tests',
      'Progress reports'
    ],
    featuresBn: [
      'মৌলিক পদার্থবিজ্ঞানের স্বচ্ছ ধারণা',
      'কনসেপ্ট বিল্ডিং লেকচার ও প্র্যাকটিক্যাল উদাহরণ',
      'ভিজ্যুয়াল ব্যাখ্যা ও অ্যানিমেশন',
      'গাণিতিক সমস্যা সমাধানের বিজ্ঞানসম্মত পদ্ধতি',
      'ধারাবাহিক অনুশীলন প্রশ্নাবলী',
      'ফুল এইচডি রেকর্ডেড ক্লাস',
      'সরাসরি প্রশ্নোত্তর সহ লাইভ ক্লাস',
      'হাতে লেখা রঙিন স্টাডি নোটস',
      'অধ্যায়ভিত্তিক মূল্যায়ন টেস্ট',
      'নিয়মিত প্রগ্রেস ও লার্নিং রিপোর্ট'
    ],
    includedItems: [
      'Basic Physics Concepts',
      'Concept-Building Lessons',
      'Visual Explanations',
      'Problem-Solving',
      'Practice Questions',
      'Recorded Classes',
      'Live Classes',
      'Study Materials',
      'Chapter-wise Tests',
      'Progress Reports'
    ],
    includedItemsBn: [
      'মৌলিক ধারণা',
      'কনসেপ্ট পাঠ',
      'ভিজ্যুয়াল ব্যাখ্যা',
      'সমস্যা সমাধান',
      'অনুশীলন প্রশ্ন',
      'রেকর্ডেড ক্লাস',
      'লাইভ ক্লাস',
      'স্টাডি মেটেরিয়াল',
      'অধ্যায় টেস্ট',
      'প্রগ্রেস রিপোর্ট'
    ]
  }
];

export const OFFICIAL_SOCIAL_CHANNELS: SocialChannel[] = [
  {
    id: 'youtube',
    platform: 'YouTube',
    name: 'YouTube — PHYSICS FORWARD',
    handle: '@sumanacharya_physicsforward',
    url: 'https://www.youtube.com/@sumanacharya_physicsforward',
    buttonText: 'Visit YouTube Channel',
    description: 'Watch comprehensive Physics video lessons, animated conceptual breakdowns, and numerical problem solving.',
    descriptionBn: 'সম্পূর্ণ পদার্থবিজ্ঞান ভিডিও লেকচার, অধ্যায়ভিত্তিক অ্যানিমেশন ও গাণিতিক সমস্যার বিশদ সমাধান।',
    enabled: true,
    accentColor: '#FF0000'
  },
  {
    id: 'facebook',
    platform: 'Facebook',
    name: 'Facebook — PHYSICS FORWARD',
    handle: 'physicsforward',
    url: 'https://www.facebook.com/physicsforward',
    buttonText: 'Visit Facebook Page',
    description: 'Official announcements, student updates, educational posts, and community events.',
    descriptionBn: 'অফিসিয়াল ঘোষণা, ব্যাচ আপডেট, শিক্ষামূলক পোস্ট এবং ছাত্রছাত্রীদের সাফল্য।',
    enabled: true,
    accentColor: '#1877F2'
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    name: 'Instagram — @physicsforward',
    handle: '@physicsforward',
    url: 'https://www.instagram.com/physicsforward?igsh=dGN3MGFja3Jva2M0',
    buttonText: 'Follow on Instagram',
    description: 'Visual physics concepts, quick formula carousels, exam tips, and daily physics challenges.',
    descriptionBn: 'ভিজ্যুয়াল ফিজিক্স কনসেপ্ট, দ্রুত সূত্র রিভিশন রিলস এবং দৈনন্দিন কুইজ চ্যালেঞ্জ।',
    enabled: true,
    accentColor: '#E4405F'
  },
  {
    id: 'telegram',
    platform: 'Telegram',
    name: 'Telegram — PHYSICS FORWARD',
    handle: 'sumanacharya_physicsforward',
    url: 'https://t.me/sumanacharya_physicsforward',
    buttonText: 'Join Telegram',
    description: 'Instant PDF study notes, previous year question banks (PYQs), formulas, and exam alerts.',
    descriptionBn: 'ফ্রি স্টাডি নোটস পিডিএফ, বিগত বছরের প্রশ্নপত্র (PYQ), ফর্মুলা শিট এবং তাৎক্ষণিক নোটিফিকেশন।',
    enabled: true,
    accentColor: '#229ED9'
  },
  {
    id: 'whatsapp_channel',
    platform: 'WhatsApp Channel',
    name: 'WhatsApp Channel — PHYSICS FORWARD',
    handle: 'PHYSICS FORWARD Channel',
    url: 'https://whatsapp.com/channel/0029VbCCCCTGehELHL83HU3K',
    buttonText: 'Follow WhatsApp Channel',
    description: 'Direct broadcasts from Suman Sir, live class reminders, timetable changes, and priority notices.',
    descriptionBn: 'সরাসরি গুরুত্বপূর্ণ ক্লাসের রিমাইন্ডার, নোটিশ এবং সময়সূচীর তাৎক্ষণিক বার্তা।',
    enabled: true,
    accentColor: '#25D366'
  },
  {
    id: 'whatsapp_group',
    platform: 'WhatsApp Group',
    name: 'WhatsApp Group — PHYSICS FORWARD',
    handle: 'PHYSICS FORWARD Community',
    url: 'https://chat.whatsapp.com/HQiA0zocDAuL4GjFrLD7oh?mode=hqrt2',
    buttonText: 'Join WhatsApp Group',
    description: 'Interactive peer community for student doubt clearance, academic discussions, and physics questions.',
    descriptionBn: 'শিক্ষার্থীদের সরাসরি ডাউট ক্লিয়ারিং, অ্যাকাডেমিক আলোচনা এবং গ্রুপ ডিসকাশন।',
    enabled: true,
    accentColor: '#128C7E'
  }
];

export const INITIAL_SETTINGS: AppSettings = {
  brandName: 'PHYSICS FORWARD',
  brandLogo: '',
  brandFavicon: '',
  tagline: 'Understand Physics. Move Forward.',
  taglineBn: 'পদার্থবিজ্ঞান বোঝো, এগিয়ে চলো।',
  contactPhone: '8972263462',
  contactEmail: 'suman.acharya.980967@outlook.com',
  contactAddress: 'Contai, Purba Medinipur, West Bengal, India',
  primaryColor: '#FF9933',
  secondaryColor: '#111111',
  themeMode: 'light',
  appIconUrl: '',
  splashScreenUrl: '',
  footerBranding: 'PHYSICS FORWARD — Complete Academic & Competitive Physics Platform',
  copyrightText: '© 2026 PHYSICS FORWARD. All Rights Reserved.',
  copyrightTextBn: '© ২০২৬ ফিজিক্স ফরওয়ার্ড। সর্বস্বত্ব সংরক্ষিত।',
  allowRegistration: true,
  defaultLanguage: 'bn',
  noticeBn: 'নতুন সেশন ২০২৬ এর জন্য দশম ও একাদশ শ্রেণীর পদার্থবিজ্ঞান লাইভ ব্যাচ শুরু হয়েছে! এখনই নাম নথিভুক্ত করো।',
  noticeEn: 'New Session 2026 Live Batches for Class 10 & 11 Physics have started! Enroll today.',
  socialLinks: {
    youtube: 'https://www.youtube.com/@sumanacharya_physicsforward',
    facebook: 'https://www.facebook.com/physicsforward',
    instagram: 'https://www.instagram.com/physicsforward?igsh=dGN3MGFja3Jva2M0',
    telegram: 'https://t.me/sumanacharya_physicsforward',
    whatsappChannel: 'https://whatsapp.com/channel/0029VbCCCCTGehELHL83HU3K',
    whatsappGroup: 'https://chat.whatsapp.com/HQiA0zocDAuL4GjFrLD7oh?mode=hqrt2',
    whatsapp: 'https://chat.whatsapp.com/HQiA0zocDAuL4GjFrLD7oh?mode=hqrt2'
  },
  socialChannels: OFFICIAL_SOCIAL_CHANNELS,
  websiteCms: {
    heroHeadline: 'Master Physics with Clarity, Logic & Deep Understanding',
    heroHeadlineBn: 'পদার্থবিজ্ঞানের গভীর উপলব্ধি ও বোর্ড-জয়ী সাফল্যের দিশা',
    heroSubheadline: 'Empowering students from Class 9 to JEE & NEET with concept-driven bilingual pedagogy, live interactive classes, formula sheets, and timed mock tests.',
    heroSubheadlineBn: 'কনসেপ্ট ক্লাস, অ্যাডভান্সড প্রবলেম সলভিং, বিগত ১৫ বছরের পিওয়াইকিউ ও ব্যক্তিগত মেন্টরশিপের নির্ভরযোগ্য ঠিকানা।',
    heroBadge: 'Admissions Open for Session 2026',
    heroBadgeBn: 'ভর্তি চলছে — সেশন ২০২৬',
    whyChooseUs: [
      {
        id: 'w-1',
        title: 'Concept-First Pedagogy',
        titleBn: 'ধারণাভিত্তিক শিক্ষণ পদ্ধতি',
        desc: 'Every fundamental theorem is derived and visualized from first principles before formulas.',
        descBn: 'মুখস্থ নয়, প্রতিটি সূত্রের বাস্তব চিত্র ও গভীর বৈজ্ঞানিক ব্যাখ্যা দিয়ে শুরু হয় শিক্ষণ।',
        icon: 'Atom'
      },
      {
        id: 'w-2',
        title: 'Bilingual Mastery (Bengali & English)',
        titleBn: 'সহজ বাংলা ও ইংরেজি মাধ্যম',
        desc: 'Learn seamlessly in Bengali with international standard technical terminology for WB Board & Competitive exams.',
        descBn: 'পশ্চিমবঙ্গ বোর্ড ও সর্বভারতীয় পরীক্ষার উপযুক্ত প্রাঞ্জল বাংলা ও ইংরেজি দ্বৈত ভাষা সহায়তা।',
        icon: 'BookOpen'
      },
      {
        id: 'w-3',
        title: 'Systematic Timed Mock Tests',
        titleBn: 'নিয়মিত টাইমড অনলাইন মক টেস্ট',
        desc: 'Weekly 20-50 mark chapter assessments with negative marking and instant detailed solutions.',
        descBn: 'নেগেটিভ মার্কিং সহ অধ্যায়ভিত্তিক পরীক্ষা ও তাৎক্ষণিক ব্যাখ্যা সহ ফলাফল বিশ্লেষণ।',
        icon: 'Award'
      },
      {
        id: 'w-4',
        title: 'Direct Doubt Resolution Desk',
        titleBn: 'সরাসরি শিক্ষক ডাউট ক্লিয়ারিং ডেস্ক',
        desc: 'Students can upload problem photos or ask in dedicated doubt rooms answered by expert faculty.',
        descBn: 'খাতার সমাধান বা অঙ্কের ছবি আপলোড করে শিক্ষকদের কাছ থেকে সরাসরি সমাধান পাওয়ার সুবিধা।',
        icon: 'Users'
      }
    ],
    testimonials: [
      {
        id: 't-1',
        name: 'Soumyadeep Paul',
        exam: 'WBJEE / Class 12 WBCHSE',
        score: 'Physics Score: 96/100',
        text: 'Subrata Sir and Suman Sir made physics formulas come alive. The live numerical solving sessions cleared all my fears.',
        textBn: 'সুব্রত স্যার ও সুমন স্যারের ক্লাস করার পর ফিজিক্সের ভীতি পুরোপুরি কেটে গিয়েছে। নিউমেরিক্যাল সমাধানের আত্মবিশ্বাস তৈরি হয়েছে।'
      },
      {
        id: 't-2',
        name: 'Ankita Maiti',
        exam: 'Madhyamik 2025 Physical Science',
        score: 'Physical Science: 98/100',
        text: 'The chapter formula sheets and weekly online tests helped me achieve 98 in Madhyamik Physical Science.',
        textBn: 'অধ্যায়ভিত্তিক ফর্মুলা শিট এবং প্রতি রবিবারের টেস্ট আমাকে মাধ্যমিকে ৯৮ নম্বর পেতে সবচেয়ে বেশি সাহায্য করেছে।'
      }
    ],
    faqs: [
      {
        id: 'faq-1',
        question: 'Are classes conducted in Bengali or English?',
        questionBn: 'ক্লাসগুলি কি বাংলা মাধ্যমে নাকি ইংরেজি মাধ্যমে হয়?',
        answer: 'Classes are taught primarily in Bengali with standard English physics terms, making it ideal for both WB Board and All-India exams.',
        answerBn: 'ক্লাসের মূল আলোচনা প্রাঞ্জল বাংলা ভাষায় হলেও বৈজ্ঞানিক পরিভাষা ও পরীক্ষার প্রশ্ন বাংলা ও ইংরেজি উভয় মাধ্যমেই সরবরাহ করা হয়।'
      },
      {
        id: 'faq-2',
        question: 'What if I miss a live lecture?',
        questionBn: 'লাইভ ক্লাস মিস হলে কি রেকর্ডিং পাওয়া যাবে?',
        answer: 'Yes! Every live class is recorded in HD and published within 2 hours with accompanying PDF lecture notes.',
        answerBn: 'হ্যাঁ! প্রতিটি লাইভ ক্লাসের এইচডি রেকর্ডিং এবং ক্লাস নোটস পিডিএফ আকারে তাৎক্ষণিকভাবে স্টুডেন্ট পোর্টালে যুক্ত হয়।'
      },
      {
        id: 'faq-3',
        question: 'Can I access the platform on my mobile phone?',
        questionBn: 'মোবাইল ফোনে কি এই প্ল্যাটফর্ম ব্যবহার করা যাবে?',
        answer: 'Yes, PHYSICS FORWARD is fully responsive on mobile browsers and has a dedicated Student Mobile App interface.',
        answerBn: 'হ্যাঁ, যেকোনো অ্যান্ড্রয়েড বা আইওএস মোবাইল ব্রাউজারে সম্পূর্ণ রেসপন্সিভ এবং বিশেষ মোবাইল অ্যাপ মোড রয়েছে।'
      }
    ],
    seoTitle: 'PHYSICS FORWARD — Best Physics Learning Platform for Class 9, 10, 11, 12, JEE & NEET',
    metaDescription: 'Join PHYSICS FORWARD by Suman Acharya & Subrata Acharya in Contai, West Bengal. Concept-driven Physics classes, timed tests, and handwritten notes.',
    ogImageUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=1200&q=80'
  },
  mobileCms: {
    banners: [
      {
        id: 'mb-1',
        title: 'Madhyamik 2026 Target Batch',
        titleBn: 'মাধ্যমিক ২০২৬ স্পেশাল টার্গেট ব্যাচ',
        subtitle: '100% Concept clarity & 10 years question solutions',
        imageUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=600&q=80',
        linkUrl: '/courses/course-10-madhyamik',
        active: true
      },
      {
        id: 'mb-2',
        title: 'JEE Mains & WBJEE Numerical Booster',
        titleBn: 'জেইই ও ডব্লিউবিজেইই নিউমেরিক্যাল বুস্টার',
        subtitle: 'Advanced problem tricks and weekly timed tests',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
        linkUrl: '/courses/course-jee-mains',
        active: true
      }
    ],
    announcementsTicker: 'New Live Class on Current Electricity tonight at 7:00 PM. Check Live Classes tab!',
    announcementsTickerBn: 'আজ সন্ধ্যা ৭:০০ টায় চলতড়িৎ লাইভ ক্লাস অনুষ্ঠিত হবে। লাইভ ক্লাস ট্যাব দেখুন!',
    sections: [
      { id: 'sec-hero', name: 'Hero Carousel', enabled: true, order: 1 },
      { id: 'sec-programs', name: 'Academic Programs Grid', enabled: true, order: 2 },
      { id: 'sec-live', name: 'Upcoming Live Lectures', enabled: true, order: 3 },
      { id: 'sec-tools', name: 'Physics Formula Tools & Solvers', enabled: true, order: 4 },
      { id: 'sec-social', name: 'Official Connect With Us Community', enabled: true, order: 5 }
    ],
    supportPhone: '8972263462',
    supportWhatsapp: 'https://chat.whatsapp.com/HQiA0zocDAuL4GjFrLD7oh?mode=hqrt2'
  }
};

export const INITIAL_BOARDS: Board[] = [
  {
    id: 'board-wbbse',
    code: 'WBBSE',
    name: 'West Bengal Board of Secondary Education',
    nameBn: 'পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ',
    active: true,
    description: 'Madhyamik Pariksha (Class 9 - 10) curriculum'
  },
  {
    id: 'board-wbchse',
    code: 'WBCHSE',
    name: 'West Bengal Council of Higher Secondary Education',
    nameBn: 'পশ্চিমবঙ্গ উচ্চমাধ্যমিক শিক্ষা সংসদ',
    active: true,
    description: 'Higher Secondary (Class 11 - 12) Science curriculum'
  },
  {
    id: 'board-cbse',
    code: 'CBSE',
    name: 'Central Board of Secondary Education',
    nameBn: 'সিবিএসই (CBSE)',
    active: true,
    description: 'NCERT based all-India curriculum'
  },
  {
    id: 'board-icse',
    code: 'ICSE',
    name: 'Council for the Indian School Certificate Examinations',
    nameBn: 'আইসিএসই / আইএসসি (ICSE/ISC)',
    active: true,
    description: 'CISCE standard curriculum'
  }
];

export const INITIAL_MEDIUMS: Medium[] = [
  { id: 'med-bn', code: 'BN', name: 'Bengali Medium', nameBn: 'বাংলা মাধ্যম' },
  { id: 'med-en', code: 'EN', name: 'English Medium', nameBn: 'ইংরেজি মাধ্যম' },
  { id: 'med-hi', code: 'HI', name: 'Hindi Medium', nameBn: 'হিন্দি মাধ্যম' }
];

export const INITIAL_CLASSES: ClassLevel[] = [
  { id: 'class-9', code: '9', name: 'Class 9', nameBn: 'নবম শ্রেণী', boardId: 'board-wbbse' },
  { id: 'class-10', code: '10', name: 'Class 10 (Madhyamik)', nameBn: 'দশম শ্রেণী (মাধ্যমিক)', boardId: 'board-wbbse' },
  { id: 'class-11', code: '11', name: 'Class 11 (Higher Secondary)', nameBn: 'একাদশ শ্রেণী (উচ্চমাধ্যমিক)', boardId: 'board-wbchse' },
  { id: 'class-12', code: '12', name: 'Class 12 (Higher Secondary)', nameBn: 'দ্বাদশ শ্রেণী (উচ্চমাধ্যমিক)', boardId: 'board-wbchse' },
  { id: 'class-wbjee', code: 'WBJEE', name: 'WBJEE / NEET Foundation', nameBn: 'ডব্লিউবিজেইই / নিট ফাউন্ডেশন', boardId: 'board-wbchse' }
];

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'sub-phy',
    code: 'PHY',
    name: 'Physics / Physical Science',
    nameBn: 'পদার্থবিজ্ঞান / ভৌতবিজ্ঞান',
    icon: 'Atom',
    description: 'Mechanics, Optics, Current Electricity, Heat, Magnetism, Modern Physics',
    descriptionBn: 'গতিবিদ্যা, আলোকবিজ্ঞান, চলতড়িৎ, তাপ, চুম্বকত্ব ও আধুনিক পদার্থবিদ্যা',
    active: true
  },
  {
    id: 'sub-math',
    code: 'MATH',
    name: 'Mathematics',
    nameBn: 'গণিত',
    icon: 'Calculator',
    description: 'Algebra, Geometry, Trigonometry, Calculus & Coordinate Geometry',
    descriptionBn: 'বীজগণিত, জ্যামিতি, ত্রিকোণমিতি, কলনবিদ্যা ও স্থানাঙ্ক জ্যামিতি',
    active: true
  },
  {
    id: 'sub-chem',
    code: 'CHEM',
    name: 'Chemistry',
    nameBn: 'রসায়ন',
    icon: 'FlaskConical',
    description: 'Inorganic, Organic, Physical Chemistry & Laboratory Techniques',
    descriptionBn: 'অজৈব, জৈব, ভৌত রসায়ন ও রাসায়নিক গণনা',
    active: true
  },
  {
    id: 'sub-bio',
    code: 'BIO',
    name: 'Biology / Life Science',
    nameBn: 'জীববিজ্ঞান / জীবনবিজ্ঞান',
    icon: 'Dna',
    description: 'Cell Biology, Genetics, Physiology & Ecology',
    descriptionBn: 'কোষবিদ্যা, বংশগতি, শারীরবিদ্যা ও বাস্তুবিদ্যা',
    active: true
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'user-suman',
    name: 'Suman Acharya',
    email: 'suman.acharya.980967@outlook.com',
    phone: '8972263462',
    role: 'super_admin',
    city: 'Contai, Purba Medinipur',
    school: 'Physics Forward Headquarters',
    active: true,
    qualification: 'Lead Physics Educator & Founder',
    experience: '10+ Years',
    bio: 'Founder & Academic Director of PHYSICS FORWARD. Dedicated to simplifying competitive physics for students across West Bengal.',
    bioBn: 'ফিজিক্স ফরওয়ার্ডের প্রতিষ্ঠাতা ও অ্যাকাডেমিক ডিরেক্টর। দীর্ঘ ১০ বছরেরও বেশি সময় ধরে পদার্থবিজ্ঞানকে শিক্ষার্থীদের কাছে সহজ ও আনন্দময় করে তোলার ব্রতে নিবেদিত।',
    assignedSubjectNames: ['Physics', 'Competitive Physics', 'Mechanics'],
    assignedBatchNames: ['JEE Mains Masterclass', 'NEET Physics Achievers'],
    assignedCourseNames: ['JEE Mains Physics Masterclass 2026', 'NEET Physics Booster 2026'],
    permissions: ['all_access', 'content_manage', 'financial_reports', 'student_database', 'system_settings'],
    teachingSchedule: 'Monday, Wednesday, Friday: 6:00 PM - 8:30 PM',
    enrolledProgramIds: ['prog-jee-mains', 'prog-neet', 'prog-foundation', 'prog-class-9'],
    enrolledCourseIds: ['course-jee-mains', 'course-neet', 'course-foundation', 'course-class-9'],
    createdAt: '2025-01-01T00:00:00Z'
  },
  {
    id: 'user-teacher-subrata',
    name: 'Subrata Acharya, M.Sc. (Physics)',
    email: 'subrata.sir@physicsforward.in',
    phone: '8972263462',
    role: 'teacher',
    city: 'Contai',
    school: 'Contai High School (Ex-Senior Faculty)',
    active: true,
    qualification: 'M.Sc. in Physics, Gold Medalist, B.Ed.',
    experience: '25+ Years Experience in Higher Secondary & Board Physics',
    bio: 'Renowned physics faculty in Contai region with over two decades of mentorship in WBBSE, WBCHSE and entrance examinations.',
    bioBn: 'কাঁথি অঞ্চলের স্বনামধন্য পদার্থবিজ্ঞান শিক্ষক। ২৫ বছরেরও বেশি সময় ধরে হাজার হাজার শিক্ষার্থীকে মাধ্যমিক ও উচ্চমাধ্যমিকে শীর্ষস্থান অর্জনে সহায়তা করেছেন।',
    assignedSubjectNames: ['Physical Science', 'Higher Secondary Physics', 'Electrodynamics'],
    assignedBatchNames: ['Madhyamik 2026 Toppers Batch', 'Class 11 Science Core Batch'],
    assignedCourseNames: ['Class 10 Madhyamik Physical Science', 'Class 11 Physics Fundamentals'],
    permissions: ['course_manage', 'live_classes', 'grading', 'doubts_reply'],
    teachingSchedule: 'Tuesday, Thursday, Saturday: 5:00 PM - 7:30 PM',
    enrolledCourseIds: [],
    createdAt: '2025-01-10T00:00:00Z'
  },
  {
    id: 'user-student-rahul',
    name: 'Rahul Das',
    email: 'rahul.das@physicsforward.in',
    phone: '9876543210',
    role: 'student',
    boardId: 'board-wbbse',
    mediumId: 'med-bn',
    classId: 'class-10',
    school: 'Contai Model High School',
    city: 'Contai',
    dob: '2009-08-14',
    currentBatchId: 'batch-madhyamik-2026',
    currentBatchName: 'Madhyamik 2026 Physics Batch',
    enrolledProgramIds: ['prog-foundation', 'prog-class-9'],
    enrolledCourseIds: ['course-10-madhyamik', 'course-foundation'],
    active: true,
    attendanceRate: 94,
    examAttemptsCount: 12,
    lastActive: 'Today at 10:15 AM',
    createdAt: '2025-02-15T09:30:00Z'
  },
  {
    id: 'user-student-priya',
    name: 'Priya Mukherjee',
    email: 'priya.m@physicsforward.in',
    phone: '9832145678',
    role: 'student',
    boardId: 'board-wbchse',
    mediumId: 'med-bn',
    classId: 'class-11',
    school: 'Contai Prabhat Kumar Girls High School',
    city: 'Contai',
    dob: '2008-05-21',
    currentBatchId: 'batch-hs-11-core',
    currentBatchName: 'Class 11 HS Core Physics Batch',
    enrolledProgramIds: ['prog-jee-mains'],
    enrolledCourseIds: ['course-jee-mains'],
    active: true,
    attendanceRate: 88,
    examAttemptsCount: 9,
    lastActive: 'Yesterday at 8:40 PM',
    createdAt: '2025-02-10T14:20:00Z'
  },
  {
    id: 'user-student-sourav',
    name: 'Sourav Roy',
    email: 'sourav.roy@physicsforward.in',
    phone: '9434891234',
    role: 'student',
    boardId: 'board-wbchse',
    mediumId: 'med-bn',
    classId: 'class-12',
    school: 'Tamluk Hamilton High School',
    city: 'Tamluk',
    dob: '2007-11-03',
    currentBatchId: 'batch-hs-12-rank',
    currentBatchName: 'Class 12 Rank Booster Batch',
    enrolledProgramIds: ['prog-neet'],
    enrolledCourseIds: ['course-neet'],
    active: true,
    attendanceRate: 91,
    examAttemptsCount: 15,
    lastActive: 'Today at 7:30 AM',
    createdAt: '2025-01-20T11:00:00Z'
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-jee-mains',
    programId: 'prog-jee-mains',
    order: 6,
    status: 'published',
    archived: false,
    displayOnWebsite: true,
    displayOnApp: true,
    enrollmentOpen: true,
    assignedTeacherId: 'user-suman',
    title: 'JEE Mains Physics Masterclass 2026',
    titleBn: 'জেইই মেইনস পদার্থবিজ্ঞান মাস্টারক্লাস ২০২৬',
    description: 'Targeted JEE Main Physics preparation covering mechanics, electrodynamics, optics, modern physics with rigorous problem-solving and PYQ analysis.',
    descriptionBn: 'জেইই মেইন পরীক্ষার্থীদের জন্য সম্পূর্ণ পদার্থবিজ্ঞান সিলেবাস, কনসেপ্ট ক্লাস, অ্যাডভান্সড নিউমেরিক্যাল ট্রিকস, বিগত ১৫ বছরের পিওয়াইকিউ এবং পূর্ণাঙ্গ মক টেস্ট।',
    subjectId: 'sub-phy',
    boardId: 'board-wbbse',
    classId: 'class-12',
    mediumId: 'med-bn',
    price: 2499,
    originalPrice: 4999,
    isFree: false,
    banner: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=800&q=80',
    duration: '12 Months',
    totalLessons: 120,
    rating: 4.98,
    facultyName: 'Subrata Acharya, M.Sc.',
    facultyDesignation: 'Lead Faculty, Physics Forward',
    facultyImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    published: true,
    featured: true,
    featuresBn: [
      'জেইই মেইন পদার্থবিজ্ঞান সম্পূর্ণ সিলেবাস ও গভীর কনসেপ্ট লেকচার',
      'বিগত ১৫ বছরের পিওয়াইকিউ (PYQ) এবং শর্টকাট নিউমেরিক্যাল সমাধান',
      'সাপ্তাহিক লাইভ ইন্টারঅ্যাক্টিভ ক্লাস ও রেকর্ডেড ক্লাস লাইব্রেরি',
      'অধ্যায়ভিত্তিক অনলাইন মক টেস্ট, র‍্যাঙ্কিং ও পারফরম্যান্স অ্যানালিসিস',
      'হ্যান্ডরিটেন স্টাডি মেটেরিয়াল ও ফর্মুলা বুকলেট'
    ],
    syllabus: [
      {
        id: 'chap-jee-1',
        title: 'Kinematics & Newton Laws of Motion',
        titleBn: 'গতিবিদ্যা ও নিউটনের গতিসূত্র (JEE Mains)',
        order: 1,
        lessons: [
          { id: 'les-jee-1', title: 'Calculus in Kinematics & Projectile Motion', titleBn: 'ক্যালকুলাস প্রয়োগ ও প্রক্ষেপকের গতি', duration: '55 min', isFreePreview: true, hasNotes: true },
          { id: 'les-jee-2', title: 'Constraint Relations & Friction Dynamics', titleBn: 'লিঙ্কড বডি ও ঘর্ষণজনিত জটিল সমস্যা', duration: '60 min', isFreePreview: false, hasNotes: true }
        ]
      },
      {
        id: 'chap-jee-2',
        title: 'Work, Energy, Power & Rotational Dynamics',
        titleBn: 'কার্য-শক্তি-ক্ষমতা ও ঘূর্ণন গতিবিদ্যা',
        order: 2,
        lessons: [
          { id: 'les-jee-3', title: 'Conservation of Angular Momentum & Rolling', titleBn: 'কৌণিক ভরবেগ সংরক্ষণ ও ঘূর্ণন গতি', duration: '58 min', isFreePreview: false, hasNotes: true }
        ]
      },
      {
        id: 'chap-jee-3',
        title: 'Electrodynamics & DC Circuits',
        titleBn: 'ইলেকট্রোডাইনামিক্স ও ডিসি বর্তনী',
        order: 3,
        lessons: [
          { id: 'les-jee-4', title: "Kirchhoff's Laws & Symmetry Circuits", titleBn: 'কার্শফের সূত্র ও প্রতিসাম্য সার্কিট সমাধান', duration: '52 min', isFreePreview: true, hasNotes: true }
        ]
      },
      {
        id: 'chap-jee-4',
        title: 'Optics & Modern Physics',
        titleBn: 'আলোকবিজ্ঞান ও আধুনিক পদার্থবিজ্ঞান',
        order: 4,
        lessons: [
          { id: 'les-jee-5', title: 'Photoelectric Effect & Bohr Model', titleBn: 'আলোকতড়িৎ ক্রিয়া ও বোর মডেল', duration: '48 min', isFreePreview: false, hasNotes: true }
        ]
      }
    ]
  },
  {
    id: 'course-neet',
    programId: 'prog-neet',
    order: 5,
    status: 'published',
    archived: false,
    displayOnWebsite: true,
    displayOnApp: true,
    enrollmentOpen: true,
    assignedTeacherId: 'user-teacher-subrata',
    title: 'NEET Physics Rank Booster 2026',
    titleBn: 'নিট ফিজিক্স র‍্যাঙ্ক বুস্টার ব্যাচ ২০২৬',
    description: 'Specialized NCERT-aligned Physics mastery for NEET medical aspirants focusing on speed, formula application, error reduction, and PYQ drills.',
    descriptionBn: 'নিট মেডিকেল পরীক্ষার্থীদের জন্য বিশেষ ফিজিক্স ব্যাচ। এনসিইআরটি ভিত্তিক স্বচ্ছ ধারণা, দ্রুত নির্ভুল ক্যালকুলেশন, ফর্মুলা শিট ও বিগত ২০ বছরের নিট প্রশ্নের সমাধান।',
    subjectId: 'sub-phy',
    boardId: 'board-wbbse',
    classId: 'class-12',
    mediumId: 'med-bn',
    price: 2499,
    originalPrice: 4999,
    isFree: false,
    banner: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    duration: '12 Months',
    totalLessons: 115,
    rating: 4.96,
    facultyName: 'Subrata Acharya, M.Sc.',
    facultyDesignation: 'Lead Faculty, Physics Forward',
    facultyImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    published: true,
    featured: true,
    featuresBn: [
      'এনসিইআরটি ফিজিক্স লাইন-বাই-লাইন কনসেপ্ট ক্লিয়ারিং',
      'মেডিকেল এন্ট্রান্সের দ্রুত ক্যালকুলেশন ও শর্টকাট ফর্মুলা ড্রিল',
      'বিগত ২০ বছরের নিট পিওয়াইকিউ (PYQ) ব্যাখ্যা সহ সমাধান',
      'ফুল লেন্থ ও অধ্যায়ভিত্তিক নিট প্যাটার্ন টাইমড মক টেস্ট',
      'গ্রাফিক্যাল পারফরম্যান্স ট্র্যাকিং ও অ্যাকুরেসি অ্যানালিসিস'
    ],
    syllabus: [
      {
        id: 'chap-neet-1',
        title: 'Mechanics & Gravitation (NEET Focus)',
        titleBn: 'গতিবিদ্যা ও মহাকর্ষ (নিট বিশেষ)',
        order: 1,
        lessons: [
          { id: 'les-neet-1', title: 'Speed Techniques in Kinematics', titleBn: 'গতিবিদ্যার দ্রুত সমস্যা সমাধান টেকনিক', duration: '50 min', isFreePreview: true, hasNotes: true },
          { id: 'les-neet-2', title: 'Orbital Velocity and Escape Speed', titleBn: 'কক্ষীয় বেগ ও মুক্তিবেগ সংক্রান্ত প্রশ্ন', duration: '46 min', isFreePreview: false, hasNotes: true }
        ]
      },
      {
        id: 'chap-neet-2',
        title: 'Thermal Physics & Kinetic Theory',
        titleBn: 'তাপীয় পদার্থবিজ্ঞান ও গ্যাসের গতিতত্ত্ব',
        order: 2,
        lessons: [
          { id: 'les-neet-3', title: 'First & Second Law of Thermodynamics', titleBn: 'তাপগতিবিদ্যার প্রথম ও দ্বিতীয় সূত্র', duration: '52 min', isFreePreview: true, hasNotes: true }
        ]
      },
      {
        id: 'chap-neet-3',
        title: 'Ray Optics & Wave Optics',
        titleBn: 'জ্যামিতিক আলোকবিজ্ঞান ও তরঙ্গ আলোকবিজ্ঞান',
        order: 3,
        lessons: [
          { id: 'les-neet-4', title: 'Total Internal Reflection & Prisms', titleBn: 'পূর্ণ অভ্যন্তরীণ প্রতিফলন ও প্রিজম সূত্র', duration: '45 min', isFreePreview: false, hasNotes: true }
        ]
      }
    ]
  },
  {
    id: 'course-foundation',
    programId: 'prog-foundation',
    order: 7,
    status: 'published',
    archived: false,
    displayOnWebsite: true,
    displayOnApp: true,
    enrollmentOpen: true,
    assignedTeacherId: 'user-teacher-subrata',
    title: 'Physics Concept Foundation Program',
    titleBn: 'পদার্থবিজ্ঞান কনসেপ্ট ফাউন্ডেশন প্রোগ্রাম',
    description: 'Build a rock-solid foundation in Physics before advanced competitive preparation. Visual explanations, mathematical intuition, and core concepts.',
    descriptionBn: 'উন্নত প্রতিযোগিতামূলক ও বোর্ড পরীক্ষার পূর্বে পদার্থবিজ্ঞানের মৌলিক ভিত সুদৃঢ় করার বিশেষ পাঠক্রম। ভিজ্যুয়াল সিমুলেশন, গাণিতিক প্রয়োগ এবং সহজবোধ্য ব্যাখ্যা।',
    subjectId: 'sub-phy',
    boardId: 'board-wbbse',
    classId: 'class-11',
    mediumId: 'med-bn',
    price: 1799,
    originalPrice: 3499,
    isFree: false,
    banner: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=800&q=80',
    duration: '10 Months',
    totalLessons: 90,
    rating: 4.95,
    facultyName: 'Subrata Acharya, M.Sc.',
    facultyDesignation: 'Lead Faculty, Physics Forward',
    facultyImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    published: true,
    featured: true,
    featuresBn: [
      'পদার্থবিজ্ঞানের মৌলিক সূত্র ও ধারণার বাস্তব উদাহরণ সহ ব্যাখ্যা',
      'ভিজ্যুয়াল অ্যানিমেশন ও গাণিতিক চিন্তন বিকাশের ক্লাস',
      'রেকর্ডেড ও লাইভ ক্লাসের সমন্বিত পাঠদান প্রক্রিয়া',
      'অধ্যায়ভিত্তিক অনুশীলন প্রশ্নাবলী ও সমাধান সেশন',
      'ধারাবাহিক প্রগ্রেস রিপোর্ট ও ব্যক্তিগত মেন্টরিং'
    ],
    syllabus: [
      {
        id: 'chap-fnd-1',
        title: 'Core Concepts of Motion & Forces',
        titleBn: 'গতি ও বলের মৌলিক ধারণা',
        order: 1,
        lessons: [
          { id: 'les-fnd-1', title: 'Intuitive Understanding of Velocity & Acceleration', titleBn: 'বেগ ও ত্বরণের সহজ ভিজ্যুয়ালাইজেশন', duration: '45 min', isFreePreview: true, hasNotes: true },
          { id: 'les-fnd-2', title: 'Why Things Move: Demystifying Inertia & Force', titleBn: 'বস্তু কেন চলে: জাড্য ও বলের বাস্তব ধারণা', duration: '50 min', isFreePreview: false, hasNotes: true }
        ]
      },
      {
        id: 'chap-fnd-2',
        title: 'Energy, Work & Conservation Principles',
        titleBn: 'শক্তি, কার্য ও সংরক্ষণ সূত্রাবলী',
        order: 2,
        lessons: [
          { id: 'les-fnd-3', title: 'Energy Transformation in Daily Life', titleBn: 'দৈনন্দিন জীবনে শক্তির রূপান্তর', duration: '42 min', isFreePreview: true, hasNotes: true }
        ]
      },
      {
        id: 'chap-fnd-3',
        title: 'Electricity & Waves Visualization',
        titleBn: 'তড়িৎ ও তরঙ্গের সহজ পাঠ',
        order: 3,
        lessons: [
          { id: 'les-fnd-4', title: 'How Charges Move: Electric Current Fundamentals', titleBn: 'আধানের গতি ও তড়িৎ প্রবাহের বুনিয়াদ', duration: '48 min', isFreePreview: false, hasNotes: true }
        ]
      }
    ]
  },
  {
    id: 'course-class-9',
    programId: 'prog-class-9',
    order: 1,
    status: 'published',
    archived: false,
    displayOnWebsite: true,
    displayOnApp: true,
    enrollmentOpen: true,
    assignedTeacherId: 'user-teacher-subrata',
    title: 'Class 9 Physics Academic Excellence Batch',
    titleBn: 'নবম শ্রেণী পদার্থবিজ্ঞান সম্পূর্ণ অ্যাকাডেমিক ব্যাচ',
    description: 'Structured Class 9 Physics curriculum with clear concept lessons, homework assignments, problem-solving, and chapterwise tests.',
    descriptionBn: 'নবম শ্রেণীর শিক্ষার্থীদের জন্য সুবিন্যস্ত পদার্থবিজ্ঞান পাঠক্রম। পরিমাপ, বল ও গতি, কার্য-ক্ষমতা-শক্তি, শব্দ, পদার্থের গঠন ও ধর্ম, হোমওয়ার্ক অ্যাসাইনমেন্ট ও পরীক্ষা।',
    subjectId: 'sub-phy',
    boardId: 'board-wbbse',
    classId: 'class-9',
    mediumId: 'med-bn',
    price: 1299,
    originalPrice: 2499,
    isFree: false,
    banner: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80',
    duration: '10 Months',
    totalLessons: 75,
    rating: 4.92,
    facultyName: 'Subrata Acharya, M.Sc.',
    facultyDesignation: 'Lead Faculty, Physics Forward',
    facultyImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    published: true,
    featured: true,
    featuresBn: [
      'নবম শ্রেণীর সম্পূর্ণ পদার্থবিজ্ঞান সিলেবাসের প্রাঞ্জল পাঠ',
      'পরিমাপ, গতিসূত্র ও কার্যের গাণিতিক সমস্যা সমাধানের কৌশল',
      'নিয়মিত হোমওয়ার্ক অ্যাসাইনমেন্ট ও শিক্ষক কর্তৃক মূল্যায়ন',
      'অধ্যায়ভিত্তিক অনলাইন পরীক্ষা ও স্কুল ফাইনাল পরীক্ষার প্রস্তুতি',
      'সাপ্তাহিক লাইভ ডাউট ক্লিয়ারিং সেশন'
    ],
    syllabus: [
      {
        id: 'chap-c9-1',
        title: 'Measurement & Physical Quantities',
        titleBn: 'পরিমাপ ও ভৌতরাশি',
        order: 1,
        lessons: [
          { id: 'les-c9-1', title: 'Units, Dimensions & Measuring Tools', titleBn: 'পরিমাপের একক, মাত্রা ও সাধারণ তুলাযন্ত্র', duration: '40 min', isFreePreview: true, hasNotes: true }
        ]
      },
      {
        id: 'chap-c9-2',
        title: 'Force and Motion (নিউটনের গতিসূত্র)',
        titleBn: 'বল ও গতি (নিউটনের গতিসূত্র)',
        order: 2,
        lessons: [
          { id: 'les-c9-2', title: "Newton's 1st & 2nd Law Applications", titleBn: 'নিউটনের প্রথম ও দ্বিতীয় সূত্রের বাস্তব প্রয়োগ', duration: '46 min', isFreePreview: true, hasNotes: true },
          { id: 'les-c9-3', title: 'Action, Reaction & Momentum Conservation', titleBn: 'ক্রিয়া-প্রতিক্রিয়া ও রৈখিক ভরবেগ', duration: '48 min', isFreePreview: false, hasNotes: true }
        ]
      },
      {
        id: 'chap-c9-3',
        title: 'Work, Power, Energy & Sound',
        titleBn: 'কার্য, ক্ষমতা, শক্তি ও শব্দ',
        order: 3,
        lessons: [
          { id: 'les-c9-4', title: 'Work Done by Force & Kinetic Energy', titleBn: 'বল দ্বারা কৃতকার্য ও গতিশক্তি', duration: '44 min', isFreePreview: false, hasNotes: true }
        ]
      }
    ]
  },
  {
    id: 'course-10-madhyamik',
    programId: 'prog-class-10',
    order: 2,
    status: 'published',
    archived: false,
    displayOnWebsite: true,
    displayOnApp: true,
    enrollmentOpen: true,
    assignedTeacherId: 'user-teacher-subrata',
    title: 'Madhyamik Physical Science Complete Batch 2026',
    titleBn: 'মাধ্যমিক ভৌতবিজ্ঞান সম্পূর্ণ ব্যাচ ২০২৬',
    description: 'Complete Bengali-medium Physical Science mastery for WBBSE Madhyamik aspirants with concept videos, live doubt clearing, and chapterwise numericals.',
    descriptionBn: 'পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদের দশম শ্রেণীর ভৌতবিজ্ঞান বিষয়ের পুঙ্খানুপুঙ্খ ধারণা, গাণিতিক সমাধান, সাপ্তাহিক লাইভ ক্লাস এবং বিগত বছরের প্রশ্ন সমাধান।',
    subjectId: 'sub-phy',
    boardId: 'board-wbbse',
    classId: 'class-10',
    mediumId: 'med-bn',
    price: 1499,
    originalPrice: 2999,
    isFree: false,
    banner: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=800&q=80',
    duration: '10 Months',
    totalLessons: 85,
    rating: 4.9,
    facultyName: 'Subrata Acharya, M.Sc.',
    facultyDesignation: 'Senior Physics Educator (15+ yrs exp)',
    facultyImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    published: true,
    featured: true,
    featuresBn: [
      'প্রতিটি অধ্যায়ের পুঙ্খানুপুঙ্খ বাংলা নোট ও কনসেপ্ট লেকচার',
      'চলতড়িৎ ও আলোর জটিল গাণিতিক সমস্যার সহজ শর্টকাট কৌশল',
      'সাপ্তাহিক লাইভ ইন্টারঅ্যাক্টিভ ডাউট ক্লিয়ারিং ক্লাস',
      'অধ্যায়ভিত্তিক মক টেস্ট ও স্বয়ংক্রিয় র‍্যাঙ্কিং সিস্টেম'
    ],
    syllabus: [
      {
        id: 'chap-1',
        title: 'Environmental Concerns',
        titleBn: 'পরিবেশের জন্য ভাবনা',
        order: 1,
        lessons: [
          { id: 'les-1-1', title: 'Atmospheric Layers & Ozone', titleBn: 'বায়ুমণ্ডলের গঠন ও ওজোন স্তর', duration: '28 min', isFreePreview: true, hasNotes: true },
          { id: 'les-1-2', title: 'Greenhouse Effect & Renewable Energy', titleBn: 'গ্রিনহাউস প্রভাব ও অচিরাচরিত শক্তি', duration: '32 min', isFreePreview: false, hasNotes: true }
        ]
      },
      {
        id: 'chap-2',
        title: 'Behavior of Gases',
        titleBn: 'গ্যাসের আচরণ',
        order: 2,
        lessons: [
          { id: 'les-2-1', title: "Boyle's Law and Charles's Law", titleBn: 'বয়েলের সূত্র ও চার্লসের সূত্র', duration: '44 min', isFreePreview: true, hasNotes: true },
          { id: 'les-2-2', title: 'Ideal Gas Equation (PV = nRT)', titleBn: 'আদর্শ গ্যাস সমীকরণ ও গাণিতিক উদাহরণ', duration: '50 min', isFreePreview: false, hasNotes: true }
        ]
      },
      {
        id: 'chap-3',
        title: 'Light (Optics)',
        titleBn: 'আলো (আলোকবিজ্ঞান)',
        order: 3,
        lessons: [
          { id: 'les-3-1', title: 'Reflection on Spherical Mirrors', titleBn: 'গোলীয় দর্পণে আলোর প্রতিফলন', duration: '48 min', isFreePreview: false, hasNotes: true },
          { id: 'les-3-2', title: 'Refraction & Lens Equation', titleBn: 'আলোর প্রতিসরণ ও লেন্সের সমীকরণ', duration: '55 min', isFreePreview: false, hasNotes: true }
        ]
      },
      {
        id: 'chap-4',
        title: 'Current Electricity',
        titleBn: 'চলতড়িৎ',
        order: 4,
        lessons: [
          { id: 'les-4-1', title: "Ohm's Law & Resistance", titleBn: "ওহমের সূত্র ও রোধের ধারণা", duration: '46 min', isFreePreview: false, hasNotes: true },
          { id: 'les-4-2', title: "Joule's Law of Heating & Electric Power", titleBn: 'জুলের সূত্র ও বৈদ্যুতিক ক্ষমতা', duration: '52 min', isFreePreview: false, hasNotes: true }
        ]
      }
    ]
  },
  {
    id: 'course-11-core',
    programId: 'prog-class-11',
    order: 3,
    status: 'published',
    archived: false,
    displayOnWebsite: true,
    displayOnApp: true,
    enrollmentOpen: true,
    assignedTeacherId: 'user-teacher-subrata',
    title: 'Class 11 Physics Foundation Batch 2026',
    titleBn: 'একাদশ শ্রেণী পদার্থবিদ্যা ফাউন্ডেশন ব্যাচ ২০২৬',
    description: 'Comprehensive WBCHSE Class 11 Physics targeting Board exams and WBJEE/NEET foundation with rigorous conceptual clarity in Bengali.',
    descriptionBn: 'উচ্চমাধ্যমিক একাদশ শ্রেণীর সম্পূর্ণ পদার্থবিদ্যা সিলেবাস—গতিবিদ্যা, নিউটনের সূত্র, কার্য-শক্তি, তাপগতিবিদ্যা এবং তরঙ্গ।',
    subjectId: 'sub-phy',
    boardId: 'board-wbchse',
    classId: 'class-11',
    mediumId: 'med-bn',
    price: 1999,
    originalPrice: 3999,
    isFree: false,
    banner: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=800&q=80',
    duration: '12 Months',
    totalLessons: 110,
    rating: 4.95,
    facultyName: 'Subrata Acharya, M.Sc.',
    facultyDesignation: 'Lead Faculty, Physics Forward',
    facultyImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    published: true,
    featured: true,
    featuresBn: [
      'উচ্চমাধ্যমিক সিলেবাস এবং WBJEE ফাউন্ডেশনের যৌথ প্রস্তুতি',
      'ভেক্টর ও ক্যালকুলাস ভিত্তিক গাণিতিক বিশ্লেষণ',
      'অধ্যায় শেষে অ্যাসাইনমেন্ট মূল্যায়ন ও ব্যক্তিগত ফিডব্যাক',
      'এইচ.এস ও জয়েন্ট এন্ট্রান্সের বিগত ১০ বছরের প্রশ্নোত্তর'
    ],
    syllabus: [
      {
        id: 'chap-11-1',
        title: 'Kinematics & Vectors',
        titleBn: 'একমাত্রিক গতি ও ভেক্টর বিশ্লেষণ',
        order: 1,
        lessons: [
          { id: 'les-11-1', title: 'Vector Algebra & Resolution', titleBn: 'ভেক্টর বীজগণিত ও উপাংশ বিভাজন', duration: '50 min', isFreePreview: true, hasNotes: true },
          { id: 'les-11-2', title: 'Equations of Motion with Calculus', titleBn: 'কলনবিদ্যার সাহায্যে গতির সমীকরণ প্রতিষ্ঠা', duration: '56 min', isFreePreview: false, hasNotes: true }
        ]
      }
    ]
  },
  {
    id: 'course-12-rankers',
    programId: 'prog-class-12',
    order: 4,
    status: 'published',
    archived: false,
    displayOnWebsite: true,
    displayOnApp: true,
    enrollmentOpen: true,
    assignedTeacherId: 'user-teacher-subrata',
    title: 'Class 12 Higher Secondary Physics Rankers Batch',
    titleBn: 'দ্বাদশ উচ্চমাধ্যমিক পদার্থবিজ্ঞান র‍্যাঙ্কার্স ব্যাচ ২০২৬',
    description: 'Electrostats, Magnetism, AC Circuits, Optics, and Modern Physics for West Bengal Council Class 12 Boards with high-scoring techniques.',
    descriptionBn: 'স্থিরতড়িৎ, চুম্বকত্ব, পরিবর্তী প্রবাহ, আলোকবিজ্ঞান এবং আধুনিক পদার্থবিদ্যার গভীর বিশ্লেষণ সহ দ্বাদশের সর্বোচ্চ নম্বর নিশ্চিত করার বিশেষ ব্যাচ।',
    subjectId: 'sub-phy',
    boardId: 'board-wbchse',
    classId: 'class-12',
    mediumId: 'med-bn',
    price: 2199,
    originalPrice: 4499,
    isFree: false,
    banner: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80',
    duration: '11 Months',
    totalLessons: 125,
    rating: 4.98,
    facultyName: 'Subrata Acharya, M.Sc.',
    facultyDesignation: 'Lead Faculty, Physics Forward',
    facultyImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    published: true,
    featured: true,
    featuresBn: [
      'কাউন্সিল অনুমোদিত প্রশ্নকাঠামো ও ৫ নম্বরের বর্ণনামূলক উত্তরের কাঠামো',
      'সার্কিট সমাধান ও আলোকবিজ্ঞানের বিশেষ সিমুলেশন লেকচার',
      'প্র্যাকটিক্যাল ও ভাইভা প্রস্তুতির বিশেষ গাইডেন্স'
    ],
    syllabus: [
      {
        id: 'chap-12-1',
        title: 'Electrostatics & Coulomb Law',
        titleBn: 'স্থিরতড়িৎ ও কুলম্বের সূত্র',
        order: 1,
        lessons: [
          { id: 'les-12-1', title: 'Electric Field and Potential', titleBn: 'তড়িৎ ক্ষেত্র ও তড়িৎ বিভব', duration: '54 min', isFreePreview: true, hasNotes: true }
        ]
      }
    ]
  }
];

export const INITIAL_BATCHES: Batch[] = [
  {
    id: 'batch-jee-2026',
    programId: 'prog-jee-mains',
    name: 'JEE Mains Physics Apex Batch 2026',
    nameBn: 'জেইই মেইনস ফিজিক্স অ্যাপেক্স ব্যাচ ২০২৬',
    courseId: 'course-jee-mains',
    teacherId: 'user-teacher-subrata',
    teacherName: 'Subrata Acharya, M.Sc.',
    startDate: '2025-04-01',
    endDate: '2026-03-31',
    schedule: 'Mon, Wed, Fri (7:00 PM - 8:30 PM)',
    scheduleBn: 'সোম, বুধ ও শুক্র (সন্ধ্যা ৭:০০ - ৮:৩০)',
    capacity: 120,
    enrolledCount: 88,
    status: 'ongoing'
  },
  {
    id: 'batch-neet-2026',
    programId: 'prog-neet',
    name: 'NEET Physics Caduceus Batch 2026',
    nameBn: 'নিট ফিজিক্স ক্যাডুসিয়াস ব্যাচ ২০২৬',
    courseId: 'course-neet',
    teacherId: 'user-teacher-subrata',
    teacherName: 'Subrata Acharya, M.Sc.',
    startDate: '2025-04-15',
    endDate: '2026-04-30',
    schedule: 'Tue, Thu, Sat (7:30 PM - 9:00 PM)',
    scheduleBn: 'মঙ্গল, বৃহস্পতি ও শনি (সন্ধ্যা ৭:৩০ - ৯:০০)',
    capacity: 150,
    enrolledCount: 104,
    status: 'ongoing'
  },
  {
    id: 'batch-foundation-2026',
    programId: 'prog-foundation',
    name: 'Physics Concept Foundation Batch 2026',
    nameBn: 'ফিজিক্স কনসেপ্ট ফাউন্ডেশন ব্যাচ ২০২৬',
    courseId: 'course-foundation',
    teacherId: 'user-teacher-subrata',
    teacherName: 'Subrata Acharya, M.Sc.',
    startDate: '2025-05-01',
    endDate: '2026-03-15',
    schedule: 'Wed, Sat (5:30 PM - 7:00 PM)',
    scheduleBn: 'বুধ ও শনি (বিকেল ৫:৩০ - ৭:০০)',
    capacity: 100,
    enrolledCount: 72,
    status: 'ongoing'
  },
  {
    id: 'batch-class9-2026',
    programId: 'prog-class-9',
    name: 'Class 9 Physics Pioneer Batch 2026',
    nameBn: 'নবম শ্রেণী পদার্থবিজ্ঞান পাইওনিয়ার ব্যাচ ২০২৬',
    courseId: 'course-class-9',
    teacherId: 'user-teacher-subrata',
    teacherName: 'Subrata Acharya, M.Sc.',
    startDate: '2025-04-10',
    endDate: '2026-02-28',
    schedule: 'Sun, Tue (6:00 PM - 7:30 PM)',
    scheduleBn: 'রবি ও মঙ্গলবার (সন্ধ্যা ৬:০০ - ৭:৩০)',
    capacity: 100,
    enrolledCount: 65,
    status: 'ongoing'
  },
  {
    id: 'batch-madhyamik-2026',
    programId: 'prog-class-10',
    name: 'Class 10 Madhyamik Physics Spark 2026',
    nameBn: 'দশম শ্রেণী স্পেশাল পদার্থ ব্যাচ - পরমাণু ২০২৬',
    courseId: 'course-10-madhyamik',
    teacherId: 'user-teacher-subrata',
    teacherName: 'Subrata Acharya, M.Sc.',
    startDate: '2025-04-01',
    endDate: '2026-02-28',
    schedule: 'Mon, Wed, Fri (7:00 PM - 8:30 PM)',
    scheduleBn: 'সোম, বুধ ও শুক্র (সন্ধ্যা ৭:০০ - ৮:৩০)',
    capacity: 150,
    enrolledCount: 118,
    status: 'ongoing'
  },
  {
    id: 'batch-hs-11-core',
    programId: 'prog-class-11',
    name: 'Class 11 WBCHSE Physics Newton Batch',
    nameBn: 'একাদশ ফিজিক্স ফাউন্ডেশন ব্যাচ - নিউটন ২০২৬',
    courseId: 'course-11-core',
    teacherId: 'user-teacher-subrata',
    teacherName: 'Subrata Acharya, M.Sc.',
    startDate: '2025-05-15',
    endDate: '2026-03-31',
    schedule: 'Tue, Thu, Sat (6:30 PM - 8:00 PM)',
    scheduleBn: 'মঙ্গল, বৃহস্পতি ও শনি (সন্ধ্যা ৬:৩০ - ৮:০০)',
    capacity: 120,
    enrolledCount: 94,
    status: 'ongoing'
  },
  {
    id: 'batch-hs-12-rankers',
    programId: 'prog-class-12',
    name: 'Class 12 HS Rankers Einstein Batch',
    nameBn: 'দ্বাদশ বোর্ড বুস্টার ব্যাচ - আইনস্টাইন ২০২৬',
    courseId: 'course-12-rankers',
    teacherId: 'user-teacher-subrata',
    teacherName: 'Subrata Acharya, M.Sc.',
    startDate: '2025-04-10',
    endDate: '2026-02-15',
    schedule: 'Wed, Sun (8:00 PM - 9:30 PM)',
    scheduleBn: 'বুধ ও রবিবার (রাত ৮:০০ - ৯:৩০)',
    capacity: 100,
    enrolledCount: 82,
    status: 'ongoing'
  }
];

export const INITIAL_LIVE_CLASSES: LiveClass[] = [
  {
    id: 'live-jee-1',
    programId: 'prog-jee-mains',
    batchId: 'batch-jee-2026',
    title: 'Kinematics: Advanced Projectile Motion on Inclined Planes',
    titleBn: 'গতিবিদ্যা: নততলের ওপর প্রক্ষেপকের গতি ও শর্টকাট সমাধান (JEE Mains)',
    teacherName: 'Subrata Acharya, M.Sc.',
    subject: 'Physics',
    chapter: 'Kinematics',
    chapterBn: 'গতিবিদ্যা',
    scheduledAt: new Date(Date.now() + 1000 * 60 * 45).toISOString(), // 45 mins from now
    durationMinutes: 90,
    meetUrl: 'https://meet.google.com/pfw-jee-live',
    status: 'upcoming'
  },
  {
    id: 'live-fnd-1',
    programId: 'prog-foundation',
    batchId: 'batch-foundation-2026',
    title: 'Intuitive Force & Inertia: Real-Life Concept Visualizations',
    titleBn: 'বল ও জাড্যের ধারণা: বাস্তব উদাহরণের মাধ্যমে কনসেপ্ট ভিজ্যুয়ালাইজেশন',
    teacherName: 'Subrata Acharya, M.Sc.',
    subject: 'Physics',
    chapter: 'Core Concepts of Motion',
    chapterBn: 'গতির মৌলিক ধারণা',
    scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 20).toISOString(), // Tomorrow
    durationMinutes: 75,
    meetUrl: 'https://meet.google.com/pfw-fnd-live',
    status: 'upcoming'
  },
  {
    id: 'live-neet-1',
    programId: 'prog-neet',
    batchId: 'batch-neet-2026',
    title: 'NEET Speed Drill: Ray Optics Formula Mastery & PYQ Drills',
    titleBn: 'নিট স্পিড ড্রিল: জ্যামিতিক আলোকবিজ্ঞান সূত্রের প্রয়োগ ও পিওয়াইকিউ সেশন',
    teacherName: 'Subrata Acharya, M.Sc.',
    subject: 'Physics',
    chapter: 'Ray Optics',
    chapterBn: 'জ্যামিতিক আলোকবিজ্ঞান',
    scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 26).toISOString(),
    durationMinutes: 90,
    meetUrl: 'https://meet.google.com/pfw-neet-live',
    status: 'upcoming'
  },
  {
    id: 'live-c9-1',
    programId: 'prog-class-9',
    batchId: 'batch-class9-2026',
    title: "Class 9 Newton's Laws: Numerical Problem-Solving Techniques",
    titleBn: 'নবম শ্রেণী: নিউটনের গতিসূত্রের প্রয়োগ ও গাণিতিক প্রশ্ন সমাধান',
    teacherName: 'Subrata Acharya, M.Sc.',
    subject: 'Physics',
    chapter: 'Force and Motion',
    chapterBn: 'বল ও গতি',
    scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
    durationMinutes: 75,
    meetUrl: 'https://meet.google.com/pfw-c9-live',
    status: 'upcoming'
  },
  {
    id: 'live-1',
    batchId: 'batch-madhyamik-2026',
    title: 'Current Electricity: Advanced Resistor Combination Problems',
    titleBn: 'চলতড়িৎ: রোধের সমবায় ও তুল্য রোধ সংক্রান্ত গাণিতিক সমস্যা',
    teacherName: 'Subrata Acharya, M.Sc.',
    subject: 'Physics (ভৌতবিজ্ঞান)',
    chapter: 'Current Electricity',
    chapterBn: 'চলতড়িৎ',
    scheduledAt: new Date(Date.now() + 1000 * 60 * 45).toISOString(), // 45 mins from now
    durationMinutes: 90,
    meetUrl: 'https://meet.google.com/pfw-live-class',
    status: 'upcoming'
  },
  {
    id: 'live-2',
    batchId: 'batch-hs-11-core',
    title: "Newton's Laws of Motion & Conservation of Linear Momentum",
    titleBn: 'নিউটনের গতিসূত্র ও রৈখিক ভরবেগের সংরক্ষণ সূত্র',
    teacherName: 'Subrata Acharya, M.Sc.',
    subject: 'Physics (পদার্থবিদ্যা)',
    chapter: 'Laws of Motion',
    chapterBn: 'গতিসূত্র',
    scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // Tomorrow
    durationMinutes: 90,
    meetUrl: 'https://meet.google.com/pfw-hs11-class',
    status: 'upcoming'
  },
  {
    id: 'live-3',
    batchId: 'batch-madhyamik-2026',
    title: 'Live Practice: Light Refraction through Prism and Glass Slab',
    titleBn: 'আলোর প্রতিসরণ: প্রিজম ও কাঁচের ফলকের মধ্য দিয়ে আলোর গতিপথ',
    teacherName: 'Subrata Acharya, M.Sc.',
    subject: 'Physics (ভৌতবিজ্ঞান)',
    chapter: 'Light',
    chapterBn: 'আলো',
    scheduledAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    durationMinutes: 75,
    meetUrl: 'https://meet.google.com/pfw-live-class',
    status: 'completed',
    recordingUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'
  }
];

export const INITIAL_RECORDED_CLASSES: RecordedClass[] = [
  {
    id: 'rec-1',
    batchId: 'batch-madhyamik-2026',
    courseId: 'course-10-madhyamik',
    title: "Ohm's Law & Verification of V = IR with Numericals",
    titleBn: "ওহমের সূত্র ও V = IR সমীকরণের গাণিতিক সমাধান",
    subject: 'Physical Science',
    chapter: 'Current Electricity',
    chapterBn: 'চলতড়িৎ',
    durationMinutes: 46,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    views: 420,
    notesAvailable: true,
    summaryBn: 'এই লেকচারে ওহমের সূত্রের বিবৃতি, রোধের সংজ্ঞা, রোধের ওপর প্রভাবকারী বিষয়সমূহ এবং লেখচিত্র বিশ্লেষণ করা হয়েছে।'
  },
  {
    id: 'rec-2',
    batchId: 'batch-madhyamik-2026',
    courseId: 'course-10-madhyamik',
    title: 'Gas Laws: Mathematical Problems on Boyle & Charles Law',
    titleBn: 'গ্যাসের আচরণ: বয়েল ও চার্লসের সূত্রের সমন্বিত গাণিতিক সমস্যা',
    subject: 'Physical Science',
    chapter: 'Behavior of Gases',
    chapterBn: 'গ্যাসের আচরণ',
    durationMinutes: 42,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
    views: 580,
    notesAvailable: true,
    summaryBn: 'P1V1/T1 = P2V2/T2 সূত্রের বিভিন্ন জটিল গাণিতিক উদাহরণ ও কেলভিন স্কেলের প্রয়োগ বিস্তারিতভাবে দেখানো হয়েছে।'
  },
  {
    id: 'rec-3',
    batchId: 'batch-hs-11-core',
    courseId: 'course-11-core',
    title: 'Kinematics: Graphical Analysis of Displacement-Time & Velocity-Time',
    titleBn: 'একমাত্রিক গতি: সরণ-সময় ও বেগ-সময় লেখচিত্র বিশ্লেষণ',
    subject: 'Physics',
    chapter: 'Kinematics',
    chapterBn: 'গতিবিদ্যা',
    durationMinutes: 52,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80',
    views: 310,
    notesAvailable: true,
    summaryBn: 'বেগ-সময় লেখচিত্রের ক্ষেত্রফল কীভাবে সরণ নির্দেশ করে এবং স্পর্শকের নতি কীভাবে ত্বরণ নির্দেশ করে তা সুস্পষ্ট করা হয়েছে।'
  }
];

export const INITIAL_STUDY_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat-1',
    title: 'Madhyamik Physical Science Master Formula Sheet 2026',
    titleBn: 'মাধ্যমিক ভৌতবিজ্ঞান সম্পূর্ণ ফর্মুলা শিট ২০২৬',
    category: 'formula_sheet',
    subject: 'Physical Science',
    classLevel: 'Class 10',
    chapter: 'All Chapters',
    chapterBn: 'সকল অধ্যায়',
    language: 'both',
    fileSize: '3.4 MB',
    downloadUrl: '#download-formula-sheet',
    downloadCount: 1420,
    createdAt: '2025-01-20',
    pages: 14
  },
  {
    id: 'mat-2',
    title: 'Current Electricity: 2 & 3 Marks Important Suggestion & Solutions',
    titleBn: 'চলতড়িৎ: গুরুত্বপূর্ণ ২ ও ৩ নম্বরের ব্যাখ্যা ও উত্তরপত্র',
    category: 'notes',
    subject: 'Physical Science',
    classLevel: 'Class 10',
    chapter: 'Current Electricity',
    chapterBn: 'চলতড়িৎ',
    language: 'bn',
    fileSize: '5.1 MB',
    downloadUrl: '#download-electricity-notes',
    downloadCount: 890,
    createdAt: '2025-02-05',
    pages: 22
  },
  {
    id: 'mat-3',
    title: 'WBBSE Madhyamik Last 5 Years Solved Papers (2020 - 2025)',
    titleBn: 'পশ্চিমবঙ্গ মধ্যশিক্ষা পর্ষদ বিগত ৫ বছরের ভৌতবিজ্ঞান সমাধান',
    category: 'pyq',
    subject: 'Physical Science',
    classLevel: 'Class 10',
    chapter: 'Previous Years Board Exam',
    chapterBn: 'বিগত বছরের প্রশ্নপত্র',
    language: 'bn',
    fileSize: '8.7 MB',
    downloadUrl: '#download-pyq',
    downloadCount: 2310,
    createdAt: '2025-02-12',
    pages: 48
  },
  {
    id: 'mat-4',
    title: 'Class 11 Vectors & Calculus in Kinematics Concise Notes',
    titleBn: 'একাদশ শ্রেণী: ভেক্টর ও একমাত্রিক গতির সংক্ষিপ্ত হ্যান্ডরিটেন নোট',
    category: 'revision',
    subject: 'Physics',
    classLevel: 'Class 11',
    chapter: 'Vectors & Kinematics',
    chapterBn: 'ভেক্টর ও একমাত্রিক গতি',
    language: 'both',
    fileSize: '4.2 MB',
    downloadUrl: '#download-hs11-notes',
    downloadCount: 760,
    createdAt: '2025-02-18',
    pages: 18
  }
];

export const INITIAL_EXAMS: Exam[] = [
  {
    id: 'exam-elec-weekly',
    title: 'Class 10 Physics: Current Electricity Chapter Test',
    titleBn: 'দশম শ্রেণী ভৌতবিজ্ঞান: চলতড়িৎ অধ্যায়ভিত্তিক মক টেস্ট',
    subject: 'Physical Science',
    classLevel: 'Class 10',
    board: 'WBBSE',
    durationMinutes: 25,
    totalMarks: 30,
    passMarks: 12,
    negativeMarking: 0.25,
    scheduledStart: '2025-01-01T00:00:00Z',
    scheduledEnd: '2026-12-31T23:59:59Z',
    status: 'active',
    instructionsBn: [
      'মোট প্রশ্নের সংখ্যা: ১০ টি। প্রতিটি প্রশ্নের মান পাশে নির্দেশ করা আছে।',
      'এমসিকিউ প্রশ্নের ভুল উত্তরের জন্য ০.২৫ নম্বর কাটা যাবে (Negative Marking)।',
      'পরীক্ষা চলাকালীন অন্য উইন্ডোতে যাওয়া নিষিদ্ধ। সময় শেষ হলে স্বয়ংক্রিয়ভাবে সাবমিট হবে।',
      'সাবমিট করার পূর্বে উত্তর পুনরায় পরীক্ষা করতে "Mark for Review" অপশন ব্যবহার করতে পারো।'
    ],
    instructionsEn: [
      'Total Questions: 10. Marks are shown for each question.',
      'Negative marking of 0.25 marks for each wrong MCQ option.',
      'Do not switch tabs during examination. Auto-submits when time ends.'
    ],
    questions: [
      {
        id: 'q-1',
        examId: 'exam-elec-weekly',
        questionText: 'Which physical quantity has the SI unit "Ohm-meter" (Ω·m)?',
        questionTextBn: 'কোন ভৌত রাশির এস.আই একক "ওহম-মিটার" (Ω·m)?',
        type: 'mcq',
        marks: 3,
        topic: 'Current Electricity',
        difficulty: 'easy',
        options: [
          { id: 'opt-1', text: 'Resistance', textBn: 'রোধ' },
          { id: 'opt-2', text: 'Resistivity (Specific Resistance)', textBn: 'রোধাঙ্ক (আপেক্ষিক রোধ)' },
          { id: 'opt-3', text: 'Conductance', textBn: 'পরিবাহিতা' },
          { id: 'opt-4', text: 'Electromotive Force', textBn: 'তড়িৎচ্চালক বল' }
        ],
        correctOptionId: 'opt-2',
        explanationBn: 'রোধ R = ρ(L/A), সুতরাং রোধাঙ্ক ρ = (R·A)/L। একক = (Ω·m²)/m = Ω·m।',
        explanationEn: 'R = ρ(L/A) => ρ = RA/L = Ω·m² / m = Ω·m.'
      },
      {
        id: 'q-2',
        examId: 'exam-elec-weekly',
        questionText: 'If two resistors of 6 Ω and 3 Ω are connected in parallel, what is their equivalent resistance in Ohms?',
        questionTextBn: '৬ ওহম এবং ৩ ওহম মানের দুটি রোধ সমান্তরাল সমবায়ে যুক্ত করলে তুল্য রোধ কত ওহম হবে?',
        type: 'numerical',
        marks: 3,
        topic: 'Current Electricity',
        difficulty: 'medium',
        numericalAnswer: 2,
        tolerance: 0.05,
        explanationBn: 'সমান্তরাল সমবায়ের সূত্রানুসারে: 1/R = 1/R1 + 1/R2 = 1/6 + 1/3 = 3/6 = 1/2। অতএব তুল্য রোধ R = 2 Ω।',
        explanationEn: '1/R = 1/6 + 1/3 = 3/6 = 1/2 => R = 2 Ω.'
      },
      {
        id: 'q-3',
        examId: 'exam-elec-weekly',
        questionText: 'In an electric heater, which alloy wire is used for the heating element?',
        questionTextBn: 'বৈদ্যুতিক হিটারে তাপ উৎপাদক কুণ্ডলী তৈরিতে কোন সংকর ধাতু ব্যবহার করা হয়?',
        type: 'mcq',
        marks: 3,
        topic: 'Current Electricity',
        difficulty: 'easy',
        options: [
          { id: 'opt-3a', text: 'Tungsten', textBn: 'টাংস্টেন' },
          { id: 'opt-3b', text: 'Nichrome (Ni + Cr + Fe)', textBn: 'নাইক্রোম (Ni + Cr + Fe)' },
          { id: 'opt-3c', text: 'Copper', textBn: 'তামা' },
          { id: 'opt-3d', text: 'Lead-Tin Alloy', textBn: 'সীসা-টিন ফিউজ তার' }
        ],
        correctOptionId: 'opt-3b',
        explanationBn: 'নাইক্রোম তারের উচ্চ রোধাঙ্ক ও অতি উচ্চ গলনাঙ্ক থাকে, এবং উত্তপ্ত অবস্থায় বাতাসের অক্সিজেনের সাথে বিক্রিয়া করে জারিত হয় না।',
        explanationEn: 'Nichrome wire has high resistivity and very high melting point, and does not easily oxidize.'
      },
      {
        id: 'q-4',
        examId: 'exam-elec-weekly',
        questionText: '1 Board of Trade Unit (B.O.T) is equal to how many Joules?',
        questionTextBn: '১ বি.ও.টি (B.O.T) বা ১ কিলোওয়াট-ঘণ্টা সমান কত জুল?',
        type: 'mcq',
        marks: 3,
        topic: 'Electric Energy & Power',
        difficulty: 'medium',
        options: [
          { id: 'opt-4a', text: '3.6 × 10⁶ Joules', textBn: '৩.৬ × ১০⁶ জুল' },
          { id: 'opt-4b', text: '3.6 × 10⁵ Joules', textBn: '৩.৬ × ১০⁵ জুল' },
          { id: 'opt-4c', text: '4.2 × 10³ Joules', textBn: '৪.২ × ১০³ জুল' },
          { id: 'opt-4d', text: '1000 Joules', textBn: '১০০০ জুল' }
        ],
        correctOptionId: 'opt-4a',
        explanationBn: '১ B.O.T = ১ kWh = ১০০০ ওয়াট × ৩৬০০ সেকেন্ড = ৩,৬০০,০০০ জুল = ৩.৬ × ১০⁶ জুল।',
        explanationEn: '1 kWh = 1000 W * 3600 s = 3.6 * 10^6 J.'
      },
      {
        id: 'q-5',
        examId: 'exam-elec-weekly',
        questionText: 'Electric current flows in a conductor due to the drift of protons. (True or False)',
        questionTextBn: 'ধাতব পরিবাহীতে তড়িৎ প্রবাহ প্রোটন কণার গতির কারণে ঘটে থাকে। (সত্য নাকি মিথ্যা?)',
        type: 'true_false',
        marks: 3,
        topic: 'Current Electricity Basics',
        difficulty: 'easy',
        trueFalseAnswer: false,
        explanationBn: 'মিথ্যা। ধাতব পরিবাহীতে মুক্ত ইলেকট্রন (Free Electrons) প্রবাহের ফলেই তড়িৎ প্রবাহিত হয়; ভারী প্রোটন কণাগুলি পরমাণুর নিউক্লিয়াসে আবদ্ধ থাকে।',
        explanationEn: 'False. Electric conduction in metals occurs via free valence electrons.'
      },
      {
        id: 'q-6',
        examId: 'exam-elec-weekly',
        questionText: 'According to Joules law of heating, the heat produced (H) in a conductor of resistance R with current I in time t is proportional to:',
        questionTextBn: 'জুলের সূত্রানুসারে পরিবাহীতে উৎপন্ন তাপ (H) প্রবাহমাত্রা (I)-র কোন ঘাতের সাথে সমানুপাতিক?',
        type: 'mcq',
        marks: 3,
        topic: "Joule's Law",
        difficulty: 'easy',
        options: [
          { id: 'opt-6a', text: 'Square of Current (I²)', textBn: 'প্রবাহমাত্রার বর্গ (I²)' },
          { id: 'opt-6b', text: 'Current directly (I)', textBn: 'প্রবাহমাত্রা (I)' },
          { id: 'opt-6c', text: 'Square root of Current (√I)', textBn: 'প্রবাহমাত্রার বর্গমূল (√I)' },
          { id: 'opt-6d', text: 'Inverse of Current (1/I)', textBn: 'প্রবাহমাত্রার ব্যস্তানুপাতিক (1/I)' }
        ],
        correctOptionId: 'opt-6a',
        explanationBn: 'জুলের সূত্র অনুযায়ী: H = I²Rt / J। অর্থাৎ প্রবাহমাত্রা I এর বর্গের সাথে সমানুপাতিক।',
        explanationEn: 'H = I^2 * R * t / J => H is proportional to I^2.'
      },
      {
        id: 'q-7',
        examId: 'exam-elec-weekly',
        questionText: 'What is the resistance in Ohms of a 220V, 100W light bulb?',
        questionTextBn: '২২০ ভোল্ট - ১০০ ওয়াট চিহ্নিত একটি বৈদ্যুতিক বাতির ফিলামেন্টের রোধ কত ওহম?',
        type: 'numerical',
        marks: 4,
        topic: 'Electric Power',
        difficulty: 'hard',
        numericalAnswer: 484,
        tolerance: 1,
        explanationBn: 'ক্ষমতা P = V² / R, অতএব রোধ R = V² / P = (২২০ × ২২০) / ১০০ = ৪৮,৪০০ / ১০০ = ৪৮৪ ওহম।',
        explanationEn: 'P = V^2 / R => R = V^2 / P = (220 * 220) / 100 = 484 Ohms.'
      },
      {
        id: 'q-8',
        examId: 'exam-elec-weekly',
        questionText: 'Which rule determines the direction of motion of a current-carrying conductor in a magnetic field?',
        questionTextBn: 'চৌম্বক ক্ষেত্রে তড়িৎবাহী পরিবাহীর ওপর বলের দিক নির্ণয় করতে কোন নিয়মটি ব্যবহৃত হয়?',
        type: 'mcq',
        marks: 3,
        topic: 'Electromagnetism',
        difficulty: 'medium',
        options: [
          { id: 'opt-8a', text: "Fleming's Left-Hand Rule", textBn: 'ফ্লেমিং-এর বামহস্ত নিয়ম' },
          { id: 'opt-8b', text: "Fleming's Right-Hand Rule", textBn: 'ফ্লেমিং-এর ডানহস্ত নিয়ম' },
          { id: 'opt-8c', text: "Lenz's Law", textBn: 'লেনজের সূত্র' },
          { id: 'opt-8d', text: "Ampere's Swimming Rule", textBn: 'অ্যাম্পিয়ারের সন্তরণ নিয়ম' }
        ],
        correctOptionId: 'opt-8a',
        explanationBn: 'বৈদ্যুতিক মোটরের নীতি এবং বলের দিক ফ্লেমিং-এর বামহস্ত নিয়ম (Fleming’s Left-Hand Rule) দ্বারা নির্ধারিত হয়।',
        explanationEn: "Fleming's Left Hand Rule gives the direction of magnetic force on a current-carrying wire."
      },
      {
        id: 'q-9',
        examId: 'exam-elec-weekly',
        questionText: 'The potential difference between the Live wire and Neutral wire in domestic household AC supply in India is approximately:',
        questionTextBn: 'ভারতে গৃহস্থালির বিদ্যুৎ সরবরাহে লাইভ তার ও নিউট্রাল তারের মধ্যকার বিভব প্রভেদ সাধারণত কত হয়?',
        type: 'mcq',
        marks: 2,
        topic: 'Domestic Electric Circuits',
        difficulty: 'easy',
        options: [
          { id: 'opt-9a', text: '220 V - 240 V, 50 Hz', textBn: '২২০ ভোল্ট - ২৪০ ভোল্ট, ৫০ হার্টজ' },
          { id: 'opt-9b', text: '110 V, 60 Hz', textBn: '১১০ ভোল্ট, ৬০ হার্টজ' },
          { id: 'opt-9c', text: '440 V, 50 Hz', textBn: '৪৪০ ভোল্ট, ৫০ হার্টজ' },
          { id: 'opt-9d', text: '12 V DC', textBn: '১২ ভোল্ট ডিসি' }
        ],
        correctOptionId: 'opt-9a',
        explanationBn: 'ভারতে গৃহস্থালির বর্তনীতে ২২০-২৪০ ভোল্ট পরিবর্তী বিভব ও ৫০ হার্টজ কম্পাঙ্কের সরবরাহ করা হয়।',
        explanationEn: 'Standard Indian domestic supply is 220-240V AC at 50 Hz.'
      },
      {
        id: 'q-10',
        examId: 'exam-elec-weekly',
        questionText: 'An ammeter is always connected in parallel in an electric circuit. (True or False)',
        questionTextBn: 'বর্তনীতে তড়িৎ প্রবাহমাত্রা মাপার জন্য অ্যামমিটারকে সর্বদা সমান্তরাল সমবায়ে যুক্ত করা হয়। (সত্য নাকি মিথ্যা?)',
        type: 'true_false',
        marks: 3,
        topic: 'Measuring Instruments',
        difficulty: 'easy',
        trueFalseAnswer: false,
        explanationBn: 'মিথ্যা। অ্যামমিটারের অভ্যন্তরীণ রোধ অত্যন্ত কম থাকে, তাই সম্পূর্ণ প্রবাহমাত্রাকে পরিমাপ করতে একে সর্বদা শ্রেণিসমবায়ে (Series) যুক্ত করতে হয়।',
        explanationEn: 'False. Ammeters have very low resistance and must be connected in Series.'
      }
    ]
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    batchId: 'batch-madhyamik-2026',
    title: 'Current Electricity: 5 Numerical Problems Solution Worksheet',
    titleBn: 'চলতড়িৎ: ৫টি গুরুত্বপূর্ণ গাণিতিক সমস্যার সমাধান অ্যাসাইনমেন্ট',
    description: 'Solve the provided 5 problems regarding equivalent resistance, electrical energy consumption (BOT unit) and filament power. Upload photos or PDF of your notebook.',
    descriptionBn: 'তুল্য রোধ ও বিওটি ইউনিট সংক্রান্ত প্রদত্ত ৫টি অঙ্ক খাতায় কষে পরিষ্কার ছবি বা পিডিএফ আপলোড করো।',
    subject: 'Physical Science',
    deadline: '2026-04-15T23:59:59Z',
    totalMarks: 20,
    status: 'open'
  },
  {
    id: 'asg-2',
    batchId: 'batch-hs-11-core',
    title: 'Vectors and Relative Velocity Problems',
    titleBn: 'ভেক্টর বিশ্লেষণ ও আপেক্ষিক বেগ সংক্রান্ত গাণিতিক সমস্যা',
    description: 'River-boat crossing time and shortest path calculations with proper vector diagrams.',
    descriptionBn: 'নদী-নৌকা পারাপারের ন্যূনতম সময় ও ন্যূনতম দূরত্বের অঙ্ক চিত্রসহ খাতায় সমাধান করো।',
    subject: 'Physics',
    deadline: '2026-04-20T23:59:59Z',
    totalMarks: 25,
    status: 'open'
  }
];

export const INITIAL_FORMULAS: PhysicsFormula[] = [
  {
    id: 'f-1',
    chapter: 'Current Electricity',
    chapterBn: 'চলতড়িৎ',
    title: "Ohm's Law",
    titleBn: 'ওহমের সূত্র',
    formula: 'V = I · R',
    description: 'Relates potential difference (V), electric current (I) and resistance (R) at constant temperature.',
    descriptionBn: 'স্থির তাপমাত্রায় কোনো পরিবাহীর দুই প্রান্তের বিভব প্রভেদ (V), প্রবাহমাত্রা (I) এবং রোধ (R) এর মধ্যকার সম্পর্ক।',
    variables: [
      { symbol: 'V', meaning: 'Potential Difference', meaningBn: 'বিভব প্রভেদ', unit: 'Volt (V)' },
      { symbol: 'I', meaning: 'Current', meaningBn: 'প্রবাহমাত্রা', unit: 'Ampere (A)' },
      { symbol: 'R', meaning: 'Resistance', meaningBn: 'রোধ', unit: 'Ohm (Ω)' }
    ]
  },
  {
    id: 'f-2',
    chapter: 'Current Electricity',
    chapterBn: 'চলতড়িৎ',
    title: 'Electric Power and Energy',
    titleBn: 'বৈদ্যুতিক ক্ষমতা ও শক্তি',
    formula: 'P = V · I = I² · R = V² / R',
    description: 'Electric power consumed in a circuit element.',
    descriptionBn: 'কোনো বৈদ্যুতিক যন্ত্রের প্রতি সেকেন্ডে শক্তি ব্যয়ের হার (ক্ষমতা)।',
    variables: [
      { symbol: 'P', meaning: 'Electric Power', meaningBn: 'বৈদ্যুতিক ক্ষমতা', unit: 'Watt (W)' },
      { symbol: 'V', meaning: 'Voltage', meaningBn: 'ভোল্টেজ', unit: 'Volt (V)' },
      { symbol: 'I', meaning: 'Current', meaningBn: 'প্রবাহমাত্রা', unit: 'Ampere (A)' }
    ]
  },
  {
    id: 'f-3',
    chapter: 'Behavior of Gases',
    chapterBn: 'গ্যাসের আচরণ',
    title: 'Ideal Gas Equation',
    titleBn: 'আদর্শ গ্যাস সমীকরণ',
    formula: 'P · V = n · R · T',
    description: 'Universal equation of state for an ideal gas.',
    descriptionBn: 'বয়েল, চার্লস ও অ্যাভোগাড্রো সূত্রের সমন্বিত রূপ।',
    variables: [
      { symbol: 'P', meaning: 'Gas Pressure', meaningBn: 'গ্যাসের চাপ', unit: 'Pascal (Pa) or atm' },
      { symbol: 'V', meaning: 'Volume', meaningBn: 'আয়তন', unit: 'm³ or Litre' },
      { symbol: 'n', meaning: 'Mole Count', meaningBn: 'মোল সংখ্যা', unit: 'mol' },
      { symbol: 'R', meaning: 'Universal Gas Constant (8.314 J/mol·K)', meaningBn: 'সার্বজনীন গ্যাস ধ্রুবক', unit: 'J/(mol·K)' },
      { symbol: 'T', meaning: 'Absolute Temperature', meaningBn: 'পরম তাপমাত্রা', unit: 'Kelvin (K)' }
    ]
  },
  {
    id: 'f-4',
    chapter: 'Optics',
    chapterBn: 'আলো',
    title: "Snell's Law of Refraction",
    titleBn: 'স্নেলের প্রতিসরণ সূত্র',
    formula: 'n₁ · sin(θ₁) = n₂ · sin(θ₂)',
    description: 'Describes the bending of light when transitioning between two optical media.',
    descriptionBn: 'দুটি মাধ্যমের সংযোগস্থলে আলোর প্রতিসরণের দিক ও প্রতিসরাঙ্কের সম্পর্ক।',
    variables: [
      { symbol: 'n₁, n₂', meaning: 'Refractive indices of media 1 and 2', meaningBn: 'প্রথম ও দ্বিতীয় মাধ্যমের প্রতিসরাঙ্ক', unit: 'Unitless' },
      { symbol: 'θ₁', meaning: 'Angle of Incidence', meaningBn: 'আপতন কোণ', unit: 'Degrees' },
      { symbol: 'θ₂', meaning: 'Angle of Refraction', meaningBn: 'প্রতিসরণ কোণ', unit: 'Degrees' }
    ]
  },
  {
    id: 'f-5',
    chapter: 'Optics',
    chapterBn: 'আলো',
    title: 'Lens Maker / Thin Lens Formula',
    titleBn: 'লেন্সের সূত্র',
    formula: '1/v - 1/u = 1/f',
    description: 'Relates object distance (u), image distance (v), and focal length (f).',
    descriptionBn: 'লেন্স থেকে বস্তুর দূরত্ব (u), প্রতিবিম্বের দূরত্ব (v) এবং ফোকাস দূরত্বের (f) মধ্যকার সম্পর্ক।',
    variables: [
      { symbol: 'u', meaning: 'Object distance (with sign convention)', meaningBn: 'বস্তুর দূরত্ব', unit: 'm or cm' },
      { symbol: 'v', meaning: 'Image distance', meaningBn: 'প্রতিবিম্বের দূরত্ব', unit: 'm or cm' },
      { symbol: 'f', meaning: 'Focal length', meaningBn: 'ফোকাস দূরত্ব', unit: 'm or cm' }
    ]
  },
  {
    id: 'f-6',
    chapter: 'Kinematics',
    chapterBn: 'গতিবিদ্যা',
    title: 'Equations of Uniformly Accelerated Motion',
    titleBn: 'সমত্বরণে একমাত্রিক গতির সমীকরণ',
    formula: 'v = u + a·t  &  s = u·t + ½·a·t²  &  v² = u² + 2·a·s',
    description: 'Fundamental kinematics for bodies under constant acceleration.',
    descriptionBn: 'প্রাথমিক বেগ (u), অন্তিম বেগ (v), ত্বরণ (a), সময় (t) ও অতিক্রান্ত দূরত্বের (s) সমীকরণসমূহ।',
    variables: [
      { symbol: 'u', meaning: 'Initial velocity', meaningBn: 'প্রাথমিক বেগ', unit: 'm/s' },
      { symbol: 'v', meaning: 'Final velocity', meaningBn: 'অন্তিম বেগ', unit: 'm/s' },
      { symbol: 'a', meaning: 'Acceleration', meaningBn: 'ত্বরণ', unit: 'm/s²' },
      { symbol: 's', meaning: 'Displacement', meaningBn: 'সরণ / দূরত্ব', unit: 'meter (m)' },
      { symbol: 't', meaning: 'Time', meaningBn: 'সময়', unit: 'second (s)' }
    ]
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'FORWARD50',
    discountPercent: 50,
    maxDiscount: 1000,
    validUntil: '2026-12-31',
    active: true,
    description: '50% off launch celebration coupon for all courses'
  },
  {
    code: 'BENGALIPHYSICS',
    discountPercent: 20,
    maxDiscount: 500,
    validUntil: '2026-12-31',
    active: true,
    description: '20% special concession for West Bengal Board students'
  }
];

export const INITIAL_ORDERS: PaymentOrder[] = [
  {
    id: 'ord-1001',
    studentId: 'user-student-rahul',
    studentName: 'Rahul Das',
    studentEmail: 'rahul.das@physicsforward.in',
    studentPhone: '9876543210',
    courseId: 'course-10-madhyamik',
    courseTitle: 'Madhyamik Physical Science Complete Batch 2026',
    amount: 999,
    originalAmount: 1499,
    couponCode: 'BENGALIPHYSICS',
    discountAmount: 500,
    status: 'completed',
    transactionId: 'TXN-PF-2025-8941',
    paymentMethod: 'UPI / NetBanking',
    createdAt: '2025-02-15T09:45:00Z',
    invoiceNumber: 'INV-PF-001001'
  }
];

export const INITIAL_ENQUIRIES: ContactEnquiry[] = [
  {
    id: 'enq-1',
    name: 'Anirban Bhowmik (Parent)',
    email: 'anirban.bhowmik@gmail.com',
    phone: '9434123456',
    subject: 'Class 10 Madhyamik Batch Timings & Study Material Delivery',
    message: 'We are from Tamluk. We want to know if study material printed booklets will be couriered to our home address.',
    status: 'contacted',
    createdAt: '2025-02-14T11:20:00Z'
  },
  {
    id: 'enq-2',
    name: 'Soumyadeep Paul (Student)',
    email: 'soumyadeep.p@outlook.com',
    phone: '8910123456',
    subject: 'WBJEE Physics special problem solving sessions',
    message: 'I am in Class 11 WBCHSE. Do you have specialized higher-level numerical batches for WBJEE Engineering aspirants?',
    status: 'new',
    createdAt: '2025-02-15T16:40:00Z'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Live Class Reminder',
    titleBn: 'লাইভ ক্লাসের বিজ্ঞপ্তি',
    message: 'Tonight 7:00 PM: Current Electricity Resistor Numericals live class starts with Subrata Sir.',
    messageBn: 'আজ সন্ধ্যা ৭:০০ টায় সুব্রত স্যারের সাথে চলতড়িৎ অধ্যায়ের গুরুত্বপূর্ণ লাইভ ক্লাস শুরু হবে।',
    type: 'live',
    target: 'batch',
    targetId: 'batch-madhyamik-2026',
    createdAt: '2025-02-15T14:00:00Z',
    read: false
  },
  {
    id: 'notif-2',
    title: 'New Study Material Published',
    titleBn: 'নতুন স্টাডি মেটেরিয়াল যুক্ত হয়েছে',
    message: 'Madhyamik 2026 Complete Formula Sheet PDF is now available in Study Materials.',
    messageBn: 'মাধ্যমিক ২০২৬ এর জন্য সম্পূর্ণ ফর্মুলা শিট পিডিএফ সেকশনে আপলোড করা হয়েছে।',
    type: 'material',
    target: 'all',
    createdAt: '2025-02-15T10:00:00Z',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Weekly Test is Live',
    titleBn: 'সাপ্তাহিক মক টেস্ট লাইভ হয়েছে',
    message: 'Current Electricity 30-mark test is now available. Complete before Sunday midnight.',
    messageBn: 'চলতড়িৎ ৩০ নম্বরের সাপ্তাহিক পরীক্ষা সক্রিয় হয়েছে। রবিবার মধ্যরাতের পূর্বে সম্পন্ন করো।',
    type: 'exam',
    target: 'batch',
    targetId: 'batch-madhyamik-2026',
    createdAt: '2025-02-14T18:00:00Z',
    read: true
  }
];

export const INITIAL_ANNOUNCEMENTS: AppNotification[] = INITIAL_NOTIFICATIONS;


export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    userId: 'user-suman',
    userName: 'Suman Acharya',
    userRole: 'super_admin',
    action: 'SYSTEM_SETTINGS_UPDATE',
    entity: 'AppSettings',
    details: 'Verified brand phone 8972263462 and Contai address configuration',
    ipAddress: '103.24.12.1',
    timestamp: '2025-02-15T08:00:00Z'
  },
  {
    id: 'log-2',
    userId: 'user-suman',
    userName: 'Suman Acharya',
    userRole: 'super_admin',
    action: 'BOARD_CONFIGURATION',
    entity: 'Board',
    details: 'Configured WBBSE and WBCHSE boards as active with CBSE expansion support',
    ipAddress: '103.24.12.1',
    timestamp: '2025-02-15T08:15:00Z'
  },
  {
    id: 'log-3',
    userId: 'user-teacher-subrata',
    userName: 'Subrata Acharya',
    userRole: 'teacher',
    action: 'LIVE_CLASS_SCHEDULED',
    entity: 'LiveClass',
    details: 'Scheduled Current Electricity Advanced Numericals for Batch 2026',
    ipAddress: '103.24.12.44',
    timestamp: '2025-02-15T09:00:00Z'
  }
];

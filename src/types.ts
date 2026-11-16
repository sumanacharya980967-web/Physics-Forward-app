export type UserRole = 'student' | 'teacher' | 'admin' | 'super_admin' | 'finance_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  boardId?: string;
  mediumId?: string;
  classId?: string;
  school?: string;
  city?: string;
  dob?: string;
  avatar?: string;
  currentBatchId?: string;
  currentBatchName?: string;
  enrolledCourseIds: string[];
  enrolledProgramIds?: string[];
  active: boolean;
  createdAt: string;
  // Teacher / Faculty specific fields
  qualification?: string;
  experience?: string;
  bio?: string;
  bioBn?: string;
  assignedSubjectNames?: string[];
  assignedBatchNames?: string[];
  assignedCourseNames?: string[];
  permissions?: string[];
  teachingSchedule?: string;
  // Student metrics
  attendanceRate?: number;
  examAttemptsCount?: number;
  lastActive?: string;
}

export interface Program {
  id: string;
  code: string; // 'class-9', 'class-10', 'class-11', 'class-12', 'neet', 'jee-mains', 'foundation'
  name: string;
  nameBn: string;
  tagline: string;
  taglineBn: string;
  description: string;
  descriptionBn: string;
  subject: string;
  category: 'competitive' | 'foundation' | 'school' | 'other';
  active: boolean; // Only active programs are visible on student-facing UI
  archived?: boolean;
  order: number;
  badge?: string;
  badgeBn?: string;
  accentColor?: string;
  icon?: string;
  imageUrl?: string;
  bannerUrl?: string;
  thumbnailUrl?: string;
  duration?: string;
  basePrice?: number;
  flowPath: string; // e.g. "Program → Medium → Class/Level → Subject → Course → Chapter → Topic → Lesson → Assessment"
  eligibility?: string;
  eligibilityBn?: string;
  displayOnWebsite?: boolean;
  displayOnApp?: boolean;
  features: string[];
  featuresBn: string[];
  includedItems: string[];
  includedItemsBn: string[];
}

export interface Board {
  id: string;
  code: string;
  name: string;
  nameBn: string;
  active: boolean;
  description: string;
}

export interface Medium {
  id: string;
  code: string;
  name: string;
  nameBn: string;
}

export interface ClassLevel {
  id: string;
  code: string;
  name: string;
  nameBn: string;
  boardId: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  nameBn: string;
  icon: string;
  description: string;
  descriptionBn: string;
  active: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  titleBn: string;
  duration: string;
  videoUrl?: string;
  isFreePreview?: boolean;
  hasNotes?: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  titleBn: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  programId?: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  subjectId: string;
  subject?: string;
  boardId: string;
  classId: string;
  mediumId: string;
  price: number;
  originalPrice: number;
  discountPrice?: number;
  isFree?: boolean;
  banner?: string;
  duration: string;
  totalLessons?: number;
  totalHours?: number;
  rating?: number;
  facultyName?: string;
  facultyDesignation?: string;
  facultyImage?: string;
  published: boolean;
  featured?: boolean;
  archived?: boolean;
  order?: number;
  displayOnWebsite?: boolean;
  displayOnApp?: boolean;
  status?: 'draft' | 'published' | 'archived';
  enrollmentOpen?: boolean;
  assignedTeacherId?: string;
  thumbnail?: string;
  syllabus: Chapter[];
  featuresBn?: string[];
}

export interface Batch {
  id: string;
  programId?: string;
  boardId?: string;
  classId?: string;
  mediumId?: string;
  name: string;
  nameBn: string;
  courseId: string;
  teacherId?: string;
  teacherName: string;
  startDate: string;
  endDate: string;
  schedule: string;
  scheduleBn: string;
  capacity: number;
  enrolledCount: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  meetUrl?: string;
}

export interface LiveClass {
  id: string;
  programId?: string;
  batchId: string;
  title: string;
  titleBn: string;
  teacherName: string;
  subject: string;
  chapter: string;
  chapterBn: string;
  scheduledAt: string;
  durationMinutes: number;
  meetUrl: string;
  status: 'upcoming' | 'live' | 'completed';
  recordingUrl?: string;
}

export interface RecordedClass {
  id: string;
  programId?: string;
  batchId?: string;
  courseId?: string;
  title: string;
  titleBn: string;
  subject: string;
  chapter: string;
  chapterBn: string;
  durationMinutes: number;
  videoUrl: string;
  thumbnail: string;
  views: number;
  notesAvailable: boolean;
  summaryBn: string;
}

export type MaterialCategory = 'notes' | 'formula_sheet' | 'pyq' | 'worksheet' | 'revision';

export interface StudyMaterial {
  id: string;
  programId?: string;
  title: string;
  titleBn: string;
  category: MaterialCategory;
  subject: string;
  classLevel: string;
  chapter: string;
  chapterBn: string;
  language: 'bn' | 'en' | 'both';
  fileSize: string;
  downloadUrl: string;
  downloadCount: number;
  createdAt: string;
  pages: number;
}

export interface QuestionOption {
  id: string;
  text: string;
  textBn: string;
}

export type QuestionType = 'mcq' | 'numerical' | 'true_false' | 'short_answer';

export interface Question {
  id: string;
  examId?: string;
  questionText: string;
  questionTextBn: string;
  type: QuestionType;
  options?: QuestionOption[];
  correctOptionId?: string;
  numericalAnswer?: number;
  tolerance?: number;
  trueFalseAnswer?: boolean;
  explanationBn: string;
  explanationEn: string;
  marks: number;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Exam {
  id: string;
  programId?: string;
  title: string;
  titleBn: string;
  subject: string;
  classLevel: string;
  board: string;
  durationMinutes: number;
  totalMarks: number;
  passMarks: number;
  negativeMarking: number; // e.g. 0.25 or 0
  scheduledStart: string;
  scheduledEnd: string;
  status: 'upcoming' | 'active' | 'completed';
  questions: Question[];
  instructionsBn: string[];
  instructionsEn: string[];
}

export interface ExamAttempt {
  id: string;
  examId: string;
  examTitle: string;
  studentId: string;
  studentName: string;
  startedAt: string;
  submittedAt: string;
  score: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
  correctCount: number;
  incorrectCount: number;
  unattemptedCount: number;
  answers: Record<string, string | number | boolean>;
  topicPerformance: { topic: string; score: number; total: number }[];
}

export interface Assignment {
  id: string;
  batchId: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  subject: string;
  deadline: string;
  totalMarks: number;
  status: 'open' | 'closed';
  attachmentUrl?: string;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  assignmentTitle: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  fileName: string;
  notes: string;
  marksAwarded?: number;
  feedback?: string;
  status: 'submitted' | 'graded';
}

export interface PaymentOrder {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: string;
  courseTitle: string;
  amount: number;
  originalAmount: number;
  couponCode?: string;
  discountAmount: number;
  status: 'completed' | 'pending' | 'failed';
  transactionId: string;
  paymentMethod: string;
  createdAt: string;
  invoiceNumber: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  maxDiscount: number;
  validUntil: string;
  active: boolean;
  description: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}

export interface AppNotification {
  id: string;
  title: string;
  titleBn: string;
  message: string;
  messageBn: string;
  type: 'live' | 'exam' | 'material' | 'announcement' | 'payment';
  target: 'all' | 'board' | 'class' | 'batch' | 'individual';
  targetId?: string;
  createdAt: string;
  read?: boolean;
}

export type Announcement = AppNotification;


export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  entity: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

export interface SocialChannel {
  id: 'youtube' | 'facebook' | 'instagram' | 'telegram' | 'whatsapp_channel' | 'whatsapp_group';
  platform: string;
  name: string;
  handle: string;
  url: string;
  buttonText: string;
  description: string;
  descriptionBn: string;
  enabled: boolean;
  accentColor: string;
}

export interface WebsiteCmsConfig {
  heroHeadline: string;
  heroHeadlineBn: string;
  heroSubheadline: string;
  heroSubheadlineBn: string;
  heroBadge: string;
  heroBadgeBn: string;
  heroBannerImage?: string;
  whyChooseUs?: { id: string; title: string; titleBn: string; desc: string; descBn: string; icon: string }[];
  testimonials?: { id: string; name: string; exam: string; score: string; text: string; textBn: string; avatar?: string }[];
  faqs?: { id: string; question: string; questionBn: string; answer: string; answerBn: string }[];
  seoTitle?: string;
  metaDescription?: string;
  ogImageUrl?: string;
}

export interface MobileCmsConfig {
  banners?: { id: string; title: string; titleBn: string; subtitle: string; imageUrl: string; linkUrl: string; active: boolean }[];
  announcementsTicker?: string;
  announcementsTickerBn?: string;
  sections?: { id: string; name: string; enabled: boolean; order: number }[];
  supportPhone?: string;
  supportWhatsapp?: string;
}

export interface AppSettings {
  brandName: string;
  brandLogo?: string;
  brandFavicon?: string;
  tagline: string;
  taglineBn: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  primaryColor: string;
  secondaryColor?: string;
  themeMode?: 'light' | 'dark' | 'system';
  appIconUrl?: string;
  splashScreenUrl?: string;
  footerBranding?: string;
  copyrightText?: string;
  copyrightTextBn?: string;
  allowRegistration: boolean;
  defaultLanguage: 'bn' | 'en';
  noticeBn: string;
  noticeEn: string;
  socialLinks: {
    youtube: string;
    facebook: string;
    instagram: string;
    telegram: string;
    whatsappChannel: string;
    whatsappGroup: string;
    whatsapp?: string;
  };
  socialChannels?: SocialChannel[];
  websiteCms?: WebsiteCmsConfig;
  mobileCms?: MobileCmsConfig;
}

export interface PhysicsFormula {
  id: string;
  chapter: string;
  chapterBn: string;
  title: string;
  titleBn: string;
  formula: string;
  description: string;
  descriptionBn: string;
  variables: { symbol: string; meaning: string; meaningBn: string; unit: string }[];
}

export interface StudentDoubt {
  id: string;
  studentId: string;
  studentName: string;
  studentPhone?: string;
  courseId?: string;
  courseTitle?: string;
  chapter: string;
  subject: string;
  questionText: string;
  imageUrl?: string;
  status: 'pending' | 'answered';
  teacherReply?: string;
  teacherName?: string;
  repliedAt?: string;
  createdAt: string;
}

export type AppPortalView = 'website' | 'student_dashboard' | 'mobile_app' | 'teacher_panel' | 'admin_panel' | 'physics_tools';


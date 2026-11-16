import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import {
  INITIAL_SETTINGS,
  INITIAL_BOARDS,
  INITIAL_MEDIUMS,
  INITIAL_CLASSES,
  INITIAL_SUBJECTS,
  INITIAL_USERS,
  INITIAL_COURSES,
  INITIAL_BATCHES,
  INITIAL_LIVE_CLASSES,
  INITIAL_RECORDED_CLASSES,
  INITIAL_STUDY_MATERIALS,
  INITIAL_EXAMS,
  INITIAL_ASSIGNMENTS,
  INITIAL_FORMULAS,
  INITIAL_COUPONS,
  INITIAL_ORDERS,
  INITIAL_ENQUIRIES,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_PROGRAMS
} from './src/data/mockData';
import {
  User,
  Program,
  Board,
  Subject,
  Course,
  Batch,
  LiveClass,
  RecordedClass,
  StudyMaterial,
  Exam,
  ExamAttempt,
  Assignment,
  AssignmentSubmission,
  PaymentOrder,
  ContactEnquiry,
  AppNotification,
  AuditLog,
  AppSettings,
  StudentDoubt
} from './src/types';

// In-memory application database state
let appSettings: AppSettings = { ...INITIAL_SETTINGS };
let programs: Program[] = [...INITIAL_PROGRAMS];
let users: User[] = [...INITIAL_USERS];
let boards: Board[] = [...INITIAL_BOARDS];
let mediums = [...INITIAL_MEDIUMS];
let classes = [...INITIAL_CLASSES];
let subjects: Subject[] = [...INITIAL_SUBJECTS];
let courses: Course[] = [...INITIAL_COURSES];
let batches: Batch[] = [...INITIAL_BATCHES];
let liveClasses: LiveClass[] = [...INITIAL_LIVE_CLASSES];
let recordedClasses: RecordedClass[] = [...INITIAL_RECORDED_CLASSES];
let studyMaterials: StudyMaterial[] = [...INITIAL_STUDY_MATERIALS];
let exams: Exam[] = [...INITIAL_EXAMS];
let examAttempts: ExamAttempt[] = [
  {
    id: 'att-101',
    examId: 'exam-elec-weekly',
    examTitle: 'চলতড়িৎ অধ্যায়ভিত্তিক স্পেশাল মক টেস্ট',
    studentId: 'user-student-rahul',
    studentName: 'Rahul Das',
    startedAt: '2025-02-15T14:00:00Z',
    submittedAt: '2025-02-15T14:28:00Z',
    score: 28,
    totalMarks: 30,
    percentage: 93,
    passed: true,
    correctCount: 9,
    incorrectCount: 1,
    unattemptedCount: 0,
    answers: { 'q-1': 'opt-1a', 'q-2': 'opt-2a', 'q-3': 'opt-3b' },
    topicPerformance: [
      { topic: "Ohm's Law & Resistance", score: 10, total: 10 },
      { topic: 'Electric Power & Heating', score: 12, total: 14 },
      { topic: 'Instruments', score: 6, total: 6 }
    ]
  },
  {
    id: 'att-102',
    examId: 'exam-elec-weekly',
    examTitle: 'চলতড়িৎ অধ্যায়ভিত্তিক স্পেশাল মক টেস্ট',
    studentId: 'user-student-priya',
    studentName: 'Priya Mukherjee',
    startedAt: '2025-02-15T15:00:00Z',
    submittedAt: '2025-02-15T15:26:00Z',
    score: 26,
    totalMarks: 30,
    percentage: 87,
    passed: true,
    correctCount: 8,
    incorrectCount: 2,
    unattemptedCount: 0,
    answers: {},
    topicPerformance: [
      { topic: "Ohm's Law & Resistance", score: 8, total: 10 },
      { topic: 'Electric Power & Heating', score: 12, total: 14 },
      { topic: 'Instruments', score: 6, total: 6 }
    ]
  },
  {
    id: 'att-103',
    examId: 'exam-elec-weekly',
    examTitle: 'চলতড়িৎ অধ্যায়ভিত্তিক স্পেশাল মক টেস্ট',
    studentId: 'user-student-sourav',
    studentName: 'Sourav Roy',
    startedAt: '2025-02-15T16:10:00Z',
    submittedAt: '2025-02-15T16:30:00Z',
    score: 22,
    totalMarks: 30,
    percentage: 73,
    passed: true,
    correctCount: 7,
    incorrectCount: 3,
    unattemptedCount: 0,
    answers: {},
    topicPerformance: [
      { topic: "Ohm's Law & Resistance", score: 6, total: 10 },
      { topic: 'Electric Power & Heating', score: 10, total: 14 },
      { topic: 'Instruments', score: 6, total: 6 }
    ]
  }
];
let assignments: Assignment[] = [...INITIAL_ASSIGNMENTS];
let assignmentSubmissions: AssignmentSubmission[] = [
  {
    id: 'subm-1',
    assignmentId: 'asg-1',
    assignmentTitle: 'Current Electricity: 5 Numerical Problems Solution Worksheet',
    studentId: 'user-student-rahul',
    studentName: 'Rahul Das',
    submittedAt: '2025-02-15T11:00:00Z',
    fileName: 'Rahul_Das_Current_Electricity_Solutions.pdf',
    notes: 'Completed all 5 numerical problems with diagrams and BOT unit calculations.',
    status: 'graded',
    marksAwarded: 19,
    feedback: 'Excellent work Rahul! Step-by-step units and Joule heating calculations were accurate. Keep it up.'
  },
  {
    id: 'subm-2',
    assignmentId: 'asg-1',
    assignmentTitle: 'Current Electricity: 5 Numerical Problems Solution Worksheet',
    studentId: 'user-student-priya',
    studentName: 'Priya Mukherjee',
    submittedAt: '2025-02-15T13:40:00Z',
    fileName: 'Priya_Worksheet_Ch4.pdf',
    notes: 'Please review question 4 resistor bridge equation.',
    status: 'submitted'
  }
];
let doubts: StudentDoubt[] = [
  {
    id: 'doubt-1',
    studentId: 'user-student-rahul',
    studentName: 'Rahul Das',
    studentPhone: '8972263462',
    courseId: 'course-10-madhyamik',
    courseTitle: 'Madhyamik Physical Science Complete Batch 2026',
    chapter: 'Current Electricity',
    subject: 'Physical Science',
    questionText: 'When resistors are connected in parallel, why does the equivalent resistance become less than the smallest individual resistance? Please explain with numerical proof.',
    status: 'answered',
    teacherReply: 'In parallel combination, 1/R_eq = 1/R1 + 1/R2. Since each term 1/Ri is positive, 1/R_eq > 1/R_min, which implies R_eq < R_min. Providing more parallel paths increases total conductance (G_total = G1 + G2).',
    teacherName: 'Subrata Acharya (Physics Faculty)',
    repliedAt: '2025-02-15T15:30:00Z',
    createdAt: '2025-02-15T12:00:00Z'
  },
  {
    id: 'doubt-2',
    studentId: 'user-student-rahul',
    studentName: 'Rahul Das',
    studentPhone: '8972263462',
    courseId: 'course-10-madhyamik',
    courseTitle: 'Madhyamik Physical Science Complete Batch 2026',
    chapter: 'Optics',
    subject: 'Physical Science',
    questionText: 'Sir, how to determine whether the focal length of a concave mirror should be taken as negative or positive in numerical lens maker problems?',
    status: 'pending',
    createdAt: '2025-02-15T17:15:00Z'
  }
];
let orders: PaymentOrder[] = [...INITIAL_ORDERS];
let enquiries: ContactEnquiry[] = [...INITIAL_ENQUIRIES];
let notifications: AppNotification[] = [...INITIAL_NOTIFICATIONS];
let auditLogs: AuditLog[] = [...INITIAL_AUDIT_LOGS];

function addAuditLog(userName: string, userRole: any, action: string, entity: string, details: string) {
  const log: AuditLog = {
    id: 'log-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    userId: 'system',
    userName,
    userRole,
    action,
    entity,
    details,
    ipAddress: '127.0.0.1',
    timestamp: new Date().toISOString()
  };
  auditLogs.unshift(log);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'PHYSICS FORWARD Central API',
      timestamp: new Date().toISOString(),
      branding: appSettings.brandName,
      tagline: appSettings.tagline,
      contact: {
        phone: appSettings.contactPhone,
        email: appSettings.contactEmail,
        address: appSettings.contactAddress
      }
    });
  });

  // Settings
  app.get('/api/settings', (req, res) => {
    res.json(appSettings);
  });

  app.post('/api/settings', (req, res) => {
    appSettings = { ...appSettings, ...req.body };
    addAuditLog('Admin', 'super_admin', 'SETTINGS_UPDATED', 'AppSettings', 'System settings updated');
    res.json(appSettings);
  });

  app.post('/api/settings/social-channel', (req, res) => {
    const { id, url, enabled, buttonText } = req.body;
    if (appSettings.socialChannels) {
      appSettings.socialChannels = appSettings.socialChannels.map(ch => {
        if (ch.id === id) {
          return {
            ...ch,
            ...(url !== undefined ? { url } : {}),
            ...(enabled !== undefined ? { enabled } : {}),
            ...(buttonText !== undefined ? { buttonText } : {})
          };
        }
        return ch;
      });
    }
    if (appSettings.socialLinks && url) {
      if (id === 'youtube') appSettings.socialLinks.youtube = url;
      if (id === 'facebook') appSettings.socialLinks.facebook = url;
      if (id === 'instagram') appSettings.socialLinks.instagram = url;
      if (id === 'telegram') appSettings.socialLinks.telegram = url;
      if (id === 'whatsapp_channel') appSettings.socialLinks.whatsappChannel = url;
      if (id === 'whatsapp_group') {
        appSettings.socialLinks.whatsappGroup = url;
        appSettings.socialLinks.whatsapp = url;
      }
    }
    addAuditLog('Admin', 'super_admin', 'SOCIAL_CHANNEL_UPDATED', 'SocialChannel', `Updated ${id} social channel settings`);
    res.json(appSettings);
  });

  // Authentication
  app.post('/api/auth/login', (req, res) => {
    const { emailOrPhone, role } = req.body;
    let user = users.find(
      u => (u.email.toLowerCase() === (emailOrPhone || '').toLowerCase() || u.phone === emailOrPhone)
    );
    if (!user && role) {
      user = users.find(u => u.role === role);
    }
    if (!user) {
      // Default to Rahul (student) for smooth testing
      user = users[2];
    }
    addAuditLog(user.name, user.role, 'USER_LOGIN', 'User', `User logged in from portal`);
    res.json({ success: true, user, token: 'pfw-token-' + user.id });
  });

  app.post('/api/auth/register', (req, res) => {
    const { name, email, phone, boardId, classId, mediumId, school, city, dob } = req.body;
    if (!name || !phone) {
      res.status(400).json({ error: 'Name and Phone are mandatory' });
      return;
    }
    const newUser: User = {
      id: 'user-' + Date.now(),
      name,
      email: email || `${phone}@physicsforward.in`,
      phone,
      role: 'student',
      boardId: boardId || 'board-wbbse',
      classId: classId || 'class-10',
      mediumId: mediumId || 'med-bn',
      school: school || 'Local High School',
      city: city || 'West Bengal',
      dob,
      active: true,
      enrolledCourseIds: ['course-10-madhyamik'],
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    addAuditLog(name, 'student', 'STUDENT_REGISTERED', 'User', `New student registered with phone ${phone}`);
    res.json({ success: true, user: newUser, token: 'pfw-token-' + newUser.id });
  });

  // Users List (Admin)
  app.get('/api/users', (req, res) => {
    res.json(users);
  });

  app.post('/api/users/toggle-status', (req, res) => {
    const { userId } = req.body;
    const target = users.find(u => u.id === userId);
    if (target) {
      target.active = !target.active;
      addAuditLog('Admin', 'super_admin', 'USER_STATUS_TOGGLED', 'User', `User ${target.name} status: ${target.active}`);
    }
    res.json(users);
  });

  // Programs (Extensible Academic Programs Engine)
  app.get('/api/programs', (req, res) => {
    const sorted = [...programs].sort((a, b) => (a.order || 999) - (b.order || 999));
    if (req.query.all === 'true') {
      res.json(sorted);
    } else {
      res.json(sorted.filter(p => p.active && !p.archived));
    }
  });

  app.get('/api/programs/:id', (req, res) => {
    const program = programs.find(p => p.id === req.params.id || p.code === req.params.id);
    if (!program) {
      res.status(404).json({ error: 'Program not found' });
      return;
    }
    res.json(program);
  });

  app.post('/api/programs', (req, res) => {
    const progData = req.body;
    if (progData.id) {
      const idx = programs.findIndex(p => p.id === progData.id);
      if (idx !== -1) {
        programs[idx] = { ...programs[idx], ...progData };
        addAuditLog('Admin', 'academic_admin', 'PROGRAM_UPDATED', 'Program', `Program updated: ${progData.name}`);
      } else {
        programs.push(progData);
      }
    } else {
      const newProgram: Program = {
        id: 'prog-' + (progData.code || Date.now()),
        code: progData.code || 'prog-' + Date.now(),
        name: progData.name,
        nameBn: progData.nameBn || progData.name,
        tagline: progData.tagline || '',
        taglineBn: progData.taglineBn || '',
        description: progData.description || '',
        descriptionBn: progData.descriptionBn || '',
        subject: progData.subject || 'Physics',
        category: progData.category || 'competitive',
        active: progData.active !== undefined ? progData.active : true,
        archived: progData.archived !== undefined ? progData.archived : false,
        order: progData.order || programs.length + 1,
        badge: progData.badge || 'Program',
        badgeBn: progData.badgeBn || 'প্রোগ্রাম',
        accentColor: progData.accentColor || '#FF9933',
        icon: progData.icon || 'GraduationCap',
        imageUrl: progData.imageUrl || '',
        bannerUrl: progData.bannerUrl || '',
        thumbnailUrl: progData.thumbnailUrl || '',
        duration: progData.duration || '12 Months',
        basePrice: progData.basePrice || 1999,
        eligibility: progData.eligibility || '',
        eligibilityBn: progData.eligibilityBn || '',
        displayOnWebsite: progData.displayOnWebsite !== undefined ? progData.displayOnWebsite : true,
        displayOnApp: progData.displayOnApp !== undefined ? progData.displayOnApp : true,
        flowPath: progData.flowPath || `${progData.name} → Physics → Courses → Chapters → Lessons → Tests`,
        features: progData.features || [],
        featuresBn: progData.featuresBn || [],
        includedItems: progData.includedItems || [],
        includedItemsBn: progData.includedItemsBn || []
      };
      programs.push(newProgram);
      addAuditLog('Admin', 'academic_admin', 'PROGRAM_CREATED', 'Program', `New program added: ${newProgram.name}`);
    }
    const sorted = [...programs].sort((a, b) => (a.order || 999) - (b.order || 999));
    res.json(sorted);
  });

  app.post('/api/programs/toggle', (req, res) => {
    const { programId } = req.body;
    const target = programs.find(p => p.id === programId || p.code === programId);
    if (target) {
      target.active = !target.active;
      addAuditLog('Admin', 'super_admin', 'PROGRAM_STATUS_TOGGLED', 'Program', `Program ${target.name} active: ${target.active}`);
    }
    const sorted = [...programs].sort((a, b) => (a.order || 999) - (b.order || 999));
    res.json(sorted);
  });

  app.post('/api/programs/archive', (req, res) => {
    const { programId } = req.body;
    const target = programs.find(p => p.id === programId || p.code === programId);
    if (target) {
      target.archived = !target.archived;
      addAuditLog('Admin', 'super_admin', 'PROGRAM_ARCHIVE_TOGGLED', 'Program', `Program ${target.name} archived: ${target.archived}`);
    }
    const sorted = [...programs].sort((a, b) => (a.order || 999) - (b.order || 999));
    res.json(sorted);
  });

  app.post('/api/programs/reorder', (req, res) => {
    const { programIds } = req.body;
    if (Array.isArray(programIds)) {
      programIds.forEach((id: string, index: number) => {
        const p = programs.find(item => item.id === id || item.code === id);
        if (p) p.order = index + 1;
      });
      addAuditLog('Admin', 'academic_admin', 'PROGRAMS_REORDERED', 'Program', 'Programs display order updated');
    }
    const sorted = [...programs].sort((a, b) => (a.order || 999) - (b.order || 999));
    res.json(sorted);
  });

  app.delete('/api/programs/:id', (req, res) => {
    programs = programs.filter(p => p.id !== req.params.id && p.code !== req.params.id);
    addAuditLog('Admin', 'super_admin', 'PROGRAM_DELETED', 'Program', `Program deleted: ${req.params.id}`);
    const sorted = [...programs].sort((a, b) => (a.order || 999) - (b.order || 999));
    res.json(sorted);
  });

  // Boards
  app.get('/api/boards', (req, res) => {
    res.json(boards);
  });

  app.post('/api/boards', (req, res) => {
    const boardData = req.body;
    if (boardData.id) {
      const idx = boards.findIndex(b => b.id === boardData.id);
      if (idx !== -1) {
        boards[idx] = { ...boards[idx], ...boardData };
        addAuditLog('Admin', 'academic_admin', 'BOARD_UPDATED', 'Board', `Updated board: ${boardData.name}`);
        res.json(boards);
        return;
      }
    }
    const newBoard: Board = {
      id: 'board-' + Date.now(),
      code: req.body.code,
      name: req.body.name,
      nameBn: req.body.nameBn || req.body.name,
      active: true,
      description: req.body.description || ''
    };
    boards.push(newBoard);
    addAuditLog('Admin', 'academic_admin', 'BOARD_ADDED', 'Board', `New board added: ${newBoard.name}`);
    res.json(boards);
  });

  app.delete('/api/boards/:id', (req, res) => {
    boards = boards.filter(b => b.id !== req.params.id);
    addAuditLog('Admin', 'super_admin', 'BOARD_DELETED', 'Board', `Deleted board: ${req.params.id}`);
    res.json(boards);
  });

  // Mediums & Classes
  app.get('/api/mediums', (req, res) => {
    res.json(mediums);
  });

  app.post('/api/mediums', (req, res) => {
    const newMedium = {
      id: 'med-' + Date.now(),
      code: req.body.code,
      name: req.body.name,
      nameBn: req.body.nameBn || req.body.name
    };
    mediums.push(newMedium);
    res.json(mediums);
  });

  app.delete('/api/mediums/:id', (req, res) => {
    mediums = mediums.filter(m => m.id !== req.params.id);
    res.json(mediums);
  });

  app.get('/api/classes', (req, res) => {
    res.json(classes);
  });

  app.post('/api/classes', (req, res) => {
    const classData = req.body;
    if (classData.id) {
      const idx = classes.findIndex(c => c.id === classData.id);
      if (idx !== -1) {
        classes[idx] = { ...classes[idx], ...classData };
        res.json(classes);
        return;
      }
    }
    const newClass = {
      id: 'class-' + Date.now(),
      code: req.body.code,
      name: req.body.name,
      nameBn: req.body.nameBn || req.body.name,
      boardId: req.body.boardId || 'board-wbbse'
    };
    classes.push(newClass);
    res.json(classes);
  });

  app.delete('/api/classes/:id', (req, res) => {
    classes = classes.filter(c => c.id !== req.params.id);
    res.json(classes);
  });

  // Subjects
  app.get('/api/subjects', (req, res) => {
    res.json(subjects);
  });

  app.post('/api/subjects', (req, res) => {
    const subData = req.body;
    if (subData.id) {
      const idx = subjects.findIndex(s => s.id === subData.id);
      if (idx !== -1) {
        subjects[idx] = { ...subjects[idx], ...subData };
        res.json(subjects);
        return;
      }
    }
    const newSubject: Subject = {
      id: 'sub-' + Date.now(),
      code: req.body.code,
      name: req.body.name,
      nameBn: req.body.nameBn || req.body.name,
      icon: req.body.icon || 'BookOpen',
      description: req.body.description || '',
      descriptionBn: req.body.descriptionBn || '',
      active: true
    };
    subjects.push(newSubject);
    addAuditLog('Admin', 'academic_admin', 'SUBJECT_ADDED', 'Subject', `New subject added: ${newSubject.name}`);
    res.json(subjects);
  });

  app.delete('/api/subjects/:id', (req, res) => {
    subjects = subjects.filter(s => s.id !== req.params.id);
    res.json(subjects);
  });

  // Teachers API
  app.get('/api/teachers', (req, res) => {
    const teachers = users.filter(u => u.role === 'teacher' || u.role === 'super_admin');
    res.json(teachers);
  });

  app.post('/api/teachers', (req, res) => {
    const teacherData = req.body;
    if (teacherData.id) {
      const idx = users.findIndex(u => u.id === teacherData.id);
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...teacherData };
        addAuditLog('Admin', 'super_admin', 'TEACHER_UPDATED', 'User', `Updated teacher: ${teacherData.name}`);
      } else {
        users.push({ ...teacherData, role: 'teacher' });
      }
    } else {
      const newTeacher: User = {
        id: 'user-teacher-' + Date.now(),
        name: teacherData.name,
        email: teacherData.email || `faculty.${Date.now()}@physicsforward.in`,
        phone: teacherData.phone || '8972263462',
        role: 'teacher',
        city: teacherData.city || 'Contai',
        school: teacherData.school || 'Physics Forward Academy',
        active: true,
        qualification: teacherData.qualification || 'M.Sc. Physics',
        experience: teacherData.experience || '5+ Years',
        bio: teacherData.bio || '',
        bioBn: teacherData.bioBn || '',
        assignedSubjectNames: teacherData.assignedSubjectNames || ['Physics'],
        assignedBatchNames: teacherData.assignedBatchNames || [],
        assignedCourseNames: teacherData.assignedCourseNames || [],
        permissions: teacherData.permissions || ['live_classes', 'grading', 'doubts_reply'],
        teachingSchedule: teacherData.teachingSchedule || 'Evening sessions',
        enrolledCourseIds: [],
        createdAt: new Date().toISOString()
      };
      users.push(newTeacher);
      addAuditLog('Admin', 'super_admin', 'TEACHER_CREATED', 'User', `Added teacher: ${newTeacher.name}`);
    }
    const teachers = users.filter(u => u.role === 'teacher' || u.role === 'super_admin');
    res.json(teachers);
  });

  app.delete('/api/teachers/:id', (req, res) => {
    users = users.filter(u => u.id !== req.params.id);
    addAuditLog('Admin', 'super_admin', 'TEACHER_DELETED', 'User', `Deleted teacher: ${req.params.id}`);
    const teachers = users.filter(u => u.role === 'teacher' || u.role === 'super_admin');
    res.json(teachers);
  });

  // Students API
  app.get('/api/students', (req, res) => {
    const students = users.filter(u => u.role === 'student');
    res.json(students);
  });

  app.post('/api/students/:id/update', (req, res) => {
    const target = users.find(u => u.id === req.params.id);
    if (target) {
      Object.assign(target, req.body);
      addAuditLog('Admin', 'super_admin', 'STUDENT_UPDATED', 'User', `Updated student profile: ${target.name}`);
      res.json(target);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  });

  app.post('/api/students/:id/enroll', (req, res) => {
    const { courseId, programId } = req.body;
    const target = users.find(u => u.id === req.params.id);
    if (target) {
      if (courseId && !target.enrolledCourseIds.includes(courseId)) {
        target.enrolledCourseIds.push(courseId);
      }
      if (programId && target.enrolledProgramIds && !target.enrolledProgramIds.includes(programId)) {
        target.enrolledProgramIds.push(programId);
      }
      addAuditLog('Admin', 'academic_admin', 'STUDENT_ENROLLED', 'User', `Enrolled student ${target.name} into ${courseId || programId}`);
      res.json(target);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  });

  // Courses
  app.get('/api/courses', (req, res) => {
    const sorted = [...courses].sort((a, b) => (a.order || 999) - (b.order || 999));
    if (req.query.all === 'true') {
      res.json(sorted);
    } else {
      res.json(sorted.filter(c => !c.archived));
    }
  });

  app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === req.params.id);
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }
    res.json(course);
  });

  app.post('/api/courses', (req, res) => {
    const courseData = req.body;
    const idx = courseData.id ? courses.findIndex(c => c.id === courseData.id) : -1;
    if (idx !== -1) {
      courses[idx] = { ...courses[idx], ...courseData };
    } else {
      const newCourse: Course = {
        ...courseData,
        id: courseData.id || 'course-' + Date.now(),
        order: courseData.order || courses.length + 1,
        syllabus: courseData.syllabus || [],
        rating: courseData.rating || 5.0,
        published: courseData.published !== undefined ? courseData.published : true,
        archived: courseData.archived !== undefined ? courseData.archived : false,
        displayOnWebsite: courseData.displayOnWebsite !== undefined ? courseData.displayOnWebsite : true,
        displayOnApp: courseData.displayOnApp !== undefined ? courseData.displayOnApp : true,
        enrollmentOpen: courseData.enrollmentOpen !== undefined ? courseData.enrollmentOpen : true
      };
      courses.unshift(newCourse);
    }
    addAuditLog('Admin', 'academic_admin', 'COURSE_SAVED', 'Course', `Course updated/created: ${courseData.title}`);
    const sorted = [...courses].sort((a, b) => (a.order || 999) - (b.order || 999));
    res.json(sorted);
  });

  app.post('/api/courses/toggle', (req, res) => {
    const { courseId } = req.body;
    const target = courses.find(c => c.id === courseId);
    if (target) {
      target.published = !target.published;
      addAuditLog('Admin', 'super_admin', 'COURSE_STATUS_TOGGLED', 'Course', `Course ${target.title} published: ${target.published}`);
    }
    const sorted = [...courses].sort((a, b) => (a.order || 999) - (b.order || 999));
    res.json(sorted);
  });

  app.post('/api/courses/archive', (req, res) => {
    const { courseId } = req.body;
    const target = courses.find(c => c.id === courseId);
    if (target) {
      target.archived = !target.archived;
      addAuditLog('Admin', 'super_admin', 'COURSE_ARCHIVE_TOGGLED', 'Course', `Course ${target.title} archived: ${target.archived}`);
    }
    const sorted = [...courses].sort((a, b) => (a.order || 999) - (b.order || 999));
    res.json(sorted);
  });

  app.post('/api/courses/reorder', (req, res) => {
    const { courseIds } = req.body;
    if (Array.isArray(courseIds)) {
      courseIds.forEach((id: string, index: number) => {
        const c = courses.find(item => item.id === id);
        if (c) c.order = index + 1;
      });
      addAuditLog('Admin', 'academic_admin', 'COURSES_REORDERED', 'Course', 'Courses display order updated');
    }
    const sorted = [...courses].sort((a, b) => (a.order || 999) - (b.order || 999));
    res.json(sorted);
  });

  app.delete('/api/courses/:id', (req, res) => {
    courses = courses.filter(c => c.id !== req.params.id);
    addAuditLog('Admin', 'super_admin', 'COURSE_DELETED', 'Course', `Course deleted: ${req.params.id}`);
    const sorted = [...courses].sort((a, b) => (a.order || 999) - (b.order || 999));
    res.json(sorted);
  });

  // Batches
  app.get('/api/batches', (req, res) => {
    res.json(batches);
  });

  app.post('/api/batches', (req, res) => {
    const batchData = req.body;
    const idx = batchData.id ? batches.findIndex(b => b.id === batchData.id) : -1;
    if (idx !== -1) {
      batches[idx] = { ...batches[idx], ...batchData };
    } else {
      const newBatch: Batch = {
        ...batchData,
        id: batchData.id || 'batch-' + Date.now(),
        enrolledCount: batchData.enrolledCount || 0,
        status: batchData.status || 'ongoing'
      };
      batches.unshift(newBatch);
    }
    res.json(batches);
  });

  app.post('/api/batches/toggle', (req, res) => {
    const { batchId } = req.body;
    const target = batches.find(b => b.id === batchId);
    if (target) {
      target.status = target.status === 'ongoing' ? 'completed' : 'ongoing';
      addAuditLog('Admin', 'super_admin', 'BATCH_STATUS_TOGGLED', 'Batch', `Batch ${target.name} status: ${target.status}`);
    }
    res.json(batches);
  });

  app.delete('/api/batches/:id', (req, res) => {
    batches = batches.filter(b => b.id !== req.params.id);
    addAuditLog('Admin', 'super_admin', 'BATCH_DELETED', 'Batch', `Batch deleted: ${req.params.id}`);
    res.json(batches);
  });

  // Live Classes
  app.get('/api/live-classes', (req, res) => {
    res.json(liveClasses);
  });

  app.post('/api/live-classes', (req, res) => {
    const newLive: LiveClass = {
      ...req.body,
      id: req.body.id || 'live-' + Date.now(),
      status: req.body.status || 'upcoming'
    };
    liveClasses.unshift(newLive);
    addAuditLog('Teacher', 'teacher', 'LIVE_CLASS_SCHEDULED', 'LiveClass', `Scheduled: ${newLive.title}`);

    // Real-time ecosystem notification to students
    const liveNotif: AppNotification = {
      id: 'notif-live-' + Date.now(),
      title: `Live Class Scheduled: ${newLive.title}`,
      titleBn: `নতুন লাইভ ক্লাস নির্ধারিত হয়েছে: ${newLive.titleBn || newLive.title}`,
      message: `Physics faculty ${newLive.teacherName} scheduled a live session on ${newLive.chapter}. Join on time!`,
      messageBn: `পদার্থবিজ্ঞান শিক্ষক ${newLive.teacherName} ${newLive.chapterBn || newLive.chapter} অধ্যায়ের লাইভ ক্লাস নির্ধারণ করেছেন। নির্ধারিত সময়ে যুক্ত হও।`,
      type: 'live',
      target: 'batch',
      targetId: newLive.batchId,
      createdAt: new Date().toISOString(),
      read: false
    };
    notifications.unshift(liveNotif);

    res.json(liveClasses);
  });

  app.delete('/api/live-classes/:id', (req, res) => {
    liveClasses = liveClasses.filter(l => l.id !== req.params.id);
    addAuditLog('Teacher', 'teacher', 'LIVE_CLASS_DELETED', 'LiveClass', `Deleted: ${req.params.id}`);
    res.json(liveClasses);
  });

  // Recorded Classes
  app.get('/api/recorded-classes', (req, res) => {
    res.json(recordedClasses);
  });

  app.post('/api/recorded-classes', (req, res) => {
    const newRec: RecordedClass = {
      ...req.body,
      id: req.body.id || 'rec-' + Date.now(),
      views: req.body.views || 1
    };
    recordedClasses.unshift(newRec);
    addAuditLog('Teacher', 'teacher', 'RECORDING_UPLOADED', 'RecordedClass', `Uploaded: ${newRec.title}`);

    // Real-time ecosystem notification
    const recNotif: AppNotification = {
      id: 'notif-rec-' + Date.now(),
      title: `New Lecture Video: ${newRec.title}`,
      titleBn: `নতুন লেকচার ভিডিও আপলোড: ${newRec.titleBn || newRec.title}`,
      message: `Full lecture recording on ${newRec.chapter} is now available in your course library.`,
      messageBn: `${newRec.chapterBn || newRec.chapter} অধ্যায়ের সম্পূর্ণ লেকচার ভিডিও লাইব্রেরিতে যুক্ত হয়েছে।`,
      type: 'material',
      target: 'all',
      createdAt: new Date().toISOString(),
      read: false
    };
    notifications.unshift(recNotif);

    res.json(recordedClasses);
  });

  app.delete('/api/recorded-classes/:id', (req, res) => {
    recordedClasses = recordedClasses.filter(r => r.id !== req.params.id);
    res.json(recordedClasses);
  });

  // Study Materials
  app.get('/api/study-materials', (req, res) => {
    res.json(studyMaterials);
  });

  app.post('/api/study-materials', (req, res) => {
    const newMat: StudyMaterial = {
      ...req.body,
      id: req.body.id || 'mat-' + Date.now(),
      downloadCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    studyMaterials.unshift(newMat);
    addAuditLog('Admin/Teacher', 'content_manager', 'MATERIAL_UPLOADED', 'StudyMaterial', `Uploaded: ${newMat.title}`);
    res.json(studyMaterials);
  });

  app.delete('/api/study-materials/:id', (req, res) => {
    studyMaterials = studyMaterials.filter(m => m.id !== req.params.id);
    res.json(studyMaterials);
  });

  // Exams & Attempts
  app.get('/api/exams', (req, res) => {
    res.json(exams);
  });

  app.get('/api/exams/:id', (req, res) => {
    const exam = exams.find(e => e.id === req.params.id);
    if (!exam) {
      res.status(404).json({ error: 'Exam not found' });
      return;
    }
    res.json(exam);
  });

  app.post('/api/exams', (req, res) => {
    const examData = req.body;
    if (examData.id) {
      const idx = exams.findIndex(e => e.id === examData.id);
      if (idx !== -1) {
        exams[idx] = { ...exams[idx], ...examData };
      } else {
        exams.push(examData);
      }
    } else {
      const newExam: Exam = {
        ...examData,
        id: 'exam-' + Date.now(),
        scheduledStart: examData.scheduledStart || new Date().toISOString(),
        scheduledEnd: examData.scheduledEnd || new Date(Date.now() + 86400000 * 7).toISOString(),
        status: examData.status || 'active',
        questions: examData.questions || []
      };
      exams.unshift(newExam);

      // Real-time exam notification across ecosystem
      const examNotif: AppNotification = {
        id: 'notif-exam-' + Date.now(),
        title: `Exam Published: ${newExam.title}`,
        titleBn: `নতুন পরীক্ষা প্রকাশিত হয়েছে: ${newExam.titleBn || newExam.title}`,
        message: `${newExam.totalMarks} Marks exam on ${newExam.subject} is now active. Complete before deadline!`,
        messageBn: `${newExam.subject} এর উপর ${newExam.totalMarks} নম্বরের মক টেস্ট সক্রিয় হয়েছে। দ্রুত অংশগ্রহণ করো!`,
        type: 'exam',
        target: 'all',
        createdAt: new Date().toISOString(),
        read: false
      };
      notifications.unshift(examNotif);
    }
    addAuditLog('Admin/Teacher', 'teacher', 'EXAM_SAVED', 'Exam', `Exam updated/created: ${examData.title}`);
    res.json(exams);
  });

  app.post('/api/exams/toggle', (req, res) => {
    const { examId } = req.body;
    const target = exams.find(e => e.id === examId);
    if (target) {
      target.status = target.status === 'active' ? 'completed' : 'active';
      addAuditLog('Admin', 'super_admin', 'EXAM_STATUS_TOGGLED', 'Exam', `Exam ${target.title} status: ${target.status}`);
    }
    res.json(exams);
  });

  app.delete('/api/exams/:id', (req, res) => {
    exams = exams.filter(e => e.id !== req.params.id);
    addAuditLog('Admin', 'super_admin', 'EXAM_DELETED', 'Exam', `Exam deleted: ${req.params.id}`);
    res.json(exams);
  });

  app.post('/api/exams/:id/duplicate', (req, res) => {
    const sourceExam = exams.find(e => e.id === req.params.id);
    if (!sourceExam) {
      res.status(404).json({ error: 'Exam not found' });
      return;
    }
    const duplicatedExam: Exam = {
      ...sourceExam,
      id: 'exam-' + Date.now(),
      title: `${sourceExam.title} (Copy)`,
      titleBn: `${sourceExam.titleBn} (কপি)`,
      status: 'upcoming',
      questions: sourceExam.questions.map(q => ({
        ...q,
        id: 'q-' + Date.now() + '-' + Math.floor(Math.random() * 1000)
      }))
    };
    exams.unshift(duplicatedExam);
    addAuditLog('Admin', 'academic_admin', 'EXAM_DUPLICATED', 'Exam', `Duplicated exam ${sourceExam.title}`);
    res.json(duplicatedExam);
  });

  app.post('/api/exams/submit', (req, res) => {
    const { examId, studentId, studentName, answers } = req.body;
    const exam = exams.find(e => e.id === examId);
    if (!exam) {
      res.status(404).json({ error: 'Exam not found' });
      return;
    }

    let score = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    const topicScores: Record<string, { score: number; total: number }> = {};

    exam.questions.forEach(q => {
      if (!topicScores[q.topic]) {
        topicScores[q.topic] = { score: 0, total: 0 };
      }
      topicScores[q.topic].total += q.marks;

      const givenAnswer = answers[q.id];
      if (givenAnswer === undefined || givenAnswer === null || givenAnswer === '') {
        unattemptedCount++;
        return;
      }

      let isCorrect = false;
      if (q.type === 'mcq') {
        if (givenAnswer === q.correctOptionId) {
          isCorrect = true;
        }
      } else if (q.type === 'numerical') {
        const diff = Math.abs(Number(givenAnswer) - Number(q.numericalAnswer));
        const tol = q.tolerance || 0.1;
        if (diff <= tol) {
          isCorrect = true;
        }
      } else if (q.type === 'true_false') {
        if (givenAnswer === q.trueFalseAnswer) {
          isCorrect = true;
        }
      } else {
        isCorrect = true; // Short answer practice
      }

      if (isCorrect) {
        score += q.marks;
        correctCount++;
        topicScores[q.topic].score += q.marks;
      } else {
        score -= exam.negativeMarking || 0;
        incorrectCount++;
      }
    });

    const finalScore = Math.max(0, Math.round(score * 10) / 10);
    const percentage = Math.round((finalScore / exam.totalMarks) * 100);

    const attempt: ExamAttempt = {
      id: 'att-' + Date.now(),
      examId,
      examTitle: exam.titleBn || exam.title,
      studentId: studentId || 'user-student-rahul',
      studentName: studentName || 'Rahul Das',
      startedAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
      submittedAt: new Date().toISOString(),
      score: finalScore,
      totalMarks: exam.totalMarks,
      percentage,
      passed: finalScore >= exam.passMarks,
      correctCount,
      incorrectCount,
      unattemptedCount,
      answers,
      topicPerformance: Object.entries(topicScores).map(([topic, data]) => ({
        topic,
        score: Math.max(0, Math.round(data.score * 10) / 10),
        total: data.total
      }))
    };

    examAttempts.unshift(attempt);
    addAuditLog(attempt.studentName, 'student', 'EXAM_SUBMISSION', 'ExamAttempt', `Exam ${exam.title}: Score ${finalScore}/${exam.totalMarks}`);

    res.json({ success: true, attempt });
  });

  app.get('/api/exam-attempts', (req, res) => {
    const { examId, studentId } = req.query;
    let list = examAttempts;
    if (examId) {
      list = list.filter(a => a.examId === examId);
    }
    if (studentId) {
      list = list.filter(a => a.studentId === studentId);
    }
    res.json(list);
  });

  app.get('/api/exam-attempts/:studentId', (req, res) => {
    const list = examAttempts.filter(a => a.studentId === req.params.studentId);
    res.json(list);
  });

  // Assignments
  app.get('/api/assignments', (req, res) => {
    res.json(assignments);
  });

  app.post('/api/assignments', (req, res) => {
    const asgData = req.body;
    const newAsg: Assignment = {
      ...asgData,
      id: asgData.id || 'asg-' + Date.now(),
      status: asgData.status || 'open'
    };
    assignments.unshift(newAsg);
    addAuditLog('Teacher', 'teacher', 'ASSIGNMENT_CREATED', 'Assignment', `Created: ${newAsg.title}`);
    res.json(assignments);
  });

  app.get('/api/assignments/submissions', (req, res) => {
    res.json(assignmentSubmissions);
  });

  app.post('/api/assignments/submit', (req, res) => {
    const { assignmentId, studentId, studentName, notes, fileName } = req.body;
    const asg = assignments.find(a => a.id === assignmentId);
    const submission: AssignmentSubmission = {
      id: 'subm-' + Date.now(),
      assignmentId,
      assignmentTitle: asg?.titleBn || asg?.title || 'Assignment',
      studentId,
      studentName,
      submittedAt: new Date().toISOString(),
      fileName: fileName || 'Physics_Assignment_Solution.pdf',
      notes: notes || '',
      status: 'submitted'
    };
    assignmentSubmissions.unshift(submission);
    addAuditLog(studentName, 'student', 'ASSIGNMENT_SUBMITTED', 'AssignmentSubmission', `Submitted: ${submission.assignmentTitle}`);
    res.json({ success: true, submission });
  });

  app.post('/api/assignments/grade', (req, res) => {
    const { submissionId, marksAwarded, feedback } = req.body;
    const sub = assignmentSubmissions.find(s => s.id === submissionId);
    if (!sub) {
      res.status(404).json({ error: 'Submission not found' });
      return;
    }
    sub.marksAwarded = marksAwarded;
    sub.feedback = feedback;
    sub.status = 'graded';
    addAuditLog('Teacher', 'teacher', 'ASSIGNMENT_GRADED', 'AssignmentSubmission', `Graded ${sub.assignmentTitle} for ${sub.studentName}: ${marksAwarded} marks`);
    res.json({ success: true, submission: sub, submissions: assignmentSubmissions });
  });

  // Student Doubts & Faculty Responses
  app.get('/api/doubts', (req, res) => {
    const { studentId } = req.query;
    if (studentId) {
      res.json(doubts.filter(d => d.studentId === studentId));
    } else {
      res.json(doubts);
    }
  });

  app.post('/api/doubts', (req, res) => {
    const { studentId, studentName, studentPhone, courseId, courseTitle, chapter, subject, questionText } = req.body;
    if (!questionText) {
      res.status(400).json({ error: 'Question text is required' });
      return;
    }
    const newDoubt: StudentDoubt = {
      id: 'doubt-' + Date.now(),
      studentId: studentId || 'user-student-rahul',
      studentName: studentName || 'Rahul Das',
      studentPhone: studentPhone || '8972263462',
      courseId,
      courseTitle,
      chapter: chapter || 'General Physics',
      subject: subject || 'Physics',
      questionText,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    doubts.unshift(newDoubt);
    addAuditLog(newDoubt.studentName, 'student', 'DOUBT_SUBMITTED', 'StudentDoubt', `Doubt submitted on ${chapter}`);
    res.json({ success: true, doubt: newDoubt, doubts });
  });

  app.post('/api/doubts/:id/reply', (req, res) => {
    const { teacherReply, teacherName } = req.body;
    const doubt = doubts.find(d => d.id === req.params.id);
    if (!doubt) {
      res.status(404).json({ error: 'Doubt not found' });
      return;
    }
    doubt.teacherReply = teacherReply;
    doubt.teacherName = teacherName || 'Subrata Acharya (Physics Faculty)';
    doubt.status = 'answered';
    doubt.repliedAt = new Date().toISOString();

    // Broadcast student notification
    notifications.unshift({
      id: 'notif-doubt-' + Date.now(),
      title: `Physics Doubt Resolved`,
      titleBn: `তোমার পদার্থবিজ্ঞান প্রশ্নের উত্তর দিয়েছেন শিক্ষক`,
      message: `Teacher answered your question on ${doubt.chapter}: "${doubt.questionText.slice(0, 50)}..."`,
      messageBn: `শিক্ষক তোমার "${doubt.chapter}" অধ্যায়ের প্রশ্নের উত্তর দিয়েছেন। স্টুডেন্ট অ্যাপে গিয়ে বিস্তারিত দেখো।`,
      type: 'announcement',
      target: 'individual',
      targetId: doubt.studentId,
      createdAt: new Date().toISOString(),
      read: false
    });

    addAuditLog(doubt.teacherName, 'teacher', 'DOUBT_ANSWERED', 'StudentDoubt', `Answered doubt ${doubt.id} from ${doubt.studentName}`);
    res.json({ success: true, doubt, doubts });
  });

  // Formulas
  app.get('/api/formulas', (req, res) => {
    res.json(INITIAL_FORMULAS);
  });

  // Coupons & Orders
  app.post('/api/coupons/validate', (req, res) => {
    const { code } = req.body;
    const coupon = INITIAL_COUPONS.find(c => c.code.toUpperCase() === (code || '').toUpperCase() && c.active);
    if (!coupon) {
      res.status(400).json({ valid: false, message: 'Invalid or expired coupon code' });
      return;
    }
    res.json({ valid: true, coupon });
  });

  app.get('/api/orders', (req, res) => {
    res.json(orders);
  });

  app.post('/api/orders/checkout', (req, res) => {
    const { studentId, studentName, studentEmail, studentPhone, courseId, couponCode, paymentMethod } = req.body;
    const course = courses.find(c => c.id === courseId);
    if (!course) {
      res.status(404).json({ error: 'Course not found' });
      return;
    }

    let discount = 0;
    if (couponCode) {
      const coupon = INITIAL_COUPONS.find(c => c.code.toUpperCase() === couponCode.toUpperCase());
      if (coupon) {
        discount = Math.min((course.price * coupon.discountPercent) / 100, coupon.maxDiscount);
      }
    }

    const finalAmount = Math.max(0, Math.round(course.price - discount));
    const newOrder: PaymentOrder = {
      id: 'ord-' + Date.now(),
      studentId: studentId || 'user-student-rahul',
      studentName: studentName || 'Rahul Das',
      studentEmail: studentEmail || 'student@physicsforward.in',
      studentPhone: studentPhone || '8972263462',
      courseId,
      courseTitle: course.titleBn || course.title,
      amount: finalAmount,
      originalAmount: course.price,
      couponCode,
      discountAmount: discount,
      status: 'completed',
      transactionId: 'TXN-PFW-' + Math.floor(100000 + Math.random() * 900000),
      paymentMethod: paymentMethod || 'UPI / QR',
      createdAt: new Date().toISOString(),
      invoiceNumber: 'INV-PFW-' + Math.floor(1000 + Math.random() * 9000)
    };

    orders.unshift(newOrder);

    // Enroll student
    const student = users.find(u => u.id === newOrder.studentId);
    if (student && !student.enrolledCourseIds.includes(courseId)) {
      student.enrolledCourseIds.push(courseId);
    }

    addAuditLog(newOrder.studentName, 'student', 'COURSE_PURCHASE', 'PaymentOrder', `Purchased: ${course.title} for ₹${finalAmount}`);
    res.json({ success: true, order: newOrder });
  });

  // Contact Enquiries
  app.get('/api/enquiries', (req, res) => {
    res.json(enquiries);
  });

  app.post('/api/enquiries', (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !phone || !message) {
      res.status(400).json({ error: 'Name, Phone and Message are required' });
      return;
    }
    const newEnq: ContactEnquiry = {
      id: 'enq-' + Date.now(),
      name,
      email: email || '',
      phone,
      subject: subject || 'General Admission Enquiry',
      message,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    enquiries.unshift(newEnq);
    addAuditLog(name, 'student', 'ENQUIRY_SUBMITTED', 'ContactEnquiry', `New enquiry from ${name} (${phone})`);
    res.json({ success: true, enquiry: newEnq });
  });

  app.post('/api/enquiries/update-status', (req, res) => {
    const { enquiryId, status } = req.body;
    const item = enquiries.find(e => e.id === enquiryId);
    if (item) {
      item.status = status;
    }
    res.json(enquiries);
  });

  // Notifications
  app.get('/api/notifications', (req, res) => {
    res.json(notifications);
  });

  app.post('/api/notifications', (req, res) => {
    const newNotif: AppNotification = {
      ...req.body,
      id: 'notif-' + Date.now(),
      createdAt: new Date().toISOString(),
      read: false
    };
    notifications.unshift(newNotif);
    addAuditLog('Admin', 'admin', 'NOTIFICATION_BROADCAST', 'AppNotification', `Sent: ${newNotif.title}`);
    res.json(notifications);
  });

  // Audit Logs (Admin)
  app.get('/api/audit-logs', (req, res) => {
    res.json(auditLogs);
  });

  // Vite Middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PHYSICS FORWARD Server running on http://localhost:${PORT}`);
  });
}

startServer();

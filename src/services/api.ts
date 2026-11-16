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
  ExamAttempt,
  Assignment,
  AssignmentSubmission,
  PaymentOrder,
  ContactEnquiry,
  AppNotification,
  AuditLog,
  AppSettings,
  PhysicsFormula,
  StudentDoubt
} from '../types';

import {
  INITIAL_SETTINGS,
  INITIAL_PROGRAMS,
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
  INITIAL_ORDERS,
  INITIAL_ENQUIRIES,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS
} from '../data/mockData';

async function fetchJson<T>(url: string, options?: RequestInit, fallbackData?: T): Promise<T> {
  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      },
      ...options
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`API call to ${url} failed, using local fallback:`, err);
    if (fallbackData !== undefined) {
      return fallbackData;
    }
    throw err;
  }
}

export const api = {
  getSettings: () => fetchJson<AppSettings>('/api/settings', undefined, INITIAL_SETTINGS),
  updateSettings: (data: Partial<AppSettings>) =>
    fetchJson<AppSettings>('/api/settings', { method: 'POST', body: JSON.stringify(data) }, { ...INITIAL_SETTINGS, ...data }),
  updateSocialChannel: (data: { id: string; url?: string; enabled?: boolean; buttonText?: string }) =>
    fetchJson<AppSettings>('/api/settings/social-channel', { method: 'POST', body: JSON.stringify(data) }, INITIAL_SETTINGS),

  login: (emailOrPhone: string, role?: string) =>
    fetchJson<{ success: boolean; user: User; token: string }>(
      '/api/auth/login',
      { method: 'POST', body: JSON.stringify({ emailOrPhone, role }) },
      {
        success: true,
        user: INITIAL_USERS.find(u => u.role === role) || INITIAL_USERS[2],
        token: 'local-token'
      }
    ),

  register: (userData: any) =>
    fetchJson<{ success: boolean; user: User; token: string }>(
      '/api/auth/register',
      { method: 'POST', body: JSON.stringify(userData) },
      {
        success: true,
        user: {
          id: 'user-' + Date.now(),
          name: userData.name,
          email: userData.email || 'student@physicsforward.in',
          phone: userData.phone,
          role: 'student',
          boardId: userData.boardId || 'board-wbbse',
          classId: userData.classId || 'class-10',
          mediumId: userData.mediumId || 'med-bn',
          school: userData.school || 'High School',
          city: userData.city || 'Contai',
          active: true,
          enrolledCourseIds: ['course-10-madhyamik'],
          createdAt: new Date().toISOString()
        },
        token: 'local-token'
      }
    ),

  getUsers: () => fetchJson<User[]>('/api/users', undefined, INITIAL_USERS),
  toggleUserStatus: (userId: string) =>
    fetchJson<User[]>('/api/users/toggle-status', { method: 'POST', body: JSON.stringify({ userId }) }, INITIAL_USERS),

  getPrograms: (all = false) =>
    fetchJson<Program[]>(`/api/programs${all ? '?all=true' : ''}`, undefined, all ? INITIAL_PROGRAMS : INITIAL_PROGRAMS.filter(p => p.active)),
  saveProgram: (program: Partial<Program>) =>
    fetchJson<Program[]>('/api/programs', { method: 'POST', body: JSON.stringify(program) }, INITIAL_PROGRAMS),
  toggleProgramActive: (programId: string) =>
    fetchJson<Program[]>('/api/programs/toggle', { method: 'POST', body: JSON.stringify({ programId }) }, INITIAL_PROGRAMS),
  archiveProgram: (programId: string) =>
    fetchJson<Program[]>('/api/programs/archive', { method: 'POST', body: JSON.stringify({ programId }) }, INITIAL_PROGRAMS),
  reorderPrograms: (programIds: string[]) =>
    fetchJson<Program[]>('/api/programs/reorder', { method: 'POST', body: JSON.stringify({ programIds }) }, INITIAL_PROGRAMS),
  deleteProgram: (programId: string) =>
    fetchJson<Program[]>(`/api/programs/${programId}`, { method: 'DELETE' }, INITIAL_PROGRAMS.filter(p => p.id !== programId)),

  getBoards: () => fetchJson<Board[]>('/api/boards', undefined, INITIAL_BOARDS),
  addBoard: (board: Partial<Board>) =>
    fetchJson<Board[]>('/api/boards', { method: 'POST', body: JSON.stringify(board) }, INITIAL_BOARDS),
  deleteBoard: (boardId: string) =>
    fetchJson<Board[]>(`/api/boards/${boardId}`, { method: 'DELETE' }, INITIAL_BOARDS.filter(b => b.id !== boardId)),

  getMediums: () => fetchJson<Medium[]>('/api/mediums', undefined, INITIAL_MEDIUMS),
  addMedium: (medium: Partial<Medium>) =>
    fetchJson<Medium[]>('/api/mediums', { method: 'POST', body: JSON.stringify(medium) }, INITIAL_MEDIUMS),
  deleteMedium: (mediumId: string) =>
    fetchJson<Medium[]>(`/api/mediums/${mediumId}`, { method: 'DELETE' }, INITIAL_MEDIUMS.filter(m => m.id !== mediumId)),

  getClasses: () => fetchJson<ClassLevel[]>('/api/classes', undefined, INITIAL_CLASSES),
  addClass: (cls: Partial<ClassLevel>) =>
    fetchJson<ClassLevel[]>('/api/classes', { method: 'POST', body: JSON.stringify(cls) }, INITIAL_CLASSES),
  deleteClass: (classId: string) =>
    fetchJson<ClassLevel[]>(`/api/classes/${classId}`, { method: 'DELETE' }, INITIAL_CLASSES.filter(c => c.id !== classId)),

  getSubjects: () => fetchJson<Subject[]>('/api/subjects', undefined, INITIAL_SUBJECTS),
  addSubject: (sub: Partial<Subject>) =>
    fetchJson<Subject[]>('/api/subjects', { method: 'POST', body: JSON.stringify(sub) }, INITIAL_SUBJECTS),
  deleteSubject: (subjectId: string) =>
    fetchJson<Subject[]>(`/api/subjects/${subjectId}`, { method: 'DELETE' }, INITIAL_SUBJECTS.filter(s => s.id !== subjectId)),

  // Teachers
  getTeachers: () => fetchJson<User[]>('/api/teachers', undefined, INITIAL_USERS.filter(u => u.role === 'teacher' || u.role === 'super_admin')),
  saveTeacher: (teacher: Partial<User>) =>
    fetchJson<User[]>('/api/teachers', { method: 'POST', body: JSON.stringify(teacher) }),
  deleteTeacher: (teacherId: string) =>
    fetchJson<User[]>(`/api/teachers/${teacherId}`, { method: 'DELETE' }),

  // Students
  getStudents: () => fetchJson<User[]>('/api/students', undefined, INITIAL_USERS.filter(u => u.role === 'student')),
  updateStudent: (studentId: string, data: Partial<User>) =>
    fetchJson<User>(`/api/students/${studentId}/update`, { method: 'POST', body: JSON.stringify(data) }),
  enrollStudent: (studentId: string, payload: { courseId?: string; programId?: string }) =>
    fetchJson<User>(`/api/students/${studentId}/enroll`, { method: 'POST', body: JSON.stringify(payload) }),

  getCourses: (all = false) =>
    fetchJson<Course[]>(`/api/courses${all ? '?all=true' : ''}`, undefined, all ? INITIAL_COURSES : INITIAL_COURSES.filter(c => !c.archived)),
  saveCourse: (course: Partial<Course>) =>
    fetchJson<Course[]>('/api/courses', { method: 'POST', body: JSON.stringify(course) }, INITIAL_COURSES),
  toggleCourseStatus: (courseId: string) =>
    fetchJson<Course[]>('/api/courses/toggle', { method: 'POST', body: JSON.stringify({ courseId }) }, INITIAL_COURSES),
  archiveCourse: (courseId: string) =>
    fetchJson<Course[]>('/api/courses/archive', { method: 'POST', body: JSON.stringify({ courseId }) }, INITIAL_COURSES),
  reorderCourses: (courseIds: string[]) =>
    fetchJson<Course[]>('/api/courses/reorder', { method: 'POST', body: JSON.stringify({ courseIds }) }, INITIAL_COURSES),
  deleteCourse: (courseId: string) =>
    fetchJson<Course[]>(`/api/courses/${courseId}`, { method: 'DELETE' }, INITIAL_COURSES.filter(c => c.id !== courseId)),

  getBatches: () => fetchJson<Batch[]>('/api/batches', undefined, INITIAL_BATCHES),
  saveBatch: (batch: Partial<Batch>) =>
    fetchJson<Batch[]>('/api/batches', { method: 'POST', body: JSON.stringify(batch) }, INITIAL_BATCHES),
  toggleBatchStatus: (batchId: string) =>
    fetchJson<Batch[]>('/api/batches/toggle', { method: 'POST', body: JSON.stringify({ batchId }) }, INITIAL_BATCHES),
  deleteBatch: (batchId: string) =>
    fetchJson<Batch[]>(`/api/batches/${batchId}`, { method: 'DELETE' }, INITIAL_BATCHES.filter(b => b.id !== batchId)),

  getLiveClasses: () => fetchJson<LiveClass[]>('/api/live-classes', undefined, INITIAL_LIVE_CLASSES),
  addLiveClass: (live: Partial<LiveClass>) =>
    fetchJson<LiveClass[]>('/api/live-classes', { method: 'POST', body: JSON.stringify(live) }, INITIAL_LIVE_CLASSES),
  createLiveClass: (live: Partial<LiveClass>) =>
    fetchJson<LiveClass[]>('/api/live-classes', { method: 'POST', body: JSON.stringify(live) }, INITIAL_LIVE_CLASSES),
  deleteLiveClass: (liveId: string) =>
    fetchJson<LiveClass[]>(`/api/live-classes/${liveId}`, { method: 'DELETE' }, INITIAL_LIVE_CLASSES.filter(l => l.id !== liveId)),

  getRecordedClasses: () => fetchJson<RecordedClass[]>('/api/recorded-classes', undefined, INITIAL_RECORDED_CLASSES),
  addRecordedClass: (rec: Partial<RecordedClass>) =>
    fetchJson<RecordedClass[]>('/api/recorded-classes', { method: 'POST', body: JSON.stringify(rec) }, INITIAL_RECORDED_CLASSES),
  deleteRecordedClass: (recId: string) =>
    fetchJson<RecordedClass[]>(`/api/recorded-classes/${recId}`, { method: 'DELETE' }, INITIAL_RECORDED_CLASSES.filter(r => r.id !== recId)),

  getStudyMaterials: () => fetchJson<StudyMaterial[]>('/api/study-materials', undefined, INITIAL_STUDY_MATERIALS),
  addStudyMaterial: (mat: Partial<StudyMaterial>) =>
    fetchJson<StudyMaterial[]>('/api/study-materials', { method: 'POST', body: JSON.stringify(mat) }, INITIAL_STUDY_MATERIALS),
  deleteStudyMaterial: (matId: string) =>
    fetchJson<StudyMaterial[]>(`/api/study-materials/${matId}`, { method: 'DELETE' }, INITIAL_STUDY_MATERIALS.filter(m => m.id !== matId)),

  // Exams
  getExams: () => fetchJson<Exam[]>('/api/exams', undefined, INITIAL_EXAMS),
  saveExam: (exam: Partial<Exam>) =>
    fetchJson<Exam[]>('/api/exams', { method: 'POST', body: JSON.stringify(exam) }, INITIAL_EXAMS),
  toggleExamStatus: (examId: string) =>
    fetchJson<Exam[]>('/api/exams/toggle', { method: 'POST', body: JSON.stringify({ examId }) }, INITIAL_EXAMS),
  deleteExam: (examId: string) =>
    fetchJson<Exam[]>(`/api/exams/${examId}`, { method: 'DELETE' }, INITIAL_EXAMS.filter(e => e.id !== examId)),
  duplicateExam: (examId: string) =>
    fetchJson<Exam>(`/api/exams/${examId}/duplicate`, { method: 'POST' }),
  submitExam: (data: { examId: string; studentId: string; studentName: string; answers: Record<string, any> }) =>
    fetchJson<{ success: boolean; attempt: ExamAttempt }>('/api/exams/submit', { method: 'POST', body: JSON.stringify(data) }),
  getExamAttempts: (studentId: string) => fetchJson<ExamAttempt[]>(`/api/exam-attempts/${studentId}`, undefined, []),
  getAllExamAttempts: (examId?: string, studentId?: string) => {
    const params = new URLSearchParams();
    if (examId) params.append('examId', examId);
    if (studentId) params.append('studentId', studentId);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return fetchJson<ExamAttempt[]>(`/api/exam-attempts${queryString}`, undefined, []);
  },

  // Assignments
  getAssignments: () => fetchJson<Assignment[]>('/api/assignments', undefined, INITIAL_ASSIGNMENTS),
  saveAssignment: (asg: Partial<Assignment>) =>
    fetchJson<Assignment[]>('/api/assignments', { method: 'POST', body: JSON.stringify(asg) }, INITIAL_ASSIGNMENTS),
  getAssignmentSubmissions: () => fetchJson<AssignmentSubmission[]>('/api/assignments/submissions', undefined, []),
  submitAssignment: (data: any) =>
    fetchJson<{ success: boolean; submission: AssignmentSubmission }>('/api/assignments/submit', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  gradeAssignment: (data: { submissionId: string; marksAwarded: number; feedback?: string }) =>
    fetchJson<{ success: boolean; submission: AssignmentSubmission; submissions: AssignmentSubmission[] }>('/api/assignments/grade', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  // Doubts / Q&A Desk
  getDoubts: (studentId?: string) => {
    const query = studentId ? `?studentId=${studentId}` : '';
    return fetchJson<StudentDoubt[]>(`/api/doubts${query}`, undefined, []);
  },
  submitDoubt: (data: Partial<StudentDoubt>) =>
    fetchJson<{ success: boolean; doubt: StudentDoubt; doubts: StudentDoubt[] }>('/api/doubts', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  replyDoubt: (doubtId: string, teacherReply: string, teacherName?: string) =>
    fetchJson<{ success: boolean; doubt: StudentDoubt; doubts: StudentDoubt[] }>(`/api/doubts/${doubtId}/reply`, {
      method: 'POST',
      body: JSON.stringify({ teacherReply, teacherName })
    }),

  getFormulas: () => fetchJson<PhysicsFormula[]>('/api/formulas', undefined, INITIAL_FORMULAS),

  validateCoupon: (code: string) =>
    fetchJson<{ valid: boolean; coupon?: any; message?: string }>('/api/coupons/validate', {
      method: 'POST',
      body: JSON.stringify({ code })
    }),

  getOrders: () => fetchJson<PaymentOrder[]>('/api/orders', undefined, INITIAL_ORDERS),
  checkoutCourse: (data: any) =>
    fetchJson<{ success: boolean; order: PaymentOrder }>('/api/orders/checkout', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  createOrder: (data: any) =>
    fetchJson<{ success: boolean; order: PaymentOrder }>('/api/orders/checkout', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  getEnquiries: () => fetchJson<ContactEnquiry[]>('/api/enquiries', undefined, INITIAL_ENQUIRIES),
  submitEnquiry: (data: { name: string; email?: string; phone: string; subject?: string; message: string }) =>
    fetchJson<{ success: boolean; enquiry: ContactEnquiry }>('/api/enquiries', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  updateEnquiryStatus: (enquiryId: string, status: string) =>
    fetchJson<ContactEnquiry[]>('/api/enquiries/update-status', {
      method: 'POST',
      body: JSON.stringify({ enquiryId, status })
    }, INITIAL_ENQUIRIES),

  getNotifications: () => fetchJson<AppNotification[]>('/api/notifications', undefined, INITIAL_NOTIFICATIONS),
  getAnnouncements: () => fetchJson<AppNotification[]>('/api/notifications', undefined, INITIAL_NOTIFICATIONS),
  sendNotification: (notif: Partial<AppNotification>) =>
    fetchJson<AppNotification[]>('/api/notifications', { method: 'POST', body: JSON.stringify(notif) }, INITIAL_NOTIFICATIONS),
  createAnnouncement: (notif: Partial<AppNotification>) =>
    fetchJson<AppNotification[]>('/api/notifications', { method: 'POST', body: JSON.stringify(notif) }, INITIAL_NOTIFICATIONS),

  getAuditLogs: () => fetchJson<AuditLog[]>('/api/audit-logs', undefined, INITIAL_AUDIT_LOGS)
};


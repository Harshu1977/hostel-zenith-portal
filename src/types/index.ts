
export type UserRole = 'student' | 'hostel_admin' | 'mess_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

export interface Student extends User {
  role: 'student';
  roomNumber: string;
  hostelBlock: string;
  qrCode: string;
  parentPhone: string;
  rollNumber: string;
}

export interface OutpassRequest {
  id: string;
  studentId: string;
  studentName: string;
  roomNumber: string;
  hostelBlock: string;
  leaveFrom: string;
  leaveTo: string;
  reason: string;
  destination: string;
  parentConsent: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  studentId?: string;
  studentName?: string;
  isAnonymous: boolean;
  status: 'pending' | 'in_progress' | 'resolved';
  createdAt: string;
  response?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  postedBy: string;
  important: boolean;
  createdAt: string;
}

export interface MessAttendance {
  id: string;
  studentId: string;
  studentName: string;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  date: string;
  attended: boolean;
}

export interface MessMenu {
  id: string;
  day: string;
  breakfast: string[];
  lunch: string[];
  dinner: string[];
}

export interface RoomChangeRequest {
  id: string;
  studentId: string;
  studentName: string;
  currentRoom: string;
  currentBlock: string;
  requestedRoom: string;
  requestedBlock: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface Visitor {
  id: string;
  studentId: string;
  studentName: string;
  visitorName: string;
  relationship: string;
  purpose: string;
  entryTime: string;
  exitTime?: string;
  status: 'checked_in' | 'checked_out';
}

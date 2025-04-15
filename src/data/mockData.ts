
import { 
  Announcement, 
  Complaint, 
  MessMenu, 
  OutpassRequest, 
  RoomChangeRequest,
  Student,
  User,
  Visitor,
  MessAttendance
} from '@/types';

export const mockUsers: User[] = [
  {
    id: "user1",
    name: "John Doe",
    email: "john.doe@college.edu",
    role: "student"
  },
  {
    id: "user2",
    name: "Sarah Wilson",
    email: "sarah.wilson@college.edu",
    role: "hostel_admin"
  },
  {
    id: "user3",
    name: "Michael Brown",
    email: "michael.brown@college.edu",
    role: "mess_admin"
  }
];

export const mockStudents: Student[] = [
  {
    id: "user1",
    name: "John Doe",
    email: "john.doe@college.edu",
    role: "student",
    roomNumber: "A-101",
    hostelBlock: "A",
    qrCode: "STUDENT1QR",
    parentPhone: "+91987654321",
    rollNumber: "CS2022001"
  },
  {
    id: "user4",
    name: "Emily Johnson",
    email: "emily.johnson@college.edu",
    role: "student",
    roomNumber: "B-203",
    hostelBlock: "B",
    qrCode: "STUDENT2QR",
    parentPhone: "+91987654322",
    rollNumber: "CS2022045"
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: "ann1",
    title: "Campus Maintenance Notice",
    content: "The water supply will be temporarily cut off in all hostels on Sunday from 10 AM to 2 PM due to maintenance work.",
    postedBy: "Hostel Administration",
    important: true,
    createdAt: "2025-04-10T09:00:00Z"
  },
  {
    id: "ann2",
    title: "Cultural Fest Announcement",
    content: "The annual cultural fest will be held from April 25-27. All students are invited to participate.",
    postedBy: "Student Council",
    important: false,
    createdAt: "2025-04-09T14:30:00Z"
  },
  {
    id: "ann3",
    title: "New Gym Equipment",
    content: "New gym equipment has been installed in the hostel gym. Please follow the usage guidelines posted in the gym area.",
    postedBy: "Hostel Administration",
    important: false,
    createdAt: "2025-04-08T11:15:00Z"
  }
];

export const mockComplaints: Complaint[] = [
  {
    id: "comp1",
    title: "Water Leakage in Room",
    description: "There is water leaking from the ceiling in my room, especially when it rains.",
    category: "Maintenance",
    studentId: "user1",
    studentName: "John Doe",
    isAnonymous: false,
    status: "in_progress",
    createdAt: "2025-04-05T08:20:00Z",
    response: "Maintenance team has been notified and will check your room tomorrow."
  },
  {
    id: "comp2",
    title: "Poor Wifi Connectivity",
    description: "The wifi signal in the C block is very weak and disconnects frequently.",
    category: "Network Issues",
    isAnonymous: true,
    status: "pending",
    createdAt: "2025-04-07T16:45:00Z"
  },
  {
    id: "comp3",
    title: "Broken Chair in Room",
    description: "The chair in my room is broken and needs replacement.",
    category: "Furniture",
    studentId: "user4",
    studentName: "Emily Johnson",
    isAnonymous: false,
    status: "resolved",
    createdAt: "2025-04-02T10:30:00Z",
    response: "Chair has been replaced."
  }
];

export const mockOutpassRequests: OutpassRequest[] = [
  {
    id: "out1",
    studentId: "user1",
    studentName: "John Doe",
    roomNumber: "A-101",
    hostelBlock: "A",
    leaveFrom: "2025-04-15T08:00:00Z",
    leaveTo: "2025-04-18T20:00:00Z",
    reason: "Family function",
    destination: "Mumbai",
    parentConsent: true,
    status: "pending",
    createdAt: "2025-04-12T14:20:00Z"
  },
  {
    id: "out2",
    studentId: "user4",
    studentName: "Emily Johnson",
    roomNumber: "B-203",
    hostelBlock: "B",
    leaveFrom: "2025-04-20T09:00:00Z",
    leaveTo: "2025-04-22T18:00:00Z",
    reason: "Medical appointment",
    destination: "Delhi",
    parentConsent: true,
    status: "approved",
    createdAt: "2025-04-10T09:15:00Z"
  }
];

export const mockMessMenus: MessMenu[] = [
  {
    id: "menu-mon",
    day: "Monday",
    breakfast: ["Idli", "Sambar", "Coconut Chutney", "Bread", "Butter", "Jam", "Tea/Coffee"],
    lunch: ["Rice", "Dal", "Mixed Vegetable Curry", "Curd", "Pickle", "Papad", "Salad"],
    dinner: ["Chapati", "Paneer Butter Masala", "Jeera Rice", "Green Salad", "Sweet"]
  },
  {
    id: "menu-tue",
    day: "Tuesday",
    breakfast: ["Poha", "Boiled Eggs", "Bread", "Butter", "Jam", "Tea/Coffee"],
    lunch: ["Rice", "Rajma", "Aloo Gobhi", "Curd", "Pickle", "Papad", "Salad"],
    dinner: ["Chapati", "Chicken Curry/Soya Curry", "Rice", "Raita", "Fruit"]
  },
  {
    id: "menu-wed",
    day: "Wednesday",
    breakfast: ["Upma", "Boiled Eggs", "Bread", "Butter", "Jam", "Tea/Coffee"],
    lunch: ["Rice", "Dal", "Kadhai Vegetables", "Curd", "Pickle", "Papad", "Salad"],
    dinner: ["Chapati", "Matar Paneer", "Pulao", "Raita", "Ice Cream"]
  },
  {
    id: "menu-thu",
    day: "Thursday",
    breakfast: ["Paratha", "Curd", "Bread", "Butter", "Jam", "Tea/Coffee"],
    lunch: ["Rice", "Chana Dal", "Bhindi Masala", "Curd", "Pickle", "Papad", "Salad"],
    dinner: ["Chapati", "Egg Curry/Aloo Curry", "Rice", "Raita", "Sweet"]
  },
  {
    id: "menu-fri",
    day: "Friday",
    breakfast: ["Dosa", "Sambar", "Coconut Chutney", "Bread", "Butter", "Jam", "Tea/Coffee"],
    lunch: ["Rice", "Dal", "Mixed Veg", "Curd", "Pickle", "Papad", "Salad"],
    dinner: ["Puri", "Chole", "Jeera Rice", "Raita", "Fruit"]
  },
  {
    id: "menu-sat",
    day: "Saturday",
    breakfast: ["Chole Bhature", "Bread", "Butter", "Jam", "Tea/Coffee"],
    lunch: ["Rice", "Dal Tadka", "Aloo Matar", "Curd", "Pickle", "Papad", "Salad"],
    dinner: ["Chapati", "Malai Kofta", "Pulao", "Raita", "Gulab Jamun"]
  },
  {
    id: "menu-sun",
    day: "Sunday",
    breakfast: ["Aloo Paratha", "Curd", "Bread", "Butter", "Jam", "Tea/Coffee"],
    lunch: ["Veg Biryani", "Raita", "Pickle", "Papad", "Salad"],
    dinner: ["Chapati", "Butter Chicken/Paneer Butter Masala", "Jeera Rice", "Raita", "Pastry"]
  }
];

export const mockRoomChangeRequests: RoomChangeRequest[] = [
  {
    id: "rcr1",
    studentId: "user1",
    studentName: "John Doe",
    currentRoom: "A-101",
    currentBlock: "A",
    requestedRoom: "B-205",
    requestedBlock: "B",
    reason: "Closer to classmates for group projects",
    status: "pending",
    createdAt: "2025-04-11T10:20:00Z"
  }
];

export const mockVisitors: Visitor[] = [
  {
    id: "vis1",
    studentId: "user1",
    studentName: "John Doe",
    visitorName: "Robert Doe",
    relationship: "Father",
    purpose: "Family visit",
    entryTime: "2025-04-14T11:00:00Z",
    exitTime: "2025-04-14T13:30:00Z",
    status: "checked_out"
  },
  {
    id: "vis2",
    studentId: "user4",
    studentName: "Emily Johnson",
    visitorName: "Sarah Johnson",
    relationship: "Sister",
    purpose: "Bringing study materials",
    entryTime: "2025-04-15T15:00:00Z",
    status: "checked_in"
  }
];

export const mockMessAttendance: MessAttendance[] = [
  {
    id: "att1",
    studentId: "user1",
    studentName: "John Doe",
    mealType: "breakfast",
    date: "2025-04-15",
    attended: true
  },
  {
    id: "att2",
    studentId: "user1",
    studentName: "John Doe",
    mealType: "lunch",
    date: "2025-04-15",
    attended: false
  },
  {
    id: "att3",
    studentId: "user4",
    studentName: "Emily Johnson",
    mealType: "breakfast",
    date: "2025-04-15",
    attended: true
  }
];

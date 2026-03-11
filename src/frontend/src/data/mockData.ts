import { Gender, TuitionType } from "../backend";

export interface MockTutor {
  id: string;
  name: string;
  gender: "male" | "female";
  subjects: string[];
  classes: string[];
  tuitionType: "online" | "offline" | "both";
  city: string;
  experienceYears: number;
  bio: string;
  photoUrl: string;
  isApproved: boolean;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  qualification: string;
}

export interface MockReview {
  id: string;
  tutorId: string;
  studentName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface MockStudent {
  id: string;
  name: string;
  parentName: string;
  phone: string;
  email: string;
  class: string;
  subjects: string[];
  city: string;
  tuitionType: "online" | "offline" | "both";
  preferredGender: "male" | "female" | "noPreference";
  registeredAt: string;
  status: "active" | "inactive";
}

export const TN_CITIES = [
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Trichy",
  "Salem",
  "Tirunelveli",
  "Erode",
  "Vellore",
  "Tirupur",
  "Thanjavur",
  "Kancheepuram",
  "Puducherry",
  "Dindigul",
  "Karur",
  "Namakkal",
];

export const SUBJECTS = [
  "Maths",
  "Science",
  "English",
  "Tamil",
  "Social Science",
  "Computer Science",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Geography",
  "Accountancy",
  "Commerce",
  "Economics",
];

export const CLASSES = Array.from({ length: 12 }, (_, i) => String(i + 1));

export const MOCK_TUTORS: MockTutor[] = [
  {
    id: "t1",
    name: "Rajesh Kumar",
    gender: "male",
    subjects: ["Maths", "Physics"],
    classes: ["9", "10", "11", "12"],
    tuitionType: "both",
    city: "Chennai",
    experienceYears: 8,
    bio: "B.Tech graduate from Anna University with 8 years of experience teaching Maths and Physics.",
    photoUrl: "",
    isApproved: true,
    rating: 4.9,
    reviewCount: 124,
    hourlyRate: 500,
    qualification: "B.Tech, Anna University",
  },
  {
    id: "t2",
    name: "Priya Lakshmi",
    gender: "female",
    subjects: ["Science", "Biology", "Chemistry"],
    classes: ["6", "7", "8", "9", "10"],
    tuitionType: "online",
    city: "Coimbatore",
    experienceYears: 5,
    bio: "M.Sc Biology from Bharathiar University. Passionate about making Science exciting.",
    photoUrl: "",
    isApproved: true,
    rating: 4.8,
    reviewCount: 87,
    hourlyRate: 400,
    qualification: "M.Sc Biology, Bharathiar University",
  },
  {
    id: "t3",
    name: "Arjun Sundaram",
    gender: "male",
    subjects: ["English", "Tamil", "Social Science"],
    classes: ["1", "2", "3", "4", "5", "6"],
    tuitionType: "offline",
    city: "Madurai",
    experienceYears: 10,
    bio: "Experienced primary school teacher with a decade of helping young learners.",
    photoUrl: "",
    isApproved: true,
    rating: 4.7,
    reviewCount: 203,
    hourlyRate: 350,
    qualification: "B.Ed, Madurai Kamaraj University",
  },
  {
    id: "t4",
    name: "Kavitha Rajan",
    gender: "female",
    subjects: ["Maths", "Chemistry"],
    classes: ["11", "12"],
    tuitionType: "both",
    city: "Trichy",
    experienceYears: 7,
    bio: "IIT alumna specializing in Plus Two Maths and Chemistry.",
    photoUrl: "",
    isApproved: true,
    rating: 5.0,
    reviewCount: 156,
    hourlyRate: 700,
    qualification: "B.Tech, IIT Madras",
  },
  {
    id: "t5",
    name: "Murugan Selvan",
    gender: "male",
    subjects: ["Social Science", "History", "Geography"],
    classes: ["6", "7", "8", "9", "10"],
    tuitionType: "offline",
    city: "Salem",
    experienceYears: 4,
    bio: "MA History graduate with a passion for bringing history alive through storytelling.",
    photoUrl: "",
    isApproved: true,
    rating: 4.6,
    reviewCount: 54,
    hourlyRate: 300,
    qualification: "M.A History, Periyar University",
  },
  {
    id: "t6",
    name: "Deepa Krishnamurthy",
    gender: "female",
    subjects: ["Computer Science", "Maths"],
    classes: ["9", "10", "11", "12"],
    tuitionType: "online",
    city: "Chennai",
    experienceYears: 6,
    bio: "Software engineer turned educator. B.E Computer Science from College of Engineering Guindy.",
    photoUrl: "",
    isApproved: true,
    rating: 4.9,
    reviewCount: 98,
    hourlyRate: 600,
    qualification: "B.E Computer Science, CEG Chennai",
  },
  {
    id: "t7",
    name: "Karthik Balaji",
    gender: "male",
    subjects: ["Physics", "Chemistry"],
    classes: ["11", "12"],
    tuitionType: "both",
    city: "Coimbatore",
    experienceYears: 9,
    bio: "Former NEET faculty with 9 years of experience helping students crack medical entrance exams.",
    photoUrl: "",
    isApproved: true,
    rating: 4.8,
    reviewCount: 211,
    hourlyRate: 800,
    qualification: "M.Sc Physics, PSG College",
  },
  {
    id: "t8",
    name: "Suganya Devi",
    gender: "female",
    subjects: ["English", "Geography"],
    classes: ["6", "7", "8"],
    tuitionType: "online",
    city: "Madurai",
    experienceYears: 3,
    bio: "B.Ed graduate specializing in middle school English and Geography.",
    photoUrl: "",
    isApproved: true,
    rating: 4.5,
    reviewCount: 41,
    hourlyRate: 300,
    qualification: "B.Ed, Mother Teresa University",
  },
  {
    id: "t9",
    name: "Senthil Kumar",
    gender: "male",
    subjects: ["Commerce", "Accountancy", "Economics"],
    classes: ["11", "12"],
    tuitionType: "both",
    city: "Tirunelveli",
    experienceYears: 11,
    bio: "CA Inter qualified with 11 years of teaching Commerce, Accountancy and Economics.",
    photoUrl: "",
    isApproved: true,
    rating: 4.9,
    reviewCount: 178,
    hourlyRate: 650,
    qualification: "CA Inter, ICAI",
  },
  {
    id: "t10",
    name: "Meenakshi Sundaram",
    gender: "female",
    subjects: ["Tamil", "Social Science"],
    classes: ["1", "2", "3", "4", "5", "6", "7", "8"],
    tuitionType: "offline",
    city: "Erode",
    experienceYears: 8,
    bio: "M.A Tamil Literature graduate with deep passion for Tamil language and culture.",
    photoUrl: "",
    isApproved: true,
    rating: 4.7,
    reviewCount: 93,
    hourlyRate: 350,
    qualification: "M.A Tamil Literature, Bharathidasan University",
  },
  {
    id: "t11",
    name: "Vijay Anand",
    gender: "male",
    subjects: ["Maths", "Science"],
    classes: ["3", "4", "5", "6", "7", "8"],
    tuitionType: "both",
    city: "Vellore",
    experienceYears: 5,
    bio: "B.Sc Maths graduate from VIT Vellore. Specializes in building strong maths foundations.",
    photoUrl: "",
    isApproved: true,
    rating: 4.6,
    reviewCount: 67,
    hourlyRate: 400,
    qualification: "B.Sc Mathematics, VIT University",
  },
  {
    id: "t12",
    name: "Anitha Prabhu",
    gender: "female",
    subjects: ["Biology", "Chemistry", "Science"],
    classes: ["9", "10", "11", "12"],
    tuitionType: "online",
    city: "Tirupur",
    experienceYears: 7,
    bio: "MBBS graduate turned educator. Expert in Biology and Chemistry for NEET preparation.",
    photoUrl: "",
    isApproved: true,
    rating: 4.9,
    reviewCount: 145,
    hourlyRate: 750,
    qualification: "MBBS, Coimbatore Medical College",
  },
];

export const MOCK_STUDENTS: MockStudent[] = [
  {
    id: "s1",
    name: "Arun Prakash",
    parentName: "Prakash Raman",
    phone: "+91 98401 12345",
    email: "arun.prakash@gmail.com",
    class: "10",
    subjects: ["Maths", "Physics"],
    city: "Chennai",
    tuitionType: "online",
    preferredGender: "noPreference",
    registeredAt: "2026-01-15",
    status: "active",
  },
  {
    id: "s2",
    name: "Nivetha Suresh",
    parentName: "Suresh Kumar",
    phone: "+91 94455 67890",
    email: "nivetha.s@gmail.com",
    class: "12",
    subjects: ["Chemistry", "Biology"],
    city: "Coimbatore",
    tuitionType: "both",
    preferredGender: "female",
    registeredAt: "2026-01-20",
    status: "active",
  },
  {
    id: "s3",
    name: "Dharani Krishnan",
    parentName: "Krishnan Murugan",
    phone: "+91 87654 32109",
    email: "dharani.k@gmail.com",
    class: "8",
    subjects: ["English", "Tamil", "Social Science"],
    city: "Madurai",
    tuitionType: "offline",
    preferredGender: "noPreference",
    registeredAt: "2026-01-25",
    status: "active",
  },
  {
    id: "s4",
    name: "Ravi Shankar",
    parentName: "Shankar Pillai",
    phone: "+91 99887 65432",
    email: "ravi.shankar@gmail.com",
    class: "11",
    subjects: ["Maths", "Computer Science"],
    city: "Trichy",
    tuitionType: "online",
    preferredGender: "male",
    registeredAt: "2026-02-01",
    status: "active",
  },
  {
    id: "s5",
    name: "Lavanya Mohan",
    parentName: "Mohan Das",
    phone: "+91 76543 21098",
    email: "lavanya.m@gmail.com",
    class: "9",
    subjects: ["Science", "Maths"],
    city: "Salem",
    tuitionType: "offline",
    preferredGender: "female",
    registeredAt: "2026-02-05",
    status: "active",
  },
  {
    id: "s6",
    name: "Karthikeyan Raja",
    parentName: "Raja Murugesan",
    phone: "+91 90123 45678",
    email: "karthik.raja@gmail.com",
    class: "6",
    subjects: ["Tamil", "Social Science"],
    city: "Tirunelveli",
    tuitionType: "offline",
    preferredGender: "noPreference",
    registeredAt: "2026-02-10",
    status: "active",
  },
  {
    id: "s7",
    name: "Preethi Balan",
    parentName: "Balan Natarajan",
    phone: "+91 91234 56789",
    email: "preethi.b@gmail.com",
    class: "12",
    subjects: ["Physics", "Chemistry", "Maths"],
    city: "Erode",
    tuitionType: "both",
    preferredGender: "noPreference",
    registeredAt: "2026-02-14",
    status: "active",
  },
  {
    id: "s8",
    name: "Suresh Venkat",
    parentName: "Venkat Raman",
    phone: "+91 92345 67890",
    email: "suresh.v@gmail.com",
    class: "4",
    subjects: ["English", "Maths"],
    city: "Vellore",
    tuitionType: "online",
    preferredGender: "noPreference",
    registeredAt: "2026-02-18",
    status: "inactive",
  },
  {
    id: "s9",
    name: "Ananya Srinivasan",
    parentName: "Srinivasan Rao",
    phone: "+91 93456 78901",
    email: "ananya.s@gmail.com",
    class: "11",
    subjects: ["Commerce", "Accountancy", "Economics"],
    city: "Chennai",
    tuitionType: "both",
    preferredGender: "female",
    registeredAt: "2026-02-22",
    status: "active",
  },
  {
    id: "s10",
    name: "Vikram Suba",
    parentName: "Suba Ramachandran",
    phone: "+91 94567 89012",
    email: "vikram.suba@gmail.com",
    class: "7",
    subjects: ["Maths", "Science", "English"],
    city: "Coimbatore",
    tuitionType: "offline",
    preferredGender: "male",
    registeredAt: "2026-03-01",
    status: "active",
  },
  {
    id: "s11",
    name: "Divya Selvam",
    parentName: "Selvam Pandian",
    phone: "+91 95678 90123",
    email: "divya.selvam@gmail.com",
    class: "10",
    subjects: ["Biology", "Chemistry"],
    city: "Madurai",
    tuitionType: "online",
    preferredGender: "female",
    registeredAt: "2026-03-05",
    status: "active",
  },
  {
    id: "s12",
    name: "Ganesh Prabhu",
    parentName: "Prabhu Sekaran",
    phone: "+91 96789 01234",
    email: "ganesh.p@gmail.com",
    class: "5",
    subjects: ["Tamil", "English"],
    city: "Thanjavur",
    tuitionType: "offline",
    preferredGender: "noPreference",
    registeredAt: "2026-03-08",
    status: "active",
  },
];

export const MOCK_REVIEWS: MockReview[] = [
  {
    id: "r1",
    tutorId: "t1",
    studentName: "Arun Prakash",
    rating: 5,
    comment:
      "Rajesh sir explains Maths concepts very clearly. My son scored 98/100 in his board exam!",
    date: "Mar 2026",
  },
  {
    id: "r2",
    tutorId: "t1",
    studentName: "Nivetha S",
    rating: 5,
    comment:
      "Excellent teacher. Very patient and thorough. Highly recommended for Class 10 Maths.",
    date: "Feb 2026",
  },
  {
    id: "r3",
    tutorId: "t1",
    studentName: "Dharani K",
    rating: 5,
    comment:
      "Best Maths tutor in Chennai. My daughter loves his teaching style.",
    date: "Jan 2026",
  },
  {
    id: "r4",
    tutorId: "t2",
    studentName: "Ravi Kumar",
    rating: 5,
    comment:
      "Priya ma'am makes Science very interesting. My son went from 60% to 92% in Science!",
    date: "Mar 2026",
  },
  {
    id: "r5",
    tutorId: "t2",
    studentName: "Lakshmi R",
    rating: 5,
    comment:
      "Wonderful online tutor. She uses visual aids and experiments to explain concepts.",
    date: "Feb 2026",
  },
  {
    id: "r6",
    tutorId: "t2",
    studentName: "Suresh M",
    rating: 4,
    comment:
      "Very knowledgeable and caring. My daughter improved a lot in Biology under her guidance.",
    date: "Jan 2026",
  },
  {
    id: "r7",
    tutorId: "t3",
    studentName: "Preethi J",
    rating: 5,
    comment:
      "Arjun sir is amazing with young kids. My son loves going for his Tamil classes.",
    date: "Mar 2026",
  },
  {
    id: "r8",
    tutorId: "t3",
    studentName: "Balu K",
    rating: 5,
    comment:
      "Very patient and nurturing. Excellent for primary school children.",
    date: "Feb 2026",
  },
  {
    id: "r9",
    tutorId: "t4",
    studentName: "Meena S",
    rating: 5,
    comment:
      "Kavitha ma'am is phenomenal. NEET preparation was excellent. My daughter got 650+!",
    date: "Mar 2026",
  },
  {
    id: "r10",
    tutorId: "t4",
    studentName: "Ganesh V",
    rating: 5,
    comment:
      "Best Plus Two Maths tutor. 100/100 in board exams because of her teaching.",
    date: "Feb 2026",
  },
  {
    id: "r11",
    tutorId: "t6",
    studentName: "Kavi T",
    rating: 5,
    comment:
      "Deepa ma'am teaches Computer Science with real examples. Very helpful for practical exams.",
    date: "Mar 2026",
  },
  {
    id: "r12",
    tutorId: "t6",
    studentName: "Hari P",
    rating: 5,
    comment:
      "Excellent online classes. She explains programming concepts step by step.",
    date: "Feb 2026",
  },
  {
    id: "r13",
    tutorId: "t7",
    studentName: "Vijaya M",
    rating: 5,
    comment:
      "Karthik sir helped my son crack NEET Physics. Best investment we ever made.",
    date: "Mar 2026",
  },
  {
    id: "r14",
    tutorId: "t7",
    studentName: "Sathya R",
    rating: 5,
    comment: "Brilliant teacher. 200+ NEET qualifiers speak for themselves!",
    date: "Jan 2026",
  },
  {
    id: "r15",
    tutorId: "t9",
    studentName: "Divya S",
    rating: 5,
    comment:
      "Senthil sir is the best Commerce tutor in Tamil Nadu. My accounts score jumped from 55 to 94.",
    date: "Mar 2026",
  },
  {
    id: "r16",
    tutorId: "t12",
    studentName: "Anand B",
    rating: 5,
    comment:
      "Anitha ma'am's NEET Biology preparation is outstanding. Diagrams and explanations are superb.",
    date: "Mar 2026",
  },
];

export const MOCK_PAYMENTS = [
  {
    id: "p1",
    student: "Arun Prakash",
    tutor: "Kavitha Rajan",
    amount: 2800,
    commission: 280,
    date: "2026-03-01",
    status: "completed",
  },
  {
    id: "p2",
    student: "Nivetha S",
    tutor: "Rajesh Kumar",
    amount: 2000,
    commission: 200,
    date: "2026-03-03",
    status: "completed",
  },
  {
    id: "p3",
    student: "Dharani K",
    tutor: "Karthik Balaji",
    amount: 3200,
    commission: 320,
    date: "2026-03-05",
    status: "completed",
  },
  {
    id: "p4",
    student: "Ravi Shankar",
    tutor: "Deepa Krishnamurthy",
    amount: 2400,
    commission: 240,
    date: "2026-03-07",
    status: "pending",
  },
  {
    id: "p5",
    student: "Lavanya M",
    tutor: "Senthil Kumar",
    amount: 2600,
    commission: 260,
    date: "2026-03-08",
    status: "completed",
  },
  {
    id: "p6",
    student: "Preethi Balan",
    tutor: "Karthik Balaji",
    amount: 3200,
    commission: 320,
    date: "2026-03-09",
    status: "completed",
  },
  {
    id: "p7",
    student: "Ananya Srinivasan",
    tutor: "Senthil Kumar",
    amount: 2600,
    commission: 260,
    date: "2026-03-10",
    status: "completed",
  },
];

export const MOCK_PENDING_TUTORS = [
  {
    id: "pt1",
    name: "Suresh Babu",
    gender: "male",
    subjects: ["Maths", "Physics"],
    city: "Chennai",
    qualification: "B.Tech, Anna University",
    submittedAt: "2026-03-09",
  },
  {
    id: "pt2",
    name: "Anuradha V",
    gender: "female",
    subjects: ["English", "Tamil"],
    city: "Coimbatore",
    qualification: "M.A English, Bharathiar University",
    submittedAt: "2026-03-09",
  },
  {
    id: "pt3",
    name: "Balachandran R",
    gender: "male",
    subjects: ["Commerce", "Economics"],
    city: "Salem",
    qualification: "M.Com, Periyar University",
    submittedAt: "2026-03-10",
  },
  {
    id: "pt4",
    name: "Saranya Devi",
    gender: "female",
    subjects: ["Biology", "Chemistry"],
    city: "Madurai",
    qualification: "M.Sc Biochemistry, Madurai Kamaraj University",
    submittedAt: "2026-03-10",
  },
];

export const MOCK_CONVERSATIONS = [
  {
    id: "c1",
    participantId: "t1",
    participantName: "Rajesh Kumar",
    lastMessage: "Sure, I can schedule a trial class this Sunday at 10 AM.",
    timestamp: "10:32 AM",
    unread: 2,
    messages: [
      {
        id: "m1",
        senderId: "me",
        text: "Hello sir, I am looking for Maths tuition for my son in Class 10.",
        time: "10:20 AM",
      },
      {
        id: "m2",
        senderId: "t1",
        text: "Hello! I teach Maths and Physics for Class 9-12. Happy to help your son.",
        time: "10:25 AM",
      },
      {
        id: "m3",
        senderId: "me",
        text: "Can we schedule a trial class?",
        time: "10:28 AM",
      },
      {
        id: "m4",
        senderId: "t1",
        text: "Sure, I can schedule a trial class this Sunday at 10 AM.",
        time: "10:32 AM",
      },
    ],
  },
  {
    id: "c2",
    participantId: "t4",
    participantName: "Kavitha Rajan",
    lastMessage: "My fee is ₹700 per hour for Class 12 Maths.",
    timestamp: "Yesterday",
    unread: 0,
    messages: [
      {
        id: "m5",
        senderId: "me",
        text: "Hi Kavitha ma'am, what is your fee for Class 12 Maths?",
        time: "Yesterday 3:15 PM",
      },
      {
        id: "m6",
        senderId: "t4",
        text: "My fee is ₹700 per hour for Class 12 Maths.",
        time: "Yesterday 4:00 PM",
      },
    ],
  },
  {
    id: "c3",
    participantId: "t7",
    participantName: "Karthik Balaji",
    lastMessage: "I have a batch starting next Monday for NEET Physics.",
    timestamp: "Mar 8",
    unread: 0,
    messages: [
      {
        id: "m7",
        senderId: "t7",
        text: "I have a batch starting next Monday for NEET Physics.",
        time: "Mar 8 9:00 AM",
      },
    ],
  },
];

export function getGenderLabel(gender: Gender | string): string {
  if (gender === Gender.male || gender === "male") return "Male";
  if (gender === Gender.female || gender === "female") return "Female";
  if (gender === Gender.noPreference || gender === "noPreference")
    return "No Preference";
  return "Other";
}

export function getTuitionTypeLabel(type: TuitionType | string): string {
  if (type === TuitionType.online || type === "online") return "Online";
  if (type === TuitionType.offline || type === "offline") return "Home Tuition";
  return "Online & Home";
}

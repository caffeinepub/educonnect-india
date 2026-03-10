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
    bio: "B.Tech graduate from Anna University with 8 years of experience teaching Maths and Physics. Specialized in making complex concepts simple and helping students crack board exams and competitive tests.",
    photoUrl: "",
    isApproved: true,
    rating: 4.9,
    reviewCount: 124,
    hourlyRate: 500,
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
    bio: "M.Sc Biology from Bharathiar University. Passionate about making Science exciting for students through experiments and visual learning. Students consistently score above 90% under my guidance.",
    photoUrl: "",
    isApproved: true,
    rating: 4.8,
    reviewCount: 87,
    hourlyRate: 400,
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
    bio: "Experienced primary school teacher with a decade of helping young learners build strong foundations in English and Tamil. Patient, caring approach with activity-based teaching.",
    photoUrl: "",
    isApproved: true,
    rating: 4.7,
    reviewCount: 203,
    hourlyRate: 350,
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
    bio: "IIT alumna specializing in Plus Two Maths and Chemistry. Expert in NEET and JEE preparation. 95% of my students have scored distinction in board exams over the past 5 years.",
    photoUrl: "",
    isApproved: true,
    rating: 5.0,
    reviewCount: 156,
    hourlyRate: 700,
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
    bio: "MA History graduate with a passion for bringing history alive through storytelling. Students find my classes engaging and retain facts effectively for exams.",
    photoUrl: "",
    isApproved: true,
    rating: 4.6,
    reviewCount: 54,
    hourlyRate: 300,
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
    bio: "Software engineer turned educator. B.E Computer Science from College of Engineering Guindy. Teaches CS and Maths with a practical, hands-on approach. Specializes in Class 12 Computer Science board preparation.",
    photoUrl: "",
    isApproved: true,
    rating: 4.9,
    reviewCount: 98,
    hourlyRate: 600,
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
    bio: "Former NEET faculty with 9 years of experience helping students crack medical entrance exams. Highly experienced in Physics and Chemistry for Plus Two. Proven track record with 200+ NEET qualifiers.",
    photoUrl: "",
    isApproved: true,
    rating: 4.8,
    reviewCount: 211,
    hourlyRate: 800,
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
    bio: "B.Ed graduate specializing in middle school English and Geography. Interactive teaching methods with worksheets, maps, and vocabulary games that make learning enjoyable.",
    photoUrl: "",
    isApproved: true,
    rating: 4.5,
    reviewCount: 41,
    hourlyRate: 300,
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
    bio: "CA Inter qualified with 11 years of teaching Commerce, Accountancy and Economics. Highly specialized in Plus Two Commerce stream. Students regularly top district and state exams.",
    photoUrl: "",
    isApproved: true,
    rating: 4.9,
    reviewCount: 178,
    hourlyRate: 650,
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
    bio: "M.A Tamil Literature graduate with deep passion for Tamil language and culture. Experienced in teaching Tamil grammar, poetry, and prose for classes 1-8. Nurturing and patient with young learners.",
    photoUrl: "",
    isApproved: true,
    rating: 4.7,
    reviewCount: 93,
    hourlyRate: 350,
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
    bio: "B.Sc Maths graduate from VIT Vellore. Specializes in building strong maths foundations for primary and middle school students. Fun, gamified approach to problem solving.",
    photoUrl: "",
    isApproved: true,
    rating: 4.6,
    reviewCount: 67,
    hourlyRate: 400,
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
    bio: "MBBS graduate turned educator. Expert in Biology and Chemistry for secondary and higher secondary levels. Specializes in NEET Biology preparation with diagram-focused teaching methodology.",
    photoUrl: "",
    isApproved: true,
    rating: 4.9,
    reviewCount: 145,
    hourlyRate: 750,
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
];

export const MOCK_PENDING_TUTORS = [
  {
    id: "pt1",
    name: "Suresh Babu",
    gender: "male",
    subjects: ["Maths", "Physics"],
    city: "Chennai",
    submittedAt: "2026-03-09",
  },
  {
    id: "pt2",
    name: "Anuradha V",
    gender: "female",
    subjects: ["English", "Tamil"],
    city: "Coimbatore",
    submittedAt: "2026-03-09",
  },
  {
    id: "pt3",
    name: "Balachandran R",
    gender: "male",
    subjects: ["Commerce", "Economics"],
    city: "Salem",
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

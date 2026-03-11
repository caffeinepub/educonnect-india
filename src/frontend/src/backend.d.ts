import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PaymentRequest {
    studentId: string;
    stripePaymentId: string;
    tutorId: string;
    amount: bigint;
}
export interface Message {
    id: bigint;
    text: string;
    receiverId: string;
    timestamp: bigint;
    senderId: string;
}
export enum Gender {
    other = "other",
    female = "female",
    male = "male",
    noPreference = "noPreference"
}
export enum TuitionType {
    both = "both",
    offline = "offline",
    online = "online"
}
export enum ApplicationStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface TutorApplication {
    id: bigint;
    name: string;
    email: string;
    phone: string;
    gender: Gender;
    subjects: Array<string>;
    classes: Array<string>;
    tuitionType: TuitionType;
    city: string;
    experienceYears: bigint;
    qualification: string;
    bio: string;
    monthlyFees: bigint;
    status: ApplicationStatus;
    submittedAt: bigint;
}
export interface backendInterface {
    approveTutor(tutorId: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPayment(paymentRequest: PaymentRequest): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getMessage(messageId: bigint): Promise<Message | null>;
    getMessages(userId: string): Promise<Array<Message>>;
    isCallerAdmin(): Promise<boolean>;
    postRequirement(className: string, subject: string, city: string, tuitionType: TuitionType, preferredGender: Gender, postedBy: string): Promise<void>;
    registerTutor(id: string, name: string, gender: Gender, subjects: Array<string>, className: Array<string>, tuitionType: TuitionType, city: string, experienceYears: bigint, bio: string, photoUrl: string | null, isAdmin: boolean): Promise<void>;
    sendMessage(senderId: string, receiverId: string, text: string): Promise<void>;
    submitTutorApplication(name: string, email: string, phone: string, gender: Gender, subjects: Array<string>, classes: Array<string>, tuitionType: TuitionType, city: string, experienceYears: bigint, qualification: string, bio: string, monthlyFees: bigint): Promise<bigint>;
    getTutorApplications(): Promise<Array<TutorApplication>>;
    getApplicationById(id: bigint): Promise<TutorApplication | null>;
    updateApplicationStatus(id: bigint, status: ApplicationStatus): Promise<boolean>;
}

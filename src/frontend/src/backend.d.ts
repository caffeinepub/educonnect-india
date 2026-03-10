import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Message {
    id: bigint;
    text: string;
    receiverId: string;
    timestamp: bigint;
    senderId: string;
}
export interface PaymentRequest {
    studentId: string;
    stripePaymentId: string;
    tutorId: string;
    amount: bigint;
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
export interface backendInterface {
    approveTutor(tutorId: string): Promise<void>;
    createPayment(paymentRequest: PaymentRequest): Promise<void>;
    getMessage(messageId: bigint): Promise<Message | null>;
    getMessages(userId: string): Promise<Array<Message>>;
    postRequirement(className: string, subject: string, city: string, tuitionType: TuitionType, preferredGender: Gender, postedBy: string): Promise<void>;
    registerTutor(id: string, name: string, gender: Gender, subjects: Array<string>, className: Array<string>, tuitionType: TuitionType, city: string, experienceYears: bigint, bio: string, photoUrl: string | null, isAdmin: boolean): Promise<void>;
    sendMessage(senderId: string, receiverId: string, text: string): Promise<void>;
}

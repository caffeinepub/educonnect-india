import { useMutation, useQuery } from "@tanstack/react-query";
import type { Gender, TuitionType } from "../backend";
import { useActor } from "./useActor";

export function useGetMessages(userId: string) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["messages", userId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMessages(userId);
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useSendMessage() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      senderId: string;
      receiverId: string;
      text: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.sendMessage(data.senderId, data.receiverId, data.text);
    },
  });
}

export function useRegisterTutor() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      id: string;
      name: string;
      gender: Gender;
      subjects: string[];
      className: string[];
      tuitionType: TuitionType;
      city: string;
      experienceYears: bigint;
      bio: string;
      photoUrl: string | null;
      isAdmin: boolean;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.registerTutor(
        data.id,
        data.name,
        data.gender,
        data.subjects,
        data.className,
        data.tuitionType,
        data.city,
        data.experienceYears,
        data.bio,
        data.photoUrl,
        data.isAdmin,
      );
    },
  });
}

export function useApproveTutor() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (tutorId: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.approveTutor(tutorId);
    },
  });
}

export function usePostRequirement() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      className: string;
      subject: string;
      city: string;
      tuitionType: TuitionType;
      preferredGender: Gender;
      postedBy: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.postRequirement(
        data.className,
        data.subject,
        data.city,
        data.tuitionType,
        data.preferredGender,
        data.postedBy,
      );
    },
  });
}

export function useCreatePayment() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      studentId: string;
      tutorId: string;
      stripePaymentId: string;
      amount: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createPayment(data);
    },
  });
}

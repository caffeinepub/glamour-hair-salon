import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  stylist: string;
  service: string;
}

export function useSubmitBooking() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (data: BookingData) => {
      if (!actor) throw new Error("Not connected");
      const id = await actor.createBooking(data);
      return id;
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserData } from "../api/createUserData";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserData,
    onSuccess: () => {
      // refresh table automatically
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
    onError: (err: Error) => {
      console.error("Error creating entry:", err.message);
    },
  });
}

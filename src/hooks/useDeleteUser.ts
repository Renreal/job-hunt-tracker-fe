import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserData } from "../api/deleteUserData";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUserData(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
    onError: (err: Error) => {
      console.error("Error deleting user data:", err.message);
    },
  });
}

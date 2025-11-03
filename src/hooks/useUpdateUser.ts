import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData, type UpdateUserPayload } from "../api/updateUserData";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserPayload }) =>
      updateUserData(id, payload),
    onSuccess: () => {
      // invalidate cached user data so UI refreshes automatically
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
    onError: (err: Error) => {
      console.error("Error updating user:", err.message);
    },
  });
}

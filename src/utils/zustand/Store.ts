import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user: any) =>
          set((state: { user: any }) => ({
            user: {
              ...state.user,
              ...user,
            },
          })),
        removeUser: () =>
          set(() => ({
            user: null,
          })),
      }),
      { name: "user" }
    )
  )
);

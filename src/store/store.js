import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      usersLists: [],
      setUsersLists: (newUsers) =>
        set(() => ({
          usersLists: newUsers,
        })),

      addUser: (user) =>
        set((state) => ({
          usersLists: [user, ...state.usersLists],
        })),

      updateUser: (updatedUser) =>
        set((state) => ({
          usersLists: state.usersLists.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          ),
        })),

      deleteUser: (userId) =>
        set((state) => ({
          usersLists: state.usersLists.filter((user) => user.id !== userId),
        })),

      removeImageFromUser: (id) =>
        set((state) => ({
          usersLists: state?.usersLists?.map((user) =>
            user?.id === id ? { ...user, profile: "" } : user
          ),
        })),
    }),
    {
      name: "user-storage",
    },
    shallow
  )
);

export default useUserStore;

import { createStore } from "zustand";

type UserState = { loginUser?: string };

type UserAction = {
  setLoginUser: (user: any) => void;
};

/**
 * 当前登录用户的数据
 */
const userStore = createStore<UserState & UserAction>((set) => ({
  // state
  loginUser: undefined,
  // actions
  setLoginUser: (loginUser) => set(() => ({ loginUser })),
}));

export default userStore;

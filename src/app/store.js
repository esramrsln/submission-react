import { configureStore } from "@reduxjs/toolkit";

import auth from "../features/auth/authSlice";
import threads from "../features/threads/threadsSlice";
import threadDetail from "../features/threads/threadDetailSlice";
import leaderboard from "../features/leaderboard/leaderboardSlice";
import users from "../features/users/usersSlice";

// bikin store utama aplikasi
const store = configureStore({
  reducer: {
    auth,
    threads,
    threadDetail,
    leaderboard,
    users,
  },
});

export default store;

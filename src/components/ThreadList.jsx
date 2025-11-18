// ThreadList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchThreads } from "../features/threads/threadsSlice";
import { fetchUsers } from "../features/users/usersSlice";
import ThreadItem from "./ThreadItem";
import Loading from "./Loading";

export default function ThreadList() {
  const dispatch = useDispatch();

  const { items: threads, status: threadsStatus } = useSelector(
    (state) => state.threads
  );

  const { items: users, status: usersStatus } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (threadsStatus === "idle") dispatch(fetchThreads());
    if (usersStatus === "idle") dispatch(fetchUsers());
  }, [dispatch, threadsStatus, usersStatus]);

  if (threadsStatus === "loading" || usersStatus === "loading")
    return <Loading />;

  const withOwner = threads.map((t) => ({
    ...t,
    owner: users.find((u) => u.id === t.ownerId),
  }));

  return (
    <section className="thread-list">
      {withOwner.length === 0 ? (
        <p className="empty-state">Belum ada thread. Jadilah yang pertama!</p>
      ) : (
        withOwner.map((t) => <ThreadItem key={t.id} thread={t} />)
      )}
    </section>
  );
}

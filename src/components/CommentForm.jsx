import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../features/threads/threadDetailSlice";

export default function CommentForm({ threadId }) {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleComment = async (event) => {
    event.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) return;

    await dispatch(createComment({ threadId, content: trimmed }));
    setText("");
  };

  return (
    <form onSubmit={handleComment} className="form-grid comment-form">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tulis komentar..."
        className="input-control"
        rows={4}
      />
      <button type="submit" className="btn btn-primary">
        Kirim
      </button>
    </form>
  );
}

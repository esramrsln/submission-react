// ThreadItem.jsx
import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";

dayjs.extend(relativeTime);
dayjs.locale("id");

export default function ThreadItem({ thread }) {
  const preview =
    thread.body.length > 160
      ? thread.body.slice(0, 160) + "..."
      : thread.body;

  return (
    <article className="thread-item">
      <div className="thread-item__head">
        <h3>
          <Link to={`/threads/${thread.id}`}>{thread.title}</Link>
        </h3>
        {thread.category && (
          <span className="pill">{thread.category}</span>
        )}
      </div>

      <div className="thread-item__body" dangerouslySetInnerHTML={{ __html: preview }} />

      <div className="thread-meta">
        <span className="author">{thread.owner?.name ?? "Unknown"}</span>
        <span>{dayjs(thread.createdAt).fromNow()}</span>
        <span>{thread.totalComments ?? 0} komentar</span>
      </div>
    </article>
  );
}

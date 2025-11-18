// ThreadDetail.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchThreadDetail } from "../features/threads/threadDetailSlice";
import Loading from "./Loading";
import CommentForm from "./CommentForm";
import dayjs from "dayjs";

export default function ThreadDetail() {
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const { item, status } = useSelector((state) => state.threadDetail);

  useEffect(() => {
    if (threadId) {
      dispatch(fetchThreadDetail(threadId));
    }
  }, [dispatch, threadId]);

  if (status === "loading" || !item) return <Loading />;

  return (
    <article className="thread-detail">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{item.category || "Thread"}</p>
          <h1>{item.title}</h1>
        </div>
      </div>

      <div className="thread-owner">
        <span className="avatar-ring">
          <img src={item.owner?.avatar} alt={item.owner?.name} />
        </span>
        <div>
          <strong>{item.owner?.name}</strong>
          <p className="meta">
            {dayjs(item.createdAt).format("DD MMM YYYY • HH:mm")}
          </p>
        </div>
      </div>

      <div
        className="thread-detail__body"
        dangerouslySetInnerHTML={{ __html: item.body }}
      />

      <section className="comments-section">
        <h3>Komentar</h3>

        {item.comments?.length ? (
          <div className="comment-list">
            {item.comments.map((c) => (
              <div key={c.id} className="comment-item">
                <span className="avatar-ring sm">
                  <img src={c.owner?.avatar} alt={c.owner?.name} />
                </span>
                <div className="comment-content">
                  <p dangerouslySetInnerHTML={{ __html: c.content }} />
                  <small className="meta">
                    {c.owner?.name} • {dayjs(c.createdAt).fromNow()}
                  </small>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">Belum ada komentar.</p>
        )}

        <CommentForm threadId={item.id} />
      </section>
    </article>
  );
}

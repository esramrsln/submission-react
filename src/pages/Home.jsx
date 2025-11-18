import React from "react";
import CreateThreadForm from "../components/CreateThreadForm";
import ThreadList from "../components/ThreadList";

export default function Home() {
  return (
    <main className="container page-card home-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Dicoding Community</p>
          <h1>Forum Diskusi</h1>
          <p className="subhead">
            Berbagi cerita, tanyakan insight, dan bantu member lain berkembang.
          </p>
        </div>
      </div>

      <section className="sub-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Mulai Diskusi</p>
            <h2>Buat Thread Baru</h2>
          </div>
          <p className="section-text">
            Bagikan ide atau pertanyaanmu, biarkan komunitas membantu.
          </p>
        </div>
        <CreateThreadForm />
      </section>

      <section className="sub-card thread-feed">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Terbaru</p>
            <h2>Thread Komunitas</h2>
          </div>
          <p className="section-text">
            Ikuti percakapan yang sedang hangat dan temukan inspirasi baru.
          </p>
        </div>
        <ThreadList />
      </section>
    </main>
  );
}

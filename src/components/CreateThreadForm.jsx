import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createThread } from "../features/threads/threadsSlice";

export default function CreateThreadForm() {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [kategori, setKategori] = useState("");

  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);

  const onSubmitThread = async (event) => {
    event.preventDefault();

    if (!judul.trim() || !isi.trim()) {
      alert("Judul dan isi harus diisi");
      return;
    }

    if (!authToken) {
      alert("Silakan login terlebih dahulu");
      return;
    }

    await dispatch(createThread({ title: judul, body: isi, category: kategori }));

    setJudul("");
    setIsi("");
    setKategori("");
  };

  return (
    <form onSubmit={onSubmitThread} className="form-grid thread-form">
      <input
        type="text"
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
        placeholder="Judul thread"
        className="input-control"
      />

      <textarea
        value={isi}
        onChange={(e) => setIsi(e.target.value)}
        placeholder="Isi thread..."
        rows={5}
        className="input-control"
      />

      <input
        type="text"
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
        placeholder="Kategori (opsional)"
        className="input-control"
      />

      <button type="submit" className="btn btn-primary">
        Buat Thread
      </button>
    </form>
  );
}

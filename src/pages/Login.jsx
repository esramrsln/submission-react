import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, fetchMe } from "../features/auth/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser({ email, password }));
      if (result.meta.requestStatus === "fulfilled") {
        await dispatch(fetchMe());
        navigate("/");
      } else {
        alert(result.payload?.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="container page-card auth-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Selamat datang kembali</p>
          <h2>Login</h2>
          <p className="subhead">Masuk untuk melanjutkan diskusi dengan komunitas.</p>
        </div>
      </div>

      <form onSubmit={submit} className="form-grid auth-form">
        <label className="input-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input-control"
          type="email"
        />

        <label className="input-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="input-control"
        />

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </main>
  );
}

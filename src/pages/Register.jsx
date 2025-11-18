import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../features/auth/authSlice";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(registerUser(data));
      if (result.meta.requestStatus === "fulfilled") {
        alert("Register success. Please login.");
        navigate("/login");
      } else {
        alert(result.payload?.message || "Register failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="container page-card auth-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Pengguna baru</p>
          <h1>Register</h1>
          <p className="subhead">
            Buat akun untuk mulai membuat thread dan berkolaborasi.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form-grid auth-form">
        <label className="input-label" htmlFor="name">
          Nama Lengkap
        </label>
        <input
          id="name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
          })}
          placeholder="Nama lengkapmu"
          className="input-control"
        />
        {errors.name && <p className="error-text">{errors.name.message}</p>}

        <label className="input-label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          placeholder="email@dicoding.com"
          className="input-control"
        />
        {errors.email && <p className="error-text">{errors.email.message}</p>}

        <label className="input-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          placeholder="Minimal 6 karakter"
          type="password"
          className="input-control"
        />
        {errors.password && (
          <p className="error-text">{errors.password.message}</p>
        )}

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </main>
  );
}

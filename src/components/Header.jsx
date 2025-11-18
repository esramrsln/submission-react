// Header.jsx
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe, logout } from "../features/auth/authSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchMe());
    }
  }, [token, user, dispatch]);

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="app-header glass-panel container">
      <Link to="/" className="brand">
        Dicoding Forum
      </Link>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/leaderboard">Leaderboard</Link>

        {token ? (
          <>
            <span className="nav-identity">{user?.name || "Me"}</span>
            <button type="button" className="btn btn-ghost" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

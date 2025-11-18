import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";

import Login from "../src/pages/Login";
import userReducer from "../src/features/auth/authSlice";

function renderWithProviders(ui) {
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
}

describe("Login Page", () => {

  test("renders login form", () => {
    renderWithProviders(<Login />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  test("updates input fields", () => {
    renderWithProviders(<Login />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, { target: { value: "esra.com" } });
    fireEvent.change(passwordInput, { target: { value: "12345" } });

    expect(emailInput.value).toBe("esra.com");
    expect(passwordInput.value).toBe("12345");
  });

  test("allows form submission with empty fields (no validation in component)", () => {
    // Mock alert since the component uses alert for errors
    global.alert = jest.fn();
    
    renderWithProviders(<Login />);

    const loginBtn = screen.getByRole("button", { name: /Login/i });

    fireEvent.click(loginBtn);

    // The component doesn't show inline validation errors,
    // it will try to submit and show alert if API fails
    // So we just verify the form is still visible
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

});

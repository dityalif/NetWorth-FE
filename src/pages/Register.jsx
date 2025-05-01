import React, { useState } from "react";
import axios from "@/lib/axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // Regex untuk validasi email dan password
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passRegex = /^(?=.*\d)(?=.*[\W_]).{8,}$/;

  // Fungsi untuk menangani register
  const handleRegister = async () => {
    if (!emailRegex.test(email)) {
      alert("Invalid email format! Please enter a valid email.");
      return;
    }

    if (!passRegex.test(password)) {
      alert(
        "Invalid password! Password must be at least 8 characters long, contain at least one digit, and one special character."
      );
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    try {
      console.log("Sending request to backend...");
      const response = await axios.post(
        `/user/register?name=${encodeURIComponent(name)}&email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`
      );
      console.log("Response received:", response);

      if (response.status === 201) {
        alert("Account registered successfully!");
        // Redirect ke halaman login jika diperlukan
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="bg-background h-screen w-screen flex justify-center items-center">
      <Card className="w-96 max-w-sm">
        <CardHeader>
          <CardTitle className="text-3xl">Register</CardTitle>
          <CardDescription>
            Enter your details below to create a new account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2 pb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2 pb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2 pb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2 pb-4">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="block text-center">
          <Button onClick={handleRegister} className="w-full mb-2">
            Register
          </Button>
          <p>
            Already have an account?{" "}
            <a href="/login" className="underline">
              Login
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

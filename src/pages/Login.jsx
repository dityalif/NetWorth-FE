import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function LoginPage() {
  const [email, setEmail] = useState(""); // Menggunakan email, bukan username
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Fungsi untuk menangani login
  const handleLogin = async () => {
    try {
      console.log("Sending login request to backend...");
      const response = await axios.post(
        `/user/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      );

      console.log("Response received:", response);

      if (response.status === 200) {
        alert("Login successful!");
        // Simpan token atau data pengguna jika diperlukan
        localStorage.setItem("user", JSON.stringify(response.data.payload));

        // Arahkan ke halaman Home
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="bg-background h-screen w-screen flex justify-center items-center">
      <Card className="w-96 max-w-sm">
        <CardHeader>
          <CardTitle className="text-3xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
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
        </CardContent>
        <CardFooter className="block text-center">
          <Button onClick={handleLogin} className="w-full mb-2">
            Sign in
          </Button>
          <p>
            Don't have an account?{" "}
            <a href="/register" className="underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

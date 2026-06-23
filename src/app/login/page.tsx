"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { showToast } from "@/components/Toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        showToast("error", "Email atau password salah");
      } else {
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();

        showToast("success", "Berhasil login!");
        if (sessionData?.user?.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push("/");
        }
        router.refresh();
      }
    } catch (error) {
      showToast("error", "Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
      <div className="container-main max-w-md w-full">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h1 className="font-serif text-2xl text-center mb-2">Masuk</h1>
          <p className="text-sm text-text-secondary text-center mb-8">
            Selamat datang kembali di Aethera
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-field">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="label-field">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-4"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-text-secondary">
            Belum punya akun?{" "}
            <Link href="/register" className="text-brand font-medium hover:underline">
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

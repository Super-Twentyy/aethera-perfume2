"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { showToast } from "@/components/Toast";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        showToast("success", "Pendaftaran berhasil! Silakan masuk.");
        router.push("/login");
      } else {
        const data = await res.json();
        showToast("error", data.message || "Pendaftaran gagal");
      }
    } catch (error) {
      showToast("error", "Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
      <div className="container-main max-w-xl w-full">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h1 className="font-serif text-2xl text-center mb-2">Daftar Akun</h1>
          <p className="text-sm text-text-secondary text-center mb-8">
            Lengkapi data diri Anda untuk mempermudah proses checkout
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label-field">Nama Lengkap</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="label-field">No. Telepon / WA</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label-field">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="label-field">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="label-field">Alamat Lengkap (Untuk Pengiriman)</label>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="input-field resize-none h-24"
                placeholder="Nama jalan, RT/RW, Kelurahan, Kecamatan, Kota, Kode Pos"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-6"
            >
              {loading ? "Memproses..." : "Daftar"}
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-text-secondary">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-brand font-medium hover:underline">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

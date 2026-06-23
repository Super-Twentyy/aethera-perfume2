import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row pt-16">
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-6">
        <h2 className="font-serif text-xl font-bold text-brand mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium">Dashboard</Link>
          <Link href="/admin/products" className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium">Produk</Link>
          <Link href="/admin/orders" className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium">Pesanan</Link>
          <Link href="/admin/users" className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-sm font-medium">Pengguna</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}

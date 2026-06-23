"use client";

import { useEffect, useState } from "react";
import { formatRupiah } from "@/lib/utils";
import { showToast } from "@/components/Toast";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders);
      }
    } catch (error) {
      showToast("error", "Gagal memuat pesanan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        showToast("success", "Status berhasil diupdate");
        fetchOrders();
      } else {
        showToast("error", "Gagal update status");
      }
    } catch (error) {
      showToast("error", "Terjadi kesalahan");
    }
  };

  if (loading) return <div>Memuat...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Kelola Pesanan</h1>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="p-4 font-medium">ID</th>
                <th className="p-4 font-medium">Pelanggan</th>
                <th className="p-4 font-medium">Alamat</th>
                <th className="p-4 font-medium">Total</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="p-4 font-medium">{order.id.slice(-6)}</td>
                  <td className="p-4">
                    <p className="font-semibold">{order.customerName}</p>
                    <p className="text-gray-500 text-xs">{order.phone}</p>
                  </td>
                  <td className="p-4 max-w-xs truncate" title={order.address}>{order.address}</td>
                  <td className="p-4">{formatRupiah(order.totalAmount)}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                      className="border rounded px-2 py-1 text-sm bg-white"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="PAID">Paid</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

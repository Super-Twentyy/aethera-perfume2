import { prisma } from "@/lib/prisma";
import { formatRupiah } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CheckoutSuccessPage({ params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
  });

  if (!order) {
    notFound();
  }

  // Pesan otomatis untuk konfirmasi WA
  const waMessage = encodeURIComponent(
    `Halo Admin Aethera,\n\nSaya ingin konfirmasi pembayaran untuk pesanan saya:\n\n*ID Pesanan*: ${order.id}\n*Nama*: ${order.customerName}\n*Total*: ${formatRupiah(order.totalAmount)}\n\nSaya telah mentransfer ke rekening BCA yang tertera.`
  );

  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="container-main max-w-lg w-full">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-serif text-2xl mb-2">Pesanan Diterima!</h1>
          <p className="text-sm text-text-secondary mb-6">
            Terima kasih, <strong>{order.customerName}</strong>. Pesanan Anda dengan ID <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">{order.id.slice(-6)}</span> telah masuk ke sistem kami.
          </p>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-left mb-6">
            <h2 className="text-sm font-semibold text-blue-900 mb-2">Instruksi Pembayaran</h2>
            <p className="text-sm text-blue-800 mb-4">
              Silakan lakukan transfer sebesar <strong className="text-lg">{formatRupiah(order.totalAmount)}</strong> ke rekening berikut:
            </p>
            <div className="bg-white rounded-lg p-4 border border-blue-100 mb-4 text-center">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Bank BCA</p>
              <p className="font-mono text-2xl font-bold tracking-widest text-text-primary mb-1">1234 5678 90</p>
              <p className="text-sm text-text-secondary font-medium">a.n. Aethera Perfume</p>
            </div>
            <p className="text-xs text-blue-700 leading-relaxed text-center">
              Setelah mentransfer, harap konfirmasi melalui WhatsApp agar pesanan dapat segera kami proses.
            </p>
          </div>

          <a 
            href={`https://wa.me/6281234567890?text=${waMessage}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary w-full bg-[#25D366] hover:bg-[#1fba57] flex items-center justify-center gap-2 mb-4"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            Konfirmasi via WhatsApp
          </a>

          <Link href="/katalog" className="text-sm font-medium text-text-secondary hover:text-brand transition-colors">
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    </div>
  );
}

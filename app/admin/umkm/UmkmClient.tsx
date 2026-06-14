"use client";

import { useState } from "react";
import Icon from "../../components/Icon";
import { createUmkm, updateUmkm, deleteUmkm } from "./actions";

export default function UmkmClient({ initialData }: { initialData: any[] }) {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    namaProduk: "",
    deskripsi: "",
    namaPemilik: "",
    kontakWa: "",
    fotoUrl: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData({ namaProduk: "", deskripsi: "", namaPemilik: "", kontakWa: "", fotoUrl: "" });
    setFile(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({
      namaProduk: item.namaProduk,
      deskripsi: item.deskripsi,
      namaPemilik: item.namaPemilik,
      kontakWa: item.kontakWa,
      fotoUrl: item.fotoUrl || "",
    });
    setFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      await deleteUmkm(id);
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let finalFotoUrl = formData.fotoUrl;

      // Upload file if selected
      if (file) {
        const uploadData = new FormData();
        uploadData.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: uploadData });
        const json = await res.json();
        if (json.url) {
          finalFotoUrl = json.url;
        }
      }

      const payload = { ...formData, fotoUrl: finalFotoUrl };

      if (editingId) {
        await updateUmkm(editingId, payload);
        setData(data.map((item) => (item.id === editingId ? { ...item, ...payload } : item)));
      } else {
        await createUmkm(payload);
        // Refresh data ideally, but for now we just reload page or optimistic update
        window.location.reload();
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving data", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-6 flex justify-between items-center bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20 shadow-sm">
        <div className="relative w-64">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50" />
          <input 
            type="text" 
            placeholder="Cari UMKM..." 
            className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary"
          />
        </div>
        <button 
          onClick={handleOpenNew}
          className="bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-surface-tint transition-colors shadow-sm"
        >
          <Icon name="add" className="text-lg" /> Tambah UMKM
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-on-surface">
          <thead className="bg-surface-container-low text-on-surface-variant border-b border-outline-variant/20">
            <tr>
              <th className="px-6 py-4 font-semibold">Produk</th>
              <th className="px-6 py-4 font-semibold">Pemilik</th>
              <th className="px-6 py-4 font-semibold">Kontak WA</th>
              <th className="px-6 py-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-on-surface-variant">Belum ada data UMKM.</td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="border-b border-outline-variant/10 hover:bg-surface-container-lowest/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {item.fotoUrl ? (
                          <img src={item.fotoUrl} alt={item.namaProduk} className="w-full h-full object-cover" />
                        ) : (
                          <Icon name="inventory_2" className="text-primary/50 text-xl" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-on-background">{item.namaProduk}</p>
                        <p className="text-xs text-on-surface-variant truncate max-w-[200px]">{item.deskripsi}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{item.namaPemilik}</td>
                  <td className="px-6 py-4">
                    <span className="bg-secondary/10 text-secondary px-2.5 py-1 rounded-md text-xs font-semibold">{item.kontakWa}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleOpenEdit(item)} className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-md transition-colors">
                        <Icon name="edit" className="text-lg" />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-md transition-colors">
                        <Icon name="delete" className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center">
              <h2 className="font-serif text-xl font-bold">{editingId ? "Edit UMKM" : "Tambah UMKM"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:bg-surface-container p-1 rounded-md">
                <Icon name="close" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-grow flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5">Nama Produk</label>
                <input required type="text" value={formData.namaProduk} onChange={(e) => setFormData({...formData, namaProduk: e.target.value})} className="w-full bg-surface-container border border-outline-variant/50 rounded-lg px-4 py-2.5 focus:border-primary focus:outline-none" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-1.5">Nama Pemilik</label>
                <input required type="text" value={formData.namaPemilik} onChange={(e) => setFormData({...formData, namaPemilik: e.target.value})} className="w-full bg-surface-container border border-outline-variant/50 rounded-lg px-4 py-2.5 focus:border-primary focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5">Nomor WhatsApp (628...)</label>
                <input required type="text" value={formData.kontakWa} onChange={(e) => setFormData({...formData, kontakWa: e.target.value})} className="w-full bg-surface-container border border-outline-variant/50 rounded-lg px-4 py-2.5 focus:border-primary focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5">Deskripsi</label>
                <textarea required rows={3} value={formData.deskripsi} onChange={(e) => setFormData({...formData, deskripsi: e.target.value})} className="w-full bg-surface-container border border-outline-variant/50 rounded-lg px-4 py-2.5 focus:border-primary focus:outline-none resize-none" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5">Foto Produk (Opsional)</label>
                <div className="flex items-center gap-4">
                  {formData.fotoUrl && !file && (
                    <img src={formData.fotoUrl} alt="Preview" className="w-16 h-16 rounded-lg object-cover" />
                  )}
                  <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="text-sm" />
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-3 border-t border-outline-variant/20 pt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-bold text-on-surface-variant hover:bg-surface-container rounded-lg">
                  Batal
                </button>
                <button type="submit" disabled={isLoading} className="px-5 py-2.5 text-sm font-bold bg-primary text-on-primary rounded-lg hover:bg-surface-tint flex items-center gap-2 disabled:opacity-70">
                  {isLoading ? <Icon name="progress_activity" className="animate-spin text-lg" /> : <Icon name="save" className="text-lg" />}
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

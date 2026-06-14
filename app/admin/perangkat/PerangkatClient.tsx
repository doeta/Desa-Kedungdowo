"use client";

import { useState } from "react";
import Icon from "../../components/Icon";
import { createPerangkat, updatePerangkat, deletePerangkat } from "./actions";

export default function PerangkatClient({ initialData }: { initialData: any[] }) {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    nama: "",
    jabatan: "",
    fotoUrl: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData({ nama: "", jabatan: "", fotoUrl: "" });
    setFile(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({
      nama: item.nama,
      jabatan: item.jabatan,
      fotoUrl: item.fotoUrl || "",
    });
    setFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus perangkat desa ini?")) {
      await deletePerangkat(id);
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
        await updatePerangkat(editingId, payload);
        window.location.reload();
      } else {
        await createPerangkat(payload);
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
            placeholder="Cari Perangkat..." 
            className="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary"
          />
        </div>
        <button 
          onClick={handleOpenNew}
          className="bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-surface-tint transition-colors shadow-sm"
        >
          <Icon name="add" className="text-lg" /> Tambah Perangkat
        </button>
      </div>

      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-on-surface">
          <thead className="bg-surface-container-low text-on-surface-variant border-b border-outline-variant/20">
            <tr>
              <th className="px-6 py-4 font-semibold w-24">Foto</th>
              <th className="px-6 py-4 font-semibold">Nama & Jabatan</th>
              <th className="px-6 py-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-on-surface-variant">Belum ada data perangkat desa.</td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="border-b border-outline-variant/10 hover:bg-surface-container-lowest/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border border-outline-variant/20">
                      {item.fotoUrl ? (
                        <img src={item.fotoUrl} alt={item.nama} className="w-full h-full object-cover" />
                      ) : (
                        <Icon name="person" className="text-primary/50 text-xl" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-on-background text-base">{item.nama}</p>
                    <p className="text-xs text-on-surface-variant bg-surface-variant/50 px-2 py-0.5 rounded inline-block mt-1">{item.jabatan}</p>
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
              <h2 className="font-serif text-xl font-bold">{editingId ? "Edit Perangkat" : "Tambah Perangkat"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:bg-surface-container p-1 rounded-md">
                <Icon name="close" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-grow flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5">Nama Lengkap</label>
                <input required type="text" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} className="w-full bg-surface-container border border-outline-variant/50 rounded-lg px-4 py-2.5 focus:border-primary focus:outline-none" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-1.5">Jabatan (Misal: Kepala Desa)</label>
                <input required type="text" value={formData.jabatan} onChange={(e) => setFormData({...formData, jabatan: e.target.value})} className="w-full bg-surface-container border border-outline-variant/50 rounded-lg px-4 py-2.5 focus:border-primary focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5">Foto Profil (Opsional)</label>
                <div className="flex items-center gap-4">
                  {formData.fotoUrl && !file && (
                    <img src={formData.fotoUrl} alt="Preview" className="w-16 h-16 rounded-full object-cover border border-outline-variant/20" />
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

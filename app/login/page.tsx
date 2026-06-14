"use client";

import { useActionState } from "react";
import { login } from "./actions";
import Icon from "../components/Icon";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-container relative overflow-hidden">
      <div className="blob-green absolute -left-20 top-0 w-64 h-64" />
      <div className="blob-brown absolute right-0 bottom-0 w-96 h-96" />
      
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/20 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="admin_panel_settings" filled className="text-primary text-3xl" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-on-background">Admin Login</h1>
            <p className="text-on-surface-variant text-sm mt-1">Dashboard Pengelolaan Website Desa Kedungdowo</p>
          </div>

          <form action={formAction} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1.5">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="person" className="text-on-surface-variant/50 text-xl" />
                </div>
                <input
                  type="text"
                  name="username"
                  className="w-full bg-surface-container-low border border-outline-variant/50 text-on-surface rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="Masukkan username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="lock" className="text-on-surface-variant/50 text-xl" />
                </div>
                <input
                  type="password"
                  name="password"
                  className="w-full bg-surface-container-low border border-outline-variant/50 text-on-surface rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  placeholder="Masukkan password"
                  required
                />
              </div>
            </div>

            {state?.error && (
              <div className="bg-error/10 text-error px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                <Icon name="error" /> {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full bg-primary text-on-primary font-bold py-3 rounded-lg hover:bg-surface-tint hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {pending ? (
                <>
                  <Icon name="progress_activity" className="animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <Icon name="login" />
                  Masuk
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-secondary hover:text-primary font-semibold flex items-center justify-center gap-1">
              <Icon name="arrow_back" className="text-sm" /> Kembali ke Beranda
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

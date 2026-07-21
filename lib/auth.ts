import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET || "default_secret_key";
const key = new TextEncoder().encode(secretKey);

export type SessionPayload = {
  userId: number;
  username: string;
  role: "admin" | "superadmin";
  namaLengkap: string;
  expires: Date;
};

export async function encrypt(payload: Record<string, unknown>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
}

export async function decrypt(input: string): Promise<Record<string, unknown>> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload as Record<string, unknown>;
}

export async function createSession(user: {
  id: number;
  username: string;
  role: string;
  namaLengkap: string;
}) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({
    userId: user.id,
    username: user.username,
    role: user.role,
    namaLengkap: user.namaLengkap,
    expires: expires.toISOString(),
  });

  const cookieStore = await cookies();
  cookieStore.set("admin_session", session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (!session) return null;
  try {
    const payload = await decrypt(session);
    return {
      userId: payload.userId as number,
      username: payload.username as string,
      role: payload.role as "admin" | "superadmin",
      namaLengkap: (payload.namaLengkap as string) || "",
      expires: new Date(payload.expires as string),
    };
  } catch {
    return null;
  }
}

/**
 * Helper: pastikan user saat ini adalah superadmin.
 * Throw error jika bukan.
 */
export async function requireSuperadmin(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized: tidak ada sesi aktif.");
  }
  if (session.role !== "superadmin") {
    throw new Error("Forbidden: hanya superadmin yang bisa mengakses.");
  }
  return session;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set("admin_session", "", {
    expires: new Date(0),
    path: "/",
  });
}

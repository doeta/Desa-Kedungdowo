/**
 * Password hashing utilities menggunakan Web Crypto API.
 * Kompatibel dengan Vercel Serverless (tidak perlu bcrypt/native dependency).
 */

async function sha256(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(data));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Generate random salt (32 hex chars).
 */
function generateSalt(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Hash password dengan salt. Menggunakan HMAC-like approach: hash(salt + password).
 * Dilakukan 3 iterasi untuk sedikit memperlambat brute-force.
 */
export async function hashPassword(password: string): Promise<{ hash: string; salt: string }> {
  const salt = generateSalt();
  let hash = await sha256(salt + password);
  // Iterasi tambahan
  for (let i = 0; i < 2; i++) {
    hash = await sha256(salt + hash);
  }
  return { hash, salt };
}

/**
 * Verifikasi password terhadap hash + salt yang tersimpan di database.
 */
export async function verifyPassword(
  password: string,
  storedHash: string,
  salt: string
): Promise<boolean> {
  let hash = await sha256(salt + password);
  for (let i = 0; i < 2; i++) {
    hash = await sha256(salt + hash);
  }
  return hash === storedHash;
}

import { jwtVerify, SignJWT } from "jose";

// Note: In React, you typically use a library like js-cookie to manage cookies since 'next/headers' and 'NextRequest' won't be available.
import Cookies from "js-cookie";

const key = new TextEncoder().encode(process.env.JWT_SECRET);

export const SESSION_DURATION = 60 * 60 * 1000; // 1 hour

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 hour")
    .sign(key);
}

export async function decrypt(input) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function getSession() {
  const session = Cookies.get("session");
  console.log("Session value in getSession ", session);
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession() {
  const session = Cookies.get("session");
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + SESSION_DURATION);

  const encryptedSession = await encrypt(parsed);

  Cookies.set("session", encryptedSession, {
    expires: new Date(parsed.expires),
    secure: true,
    sameSite: "strict",
    httpOnly: false, // js-cookie does not support httpOnly
  });
}

import { jwtVerify, SignJWT } from "jose";
import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });

const key = new TextEncoder().encode(process.env.JWT_SECRET);

export const SESSION_DURATION = 60 * 60 * 100 // 1 hour

// Encrypt function
export async function encrypt(payload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1 hour")
        .sign(key)
}

// Decrypt function
export async function decrypt(input) {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    })
    return payload
}

// Get Session
export async function getSession() {
    const session = cookies.get('session')?.value;
    console.log("Session value in getSession ", session);
    if (!session) return null;
    return await decrypt(session);
}

// Update session
export async function updateSession(request) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    // Refresh the session so it does not expire
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + SESSION_DURATION);
    const res = 
}
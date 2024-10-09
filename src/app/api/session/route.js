import { getSession } from "../../../utils/session";

export async function GET() {
  const session = await getSession();

  if (session) {
    return { isAuthenticated: true };
  } else {
    return { isAuthenticated: false, status: 401 };
  }
}

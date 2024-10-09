import { useNavigate } from "react-router-dom";
import { getSession, updateSession } from "./utils/session";


export async function middleware(request) {
    const session = await getSession();
    console.log('Session: ', session);

    if (!session) {
        const navigate = useNavigate();
        navigate('/');
        return;
    }

    await updateSession(request);
}
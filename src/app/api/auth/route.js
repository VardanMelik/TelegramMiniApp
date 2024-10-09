import Cookies from "universal-cookie";
import { encrypt, SESSION_DURATION } from "../../../utils/session";
import { validateTelegramWebAppData } from "../../../utils/telegramAuth";


export async function handleTelegramAuth(initData) {
    const validationResult = validateTelegramWebAppData(initData);

    if (validationResult.validatedData) {
        console.log('Validate result: ', validationResult);
        const user = { telegramId: validationResult.user.id };
        
        // Create a new session
        const expires = new Date(Date.now() + SESSION_DURATION);
        const session = await encrypt({ user, expires });

        // Save the session I'm a cookie using js-cookie
        Cookies.set('session', session, { expires, secure: true, sameSite: 'strict' });

        return { message: 'Authentication successful' };
    } else {
        return { message: validationResult.message, status: 401 };
    }
}
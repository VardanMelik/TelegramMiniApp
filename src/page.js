
import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';


// Define the interface for user data
let UserData = {
    id: null,
    first_name: null,
    last_name: null,
    username: null,
    language_code: null,
    is_premium: null,
}

const Home = () => {
    const [userData, setUserData] = useState(null);
    console.log('Home Component ');

    useEffect( () => {
        console.log('useEffect Enter: ');
        if (WebApp.initDataUnsafe.user) {
            setUserData(WebApp.initDataUnsafe.user);
            console.log('User: ' + WebApp.initDataUnsafe.user);
            console.log('User Data: ' + userData);
        }
    }, []);

    return (
        <main className=''>
            {userData ? (
                <>
                    <h1 className='text-2x1 font-bold mb-4'>User Data</h1>
                    <ul>
                        <li>ID: {userData.id}</li>
                        <li>First Name: {userData.first_name}</li>
                        <li>Last Name:  {userData.last_name || 'N/A'}</li>
                        <li>Username:   {userData.username || 'N/A'}</li>
                        <li>Language Code: {userData.language_code}</li>
                        <li>Is Premium: {userData.is_premium ? 'Yes' : 'No'}</li>
                    </ul>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </main>
    )
}

export default Home;
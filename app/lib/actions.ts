'use server';

import { cookies } from 'next/headers';


// export  async function handleRefresh() {
//     console.log('handleRefresh called');
//     const refreshToken = await getRefreshToken();
//     const token = await fetch('http://localhost:8000/api/auth/refresh/',{
//         method: 'POST',
//         body: JSON.stringify({
//             refresh: refreshToken,
//         }),
//         headers: {
//             'Accept' : 'application/json',
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(response => response.json())
//         .then((json) => {
//             console.log('Response - Refresh:', json);
//             if (json.access) {
//                 const  cookieStore = await cookies();
//                 cookieStore.set('session_access_token', json.access, {
//                     httpOnly: true,
//                     secure: process.env.NODE_ENV === 'production',
//                     maxAge: 60 * 60, // 60 minutes
//                     path: '/',
//                 });
//                 return json.access;
//             }else{
//                 resetAuthCookies();
//             }
//     })
//     .catch((error) => {
//         console.error('Error during refresh:', error);
//         resetAuthCookies();
//     });
//     return token;
// }

export async function handleRefresh() {
    console.log('handleRefresh called');
    const refreshToken = await getRefreshToken();

    try {
        const response = await fetch('http://localhost:8000/api/auth/refresh/', {
            method: 'POST',
            body: JSON.stringify({ refresh: refreshToken }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();
        console.log('Response - Refresh:', json);

        if (json.access) {
            const cookieStore = await cookies(); 
            cookieStore.set('session_access_token', json.access, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60, // 60 minutes
                path: '/',
            });
            return json.access;
        } else {
            await resetAuthCookies();
        }
    } catch (error) {
        console.error('Error during refresh:', error);
        await resetAuthCookies();
    }

    return null;
}



export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    const cookieStore = await cookies();
    cookieStore.set('session_userId', userId,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
    });

    cookieStore.set('session_access_token', accessToken,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 , // 60 minutes 
    });
    cookieStore.set('session_refresh_token', refreshToken,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
    });
}

export async function resetAuthCookies() {
    const cookieStore = await cookies();
    cookieStore.set('session_userId', '');
    cookieStore.set('session_access_token', '');
    cookieStore.set('session_refresh_token', '');
}

//
// get userId from cookies
export async function getUserId() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('session_userId')?.value;
    return userId ?? null; // same as: userId ? userId : null
}

export async function getAccessToken() {
    const cookieStore = await cookies();
    let accessToken = cookieStore.get('session_access_token')?.value;
    if (!accessToken) {
        // If access token is not available, try to refresh it
        accessToken = await handleRefresh();
    }
    return accessToken; // same as: accessToken ? accessToken : null
}
export async function getRefreshToken() {
    const cookieStore = await cookies();
    let refreshToken = cookieStore.get('session_refresh_token')?.value;
    return refreshToken; // same as: refreshToken ? refreshToken : null
}
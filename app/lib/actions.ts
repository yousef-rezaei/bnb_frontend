'use server';

import { cookies } from 'next/headers';

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
import { UserData } from '../interfaces';

export async function getUserData(token: string): Promise<UserData> {
    try {
        const response = await fetch('https://edu.strada.one/api/user/me', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data as UserData;
    } catch (error) {
        console.error('Error getting user data:', error);
        throw error;
    }
}

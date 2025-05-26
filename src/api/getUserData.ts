export async function getUserData(token: string) {
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
        console.log(data);
    } catch (error) {
        console.error('Error sending verification code:', error);
        throw error;
    }
}

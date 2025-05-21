export async function getUserData(token: string) {
    try {
        const response = await fetch('https://edu.strada.one/api/user/me', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
        });
        console.log(response.text())
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error sending verification code:', error);
        throw error; // Пробрасываем ошибку дальше для обработки в компоненте
    }
}

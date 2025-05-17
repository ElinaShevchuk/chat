export async function sendVerificationCode(userEmail: string) {
    try {
        const response = await fetch('https://edu.strada.one/api/user', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(userEmail)
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return await response.json();
    } catch (error) {
        console.error('Ошибка при запросе:', error);
    }
}

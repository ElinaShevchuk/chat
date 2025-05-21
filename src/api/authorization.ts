export async function sendVerificationCode(userEmail: string) {
    try {
        console.log('Sending verification code to:', userEmail);
        const response = await fetch('https://edu.strada.one/api/user', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({email: userEmail})
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // const data = await response.json();
        console.log(response.text());
        // console.log('Server response:', data);
        // return data;
    } catch (error) {
        console.error('Error sending verification code:', error);
        throw error; // Пробрасываем ошибку дальше для обработки в компоненте
    }
}

"{\"email\":\"ugsearmany@gmail.com\",\"name\":\"ugsearmany@gmail.com\"}"

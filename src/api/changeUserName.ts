export async function changeUsername(newName: string) {
    try {
        const response = await fetch('https://edu.strada.one/api/user', {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: newName})
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(response.text());
    } catch (error) {
        console.error('Error sending verification code:', error);
        throw error; 
    }
}
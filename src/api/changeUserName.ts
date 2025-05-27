export async function changeUsername(newName: string, token: string) {
    const response = await fetch('https://edu.strada.one/api/user', {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({name: newName})
    }); 
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}
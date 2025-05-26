export class LocalStorageManager {
    addToLocalStorage(messages: Array<{ text: string, timestamp: string }>) {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }    
    
    getSavedMessages(): Array<{ text: string, timestamp: string }> | null {
        const savedMessages = localStorage.getItem('chatMessages');
        return savedMessages ? JSON.parse(savedMessages) : null;
    }
}


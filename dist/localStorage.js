export class LocalStorageManager {
    addToLocalStorage(messages) {
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
    getSavedMessages() {
        const savedMessages = localStorage.getItem('chatMessages');
        console.log(savedMessages);
        return savedMessages ? JSON.parse(savedMessages) : null;
    }
}

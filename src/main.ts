import { DOMHandler } from "./DOMElements.js";

class ChatApp {
    private dom: DOMHandler;
    private messages: Array<{ text: string, timestamp: string }> = [];

    constructor() {
        this.dom = new DOMHandler();
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.dom.initElements();
            this.loadMessages(); 
            this.setupEventListeners();
        });
    }

    addToLocalStorage() {
        localStorage.setItem('chatMessages', JSON.stringify(this.messages));
    }

    loadMessages() {
        const savedMessages = this.getSavedMessages();
        if (savedMessages) {
            this.messages = savedMessages;
            this.renderSavedMessages();
        }
    }

    getSavedMessages(): Array<{ text: string, timestamp: string }> | null {
        const savedMessages = localStorage.getItem('chatMessages');
        console.log(savedMessages);
        return savedMessages ? JSON.parse(savedMessages) : null;
    }

    renderSavedMessages() {
        this.messages.forEach(message => {
            const messageDOM = this.dom.createMessage(message.text, message.timestamp);
            this.dom.elements.messagesContainer?.appendChild(messageDOM);
        });
    }

    setupEventListeners() {
        const form = this.dom.elements.messageForm;
        form?.addEventListener('submit', this.handleFormSubmit.bind(this));
    }

    handleFormSubmit(event: Event) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const messageText = this.getFormMessage(form);
        
        if (messageText) {
            this.addNewMessage(messageText);
            this.renderNewMessage(messageText);
            form.reset();
        }
    }

    getFormMessage(form: HTMLFormElement): string | null {
        const formData = new FormData(form);
        return formData.get('message')?.toString().trim() || null;
    }

    addNewMessage(text: string) {
        const newMessage = {
            text: text,
            timestamp: this.getDate()
        };
        this.messages.push(newMessage);
        this.addToLocalStorage();
    }

    renderNewMessage(text: string) {
        const newMessageDOM = this.dom.createMessage(text, this.getDate());
        this.dom.elements.messagesContainer?.appendChild(newMessageDOM);
    }

    getDate(): string {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        console.log(`${hours}:${minutes}`);
        return `${hours}:${minutes}`;
    }
}

const app = new ChatApp();


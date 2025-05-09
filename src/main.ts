import { DOMHandler } from "./DOMElements.js";
import { LocalStorageManager } from "./localStorage.js";
import { Message } from "./interfaces.js";

class ChatApp {
    private dom: DOMHandler;
    private storage: LocalStorageManager;
    private messages: Array<Message> = [];

    constructor() {
        this.dom = new DOMHandler();
        this.storage = new LocalStorageManager();
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.dom.initElements();
            this.loadMessages(); 
            this.setupEventListeners();
        });
    }

    loadMessages() {
        const savedMessages = this.storage.getSavedMessages();
        if (savedMessages) {
            this.messages = savedMessages;
            this.dom.renderSavedMessages(this.messages);
        }
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
            this.dom.renderNewMessage(messageText, this.getDate());
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
        this.storage.addToLocalStorage(this.messages);
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


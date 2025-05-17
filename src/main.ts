import { DOMHandler } from "./DOMElements";
import { LocalStorageManager } from "./localStorage";
import { Message } from "./interfaces";
import { sendVerificationCode } from "./api/authorization";

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
            this.loadPopups();
            this.dom.initPopupElements();
            this.setupEventListeners();
            this.dom.openPopup('auth-popup');
        });
    }

    loadMessages() {
        const savedMessages = this.storage.getSavedMessages();
        if (savedMessages) {
            this.messages = savedMessages;
            this.dom.renderSavedMessages(this.messages);
        }
    }

    loadPopups() {
        const paths = ['/auth-popup.html', '/code-verification-popup.html', '/name-input-popup.html'];
        paths.forEach((path) => {
            fetch(path)
            .then(response => response.text())
            .then(html => {
                document.body.insertAdjacentHTML('beforeend', html);
            });
        })                    
    }

    setupEventListeners() {
        const form = this.dom.elements.messageForm;
        form?.addEventListener('submit', this.handleFormSubmit.bind(this));
        this.dom.elements.buttonSendVerificationCode?.addEventListener('click', this.handleSendVerificationCode);

    }

    handleFormSubmit(event: Event) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const messageText = this.dom.getFormMessage(form);
        
        if (messageText) {
            this.addNewMessage(messageText);
            this.dom.renderNewMessage(messageText, this.getDate());
            form.reset();
        }
    }

    handleSendVerificationCode() {
        const userEmail = this.dom.getUserEmail();
        if (userEmail) {
            sendVerificationCode(userEmail);
        }
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
        return `${hours}:${minutes}`;
    }

    checkAuth() {
        
    }
}

const app = new ChatApp();

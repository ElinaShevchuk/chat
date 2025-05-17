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

    async init() {
        document.addEventListener('DOMContentLoaded', async () => {
            this.dom.initElements();
            this.loadMessages();
            await this.loadPopups();
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

    async loadPopups() {
        const paths = ['/auth-popup.html'
            // , '/code-verification-popup.html', '/name-input-popup.html'
        ];
        for (const path of paths) {
            const response = await fetch(path);
            const popup = await response.text();
            document.body.insertAdjacentHTML('beforeend', popup);
        }
    }

    setupEventListeners() {
        const form = this.dom.elements.messageForm;
        form?.addEventListener('submit', this.handleFormSubmit.bind(this));
        console.log(this.dom.elements.buttonSendVerificationCode);
        this.dom.elements.buttonSendVerificationCode?.addEventListener('click', this.handleSendVerificationCode.bind(this));
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

    async handleSendVerificationCode() {
        const userEmail = this.dom.getUserEmail();
        console.log(userEmail);
        if (userEmail) {
            try {
                const result = await sendVerificationCode(userEmail);
                console.log('Verification code sent:', result);
                // Здесь можно добавить логику для обработки успешной отправки
            } catch (error) {
                console.error('Failed to send verification code:', error);
                // Здесь можно добавить логику для обработки ошибки
            }
        } else {
            console.error('Email is required');
            // Здесь можно добавить логику для отображения ошибки пользователю
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

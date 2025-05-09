import { DOMHandler } from "./DOMElements.js";
class ChatApp {
    constructor() {
        this.messages = [];
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
    getSavedMessages() {
        const savedMessages = localStorage.getItem('chatMessages');
        console.log(savedMessages);
        return savedMessages ? JSON.parse(savedMessages) : null;
    }
    renderSavedMessages() {
        this.messages.forEach(message => {
            var _a;
            const messageDOM = this.dom.createMessage(message.text, message.timestamp);
            (_a = this.dom.elements.messagesContainer) === null || _a === void 0 ? void 0 : _a.appendChild(messageDOM);
        });
    }
    setupEventListeners() {
        const form = this.dom.elements.messageForm;
        form === null || form === void 0 ? void 0 : form.addEventListener('submit', this.handleFormSubmit.bind(this));
    }
    handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const messageText = this.getFormMessage(form);
        if (messageText) {
            this.addNewMessage(messageText);
            this.renderNewMessage(messageText);
            form.reset();
        }
    }
    getFormMessage(form) {
        var _a;
        const formData = new FormData(form);
        return ((_a = formData.get('message')) === null || _a === void 0 ? void 0 : _a.toString().trim()) || null;
    }
    addNewMessage(text) {
        const newMessage = {
            text: text,
            timestamp: this.getDate()
        };
        this.messages.push(newMessage);
        this.addToLocalStorage();
    }
    renderNewMessage(text) {
        var _a;
        const newMessageDOM = this.dom.createMessage(text, this.getDate());
        (_a = this.dom.elements.messagesContainer) === null || _a === void 0 ? void 0 : _a.appendChild(newMessageDOM);
    }
    getDate() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        console.log(`${hours}:${minutes}`);
        return `${hours}:${minutes}`;
    }
    clearMessages() {
        localStorage.removeItem('chatMessages');
        this.messages = [];
        if (this.dom.elements.messagesContainer) {
            this.dom.elements.messagesContainer.innerHTML = '';
        }
    }
}
const app = new ChatApp();

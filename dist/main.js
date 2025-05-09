import { DOMHandler } from "./DOMElements.js";
import { LocalStorageManager } from "./localStorage.js";
class ChatApp {
    constructor() {
        this.messages = [];
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
        form === null || form === void 0 ? void 0 : form.addEventListener('submit', this.handleFormSubmit.bind(this));
    }
    handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const messageText = this.getFormMessage(form);
        if (messageText) {
            this.addNewMessage(messageText);
            this.dom.renderNewMessage(messageText, this.getDate());
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
        this.storage.addToLocalStorage(this.messages);
    }
    getDate() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        console.log(`${hours}:${minutes}`);
        return `${hours}:${minutes}`;
    }
}
const app = new ChatApp();

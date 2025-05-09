"use strict";
class DOMHandler {
    constructor() {
        this.elements = {
            messageTemplate: null,
            messageForm: null,
            messagesContainer: null,
        };
    }
    initElements() {
        this.elements.messageTemplate = document.getElementById('message-template');
        this.elements.messageForm = document.getElementById('message-form');
        this.elements.messagesContainer = document.getElementById('messages-container');
    }
    createMessage(text) {
        var _a;
        const template = (_a = this.elements.messageTemplate) === null || _a === void 0 ? void 0 : _a.content;
        const newMessage = template === null || template === void 0 ? void 0 : template.cloneNode(true);
        const messageElement = newMessage.querySelector('.text');
        messageElement.textContent = text;
        return newMessage.firstElementChild;
    }
    renderMessages() {
    }
}
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
        const savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
            this.messages = JSON.parse(savedMessages);
            this.messages.forEach(message => {
                var _a;
                const messageDOM = this.dom.createMessage(message.text);
                (_a = this.dom.elements.messagesContainer) === null || _a === void 0 ? void 0 : _a.appendChild(messageDOM);
            });
        }
    }
    setupEventListeners() {
        const form = this.dom.elements.messageForm;
        console.log(form);
        form === null || form === void 0 ? void 0 : form.addEventListener('submit', (event) => {
            var _a, _b;
            console.log(event);
            event.preventDefault();
            console.log(event);
            const formData = new FormData(form); //получаем дату
            const messageText = (_a = formData.get('message')) === null || _a === void 0 ? void 0 : _a.toString().trim();
            if (messageText) {
                const newMessage = {
                    text: messageText,
                    timestamp: Date.now() //перевести в норм формат и добавить отображение
                };
                this.messages.push(newMessage);
                this.addToLocalStorage();
                // Создаем и отображаем сообщение
                const newMessageDOM = this.dom.createMessage(messageText);
                (_b = this.dom.elements.messagesContainer) === null || _b === void 0 ? void 0 : _b.appendChild(newMessageDOM);
                // Очищаем поле ввода
                form.reset();
            }
        });
    }
}
const app = new ChatApp();

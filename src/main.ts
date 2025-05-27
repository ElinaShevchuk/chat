import { DOMHandler } from "./DOMElements";
import { LocalStorageManager } from "./localStorage";
import { Message, UserData } from "./interfaces";
import { sendVerificationCode } from "./api/authorization";
import { getUserData } from "./api/getUserData";
import { changeUsername } from "./api/changeUserName";
import { updateUserData } from "./cookies"; 
import Cookies from 'js-cookie';

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
            this.checkAuth();
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
        const paths = [
            '/auth-popup.html', 
            '/code-verification-popup.html', 
            '/name-input-popup.html',
        ];
        for (const path of paths) {
            const response = await fetch(path);
            const popup = await response.text();
            document.body.insertAdjacentHTML('beforeend', popup);
        }
    }

    setupEventListeners() {
        this.dom.elements.messageForm?.addEventListener('submit', this.handleFormSubmit.bind(this));
        this.dom.elements.codeForm?.addEventListener('submit', this.handleConfirmCodeForm.bind(this));
        this.dom.elements.usernameForm?.addEventListener('submit', this.handleUsernameUpdate.bind(this));
        this.dom.elements.buttonSendVerificationCode?.addEventListener('click', this.handleSendVerificationCode.bind(this));
        this.dom.elements.buttonEnterCode?.addEventListener('click', this.handleInputCode.bind(this));
        this.dom.elements.buttonChangeUsername?.addEventListener('click', this.toggleUsernameEditor.bind(this));
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
        if (userEmail) {
            try {
                const result = await sendVerificationCode(userEmail);
                console.log('Verification code sent:', result);
            } catch (error) {
                console.error('Failed to send verification code:', error);
            }
        } else {
            console.error('Email is required');
        }
    }

    handleInputCode() { 
        this.dom.closePopup('auth-popup');
        this.dom.openPopup('code-verification-popup');
    }

    async handleConfirmCodeForm(event: Event) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const token = this.dom.getFormMessage(form);
        if (token) {
            const userData: UserData = await getUserData(token);
            Cookies.set('userData', JSON.stringify(userData));
        }
        this.dom.closePopup("code-verification-popup");
    }

    async handleUsernameUpdate(event: Event) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formName = this.dom.getFormMessage(form);
        if (formName) {
            const token = Cookies.get('token');
            if (token) {
                const newName = await changeUsername(formName, token);
                updateUserData('name', newName.name);
                const data = JSON.parse(Cookies.get('userData') || '{}');
                console.log(data.name);
            }
        }
        this.dom.closePopup('name-input-popup');
    }

    toggleUsernameEditor() {
        this.dom.openPopup('name-input-popup');
        //добавить закрытие по нажатию на область, возможно, сделать закрытие здесь же
    }

    addNewMessage(text: string) {
        const newMessage = {
            text: text,
            timestamp: this.getDate()
        };
        this.messages.push(newMessage);
        this.storage.addToLocalStorage(this.messages);
    }

    getDate(): string { //потом переместить в утилиты В ПОМОЙКУ
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    checkAuth() {
        const data = JSON.parse(Cookies.get('userData') || '{}');
        const token = data.token;
        if (!token) {
            this.dom.openPopup('auth-popup');
        }
    }
}

const app = new ChatApp();

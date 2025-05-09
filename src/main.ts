interface DOMElements {
    messageTemplate: HTMLTemplateElement | null;
    messageForm: HTMLFormElement | null;
    messagesContainer: HTMLElement | null;
}

class DOMHandler {
    elements: DOMElements;

    constructor() {
        this.elements = {
            messageTemplate: null,
            messageForm: null,
            messagesContainer: null,
        };
    }

    initElements(): void {
        this.elements.messageTemplate = document.getElementById('message-template') as HTMLTemplateElement;
        this.elements.messageForm = document.getElementById('message-form') as HTMLFormElement;
        this.elements.messagesContainer = document.getElementById('messages-container') as HTMLElement;
    }

    createMessage(text: string): HTMLElement {
        const template = this.elements.messageTemplate?.content;
        const newMessage = template?.cloneNode(true) as DocumentFragment;
        const messageElement = newMessage.querySelector('.text') as HTMLElement;
        messageElement.textContent = text;
        return newMessage.firstElementChild as HTMLElement;
    }

    renderMessages() {

    }
}

class ChatApp {
    private dom: DOMHandler;
    private messages: Array<{ text: string, timestamp: number }> = [];

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
        const savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
            this.messages = JSON.parse(savedMessages);
            this.messages.forEach(message => {
                const messageDOM = this.dom.createMessage(message.text);
                this.dom.elements.messagesContainer?.appendChild(messageDOM);
            });
        }
    }

    setupEventListeners() {
        const form = this.dom.elements.messageForm;
        console.log(form)
        form?.addEventListener('submit', (event) => {
            console.log(event);
            event.preventDefault();
            console.log(event);
            const formData = new FormData(form); //получаем дату
            const messageText = formData.get('message')?.toString().trim();
            if (messageText) {
                const newMessage = {
                    text: messageText,
                    timestamp: Date.now() //перевести в норм формат и добавить отображение
                };
                this.messages.push(newMessage);
                this.addToLocalStorage();
                // Создаем и отображаем сообщение
                const newMessageDOM = this.dom.createMessage(messageText);
                this.dom.elements.messagesContainer?.appendChild(newMessageDOM);
                // Очищаем поле ввода
                form.reset();
            }
        }
        );
    }
}

const app = new ChatApp();

type DOMElements = {
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
        // Проверяем, что шаблон инициализирован
        if (!this.elements.messageTemplate) {
            throw new Error('Message template not initialized');
        }
        const template = this.elements.messageTemplate.content;
        const newMessage = template.cloneNode(true) as DocumentFragment;
        // Предполагаем, что в шаблоне есть элемент с классом .message-text
        const messageElement = newMessage.querySelector('.text') as HTMLElement;
        if (!messageElement) {
            throw new Error('Message text element not found in template');
        }
        // Устанавливаем текст сообщения
        messageElement.textContent = text;
        // Возвращаем первый дочерний элемент (само сообщение)
        return newMessage.firstElementChild as HTMLElement;

        //  const container = document.querySelector('.messages-container');
        //  container?.appendChild(newMessage);
    }

    renderMessages() {

    }
}

class ChatApp {
    private dom: DOMHandler;
    private messages: Array<{ text: string, timestamp: number }> = [];

    constructor() {
        this.dom = new DOMHandler();
        console.log('1')
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            console.log(2)
            this.dom.initElements();
            console.log(3)
            this.loadMessages(); // Загружаем сообщения при старте
            console.log(4)
            this.setupEventListeners();
            console.log(5)
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
                // Добавляем сообщение с timestamp
                const newMessage = {
                    text: messageText,
                    timestamp: Date.now()
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

type DOMElements = {
    messageTemplate: HTMLTemplateElement | null;
    messageForm: HTMLFormElement | null;
    messagesContainer: HTMLElement | null;
}

class DOMHandler {   
    private elements: DOMElements = {
        messageTemplate: null,
        messageForm: null,
        messagesContainer: null
    }
    initElements(): void {
        this.elements.messageTemplate = document.getElementById('message-template') as HTMLTemplateElement;
        this.elements.messageForm = document.getElementById('message-form') as HTMLFormElement;
        this.elements.messagesContainer = document.getElementById('messages-container') as HTMLElement;
    }

    getMessageForm(): HTMLFormElement {
        if (!this.elements.messageForm) {
            throw new Error('Message form not initialized');
        }
        return this.elements.messageForm;
    }

    getMessagesContainer(): HTMLElement {
        if (!this.elements.messagesContainer) {
            throw new Error('Messages container not initialized');
        }
        return this.elements.messagesContainer;
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
    private messages: Array<{text: string, timestamp: number}> = [];

    constructor() {
        this.dom = new DOMHandler();
        this.init();
    }

    private addToLocalStorage() {
        localStorage.setItem('chatMessages', JSON.stringify(this.messages));
    }

    private loadMessages() {
        const savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
            this.messages = JSON.parse(savedMessages);
            this.messages.forEach(message => {
                const messageDOM = this.dom.createMessage(message.text);
                this.dom.getMessagesContainer().appendChild(messageDOM);
            });
        }
    }

    setupEventListeners() {
        try {
            const form = this.dom.getMessageForm();
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const formData = new FormData(form); //получаем дату 
                const messageText = formData.get('message') as string;               
                if (messageText.trim()) {
                    // Добавляем сообщение с timestamp
                    const newMessage = {
                        text: messageText,
                        timestamp: Date.now()
                    };
                    this.messages.push(newMessage);
                    this.addToLocalStorage();                    
                    // Создаем и отображаем сообщение
                    const newMessageDOM = this.dom.createMessage(messageText);
                    this.dom.getMessagesContainer().appendChild(newMessageDOM);
                    // Очищаем поле ввода
                    (form.elements.namedItem('message') as HTMLInputElement).value = '';
                }
            });
        } catch (error: unknown) { 
            if (error instanceof Error) {
              console.error(error.message);
            } else {
              console.error('Неизвестная ошибка', error);
            }
        }
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.dom.initElements();
            this.loadMessages(); // Загружаем сообщения при старте
            this.setupEventListeners();
        });
    }
}
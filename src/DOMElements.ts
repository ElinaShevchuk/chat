import { Message, DOMElements } from "./interfaces";

export class DOMHandler {
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

    createMessage(text: string, time: string): HTMLElement {
        const template = this.elements.messageTemplate?.content;
        const newMessage = template?.cloneNode(true) as DocumentFragment;
        const messageElement = newMessage.querySelector('.text') as HTMLElement;
        const messageTime = newMessage.querySelector('.time') as HTMLElement;
        messageElement.textContent = text;
        messageTime.textContent = time;
        return newMessage.firstElementChild as HTMLElement;
    }

    renderNewMessage(text: string, date: string) {
        const newMessageDOM = this.createMessage(text, date);
        this.elements.messagesContainer?.appendChild(newMessageDOM);
    }

    renderSavedMessages(messages: Array<Message>) {
        messages.forEach(message => {
            const messageDOM = this.createMessage(message.text, message.timestamp);
            this.elements.messagesContainer?.appendChild(messageDOM);
        });
    }

}
export class DOMHandler {
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
    createMessage(text, time) {
        var _a;
        const template = (_a = this.elements.messageTemplate) === null || _a === void 0 ? void 0 : _a.content;
        const newMessage = template === null || template === void 0 ? void 0 : template.cloneNode(true);
        const messageElement = newMessage.querySelector('.text');
        const messageTime = newMessage.querySelector('.time');
        messageElement.textContent = text;
        messageTime.textContent = time;
        return newMessage.firstElementChild;
    }
    renderMessages() {
    }
}

export interface Message {
    text: string,
    timestamp: string,
} 

export interface DOMElements {
    messageTemplate: HTMLTemplateElement | null;
    messageForm: HTMLFormElement | null;
    messagesContainer: HTMLElement | null;
}
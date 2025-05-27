export interface Message {
    text: string,
    timestamp: string,
} 

export interface DOMElements {
    messageTemplate: HTMLTemplateElement | null;
    messageForm: HTMLFormElement | null;
    messagesContainer: HTMLElement | null;
    buttonChangeUsername: HTMLElement | null;
    inputUserEmail: HTMLInputElement | null;
    buttonSendVerificationCode: HTMLButtonElement | null;
    buttonEnterCode: HTMLButtonElement | null,
    codeForm: HTMLFormElement | null,
    usernameForm: HTMLFormElement | null,
}

export interface UserData {
    id: string, 
    name: string,
    email: string,
    token: string,
}

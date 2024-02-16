export interface Message {
    text: string;
    sender: string;
    receiver: string;
    date: string;
}

export interface Messages {
    messages: Message[];
    id: string;
}

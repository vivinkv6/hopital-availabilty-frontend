import {Connection} from "./connection";
import {toast} from "react-toastify";

export const NUM_PRE_KEYS = 10;
export const AES_KEY_LENGTH = 128;
export const AES_TAG_LENGTH = 128;
export const AES_EXTRACTABLE = true;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const libSignal = (window).libsignal;

export const KeyHelper = libSignal.KeyHelper;
export const SignalProtocolAddress = libSignal.SignalProtocolAddress;
export const SessionBuilder = libSignal.SessionBuilder;
export const SessionCipher = libSignal.SessionCipher;

export interface ChatMessage {
    type: "sent" | "received",
    content: string,
    time: string,
    seen: boolean
}

export default class SignalConnection
{
    private readonly connection: Connection;
    private readonly to: string;
    private readonly onMessage: (msg: Array<ChatMessage>) => void;
    private readonly messages: Array<ChatMessage>;

    constructor(username: string, to: string, onMessage: (msg: Array<ChatMessage>) => void)
    {
        this.to = to;
        this.onMessage = onMessage;
        this.connection = new Connection(username, this.handleMessage);
        this.messages = JSON.parse(localStorage.getItem(`messages-${this.to}`) || "[]");
    }

    getMessages ()
    {
        return this.messages
    }

    getTime = (date:any) =>
    {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    }

    handleMessage = (message: string) =>
    {
        console.debug(message);
        this.messages.push({content: message, time: this.getTime(new Date()), seen: false, type: "received"});
        this.onMessage(this.messages);

        localStorage.setItem(`messages-${this.to}`, JSON.stringify(this.messages));
    };

    async sendMessage(message: string)
    {
        await this.connection.sendMessage(this.to, message)
            .then(() =>
            {
                const msg = <ChatMessage> {content: message, time: this.getTime(new Date()), seen: false, type: "sent"};

                this.messages.push(msg);
                this.onMessage(this.messages);

                localStorage.setItem(`messages-${this.to}`, JSON.stringify(this.messages));
            })
            .catch((error) => toast.error(error, { position: "bottom-center"}));
    }
}
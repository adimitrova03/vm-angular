import { MessageType } from "../enums/message-type.enum";

export interface MessageModel {
    text: string;
    type: MessageType;
}
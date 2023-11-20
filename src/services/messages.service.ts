import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { MessageModel } from "../models/messages.model";
import { MessageType } from "../enums/message-type.enum";

@Injectable({providedIn: 'root'})

export class MessagesService {
    private initialMessage: MessageModel = {
        text: 'Hello! Add money and enter the code of the product.',
        type: MessageType.Initial
    }

    public messages: BehaviorSubject<MessageModel> = new BehaviorSubject(this.initialMessage);
    public messagesObs$: Observable<MessageModel> = this.messages.asObservable();

    constructor() {}

    setInitialMessage(): void {
        this.messages.next(this.initialMessage);
    }

    setErrorMessage(text: string): void {
        this.messages.next({
            text: text,
            type: MessageType.Error
        });
    }

    setSuccessMessage(text: string): void {
        this.messages.next({
            text: text,
            type: MessageType.Success
        });
    }
}
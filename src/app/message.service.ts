import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    // Append new message to array of messages.
    this.messages.push(message);
  }

  clear() {
    // Empty array of messages.
    this.messages = [];
  }
}

import { MessageService } from "./../message.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"]
})
export class MessagesComponent implements OnInit {
  constructor(public messageService: MessageService) {
    // Angular injects singleton MessageService into property
    // when it creates MessagesComponent.
  }

  ngOnInit() {}
}

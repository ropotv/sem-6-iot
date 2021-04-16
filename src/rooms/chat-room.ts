import { Room } from "colyseus";
import { AppConfig } from "../core";

const { maxRoomSize } = AppConfig;

export class ChatRoom extends Room {
  public readonly maxClients = maxRoomSize;

  public onCreate(options: any): void {
    this.onMessage("message", (client, message) => {
      this.broadcast("messages", `(${client.sessionId}) -> ${message}`);
    });
  }

  public onJoin(client: any): void {
    this.broadcast("messages", `${client.sessionId} joined.`);
  }

  public onLeave(client: any): void {
    this.broadcast("messages", `${client.sessionId} left.`);
  }

  public onDispose(): void {
    console.log("Dispose ChatRoom");
  }
}

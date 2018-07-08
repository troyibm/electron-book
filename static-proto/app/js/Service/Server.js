import * as ws from "nodejs-websocket";
import { Message } from "./Message";

export default class Server {
    constructor() {
        this.participants = new Map();
        this.server = ws.createServer((conn) => {
            conn.on("error", (err) => {
                console.error("Server error", err);
            });

            conn.on("close", (code, reason) => {
                console.log("Server closes a connection", code, reason);
            });

            conn.on("connection", () => {
                console.info("Server creates a connection");
            });

            conn.on("text", (text) => {
                const msg = Message.fromString(text), 
                    method = `on${msg.event}`;
                if (!this[method]) {
                    return;
                }
                this[method](msg.data, conn);
            });
        });
    }

    broadcast(event, data) {
        const text = Message.toString(event, data);
        this.server.connections.forEach(conn => {
            conn.sendText(text);
        });
    }

    connect(host, port, client) {
        client.connect(host, port).catch(() => {
            this.server.listen(port, host, () => {
                console.info("Server is ready");
                client.connect(host, port).catch(() => {
                    console.error("Client's error");
                });
            });
        });
    }

    onjoin(name, conn) {
        const datetime = new Date();
        this.participants.set(conn, {
            name: name,
            time: datetime.toString()
        });
        this.broadcast("participants", Array.from(this.participants.values()));
    }

    ontext(data, conn) {
        const name = this.participants.get(conn).name;
        this.broadcast("text", {name, ...data});
    }
}
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let clients = [];

wss.on("connection", (ws) => {
    console.log("Yeni bağlantı");

    clients.push(ws);

    ws.on("message", (msg) => {
        for (let client of clients) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(msg);
            }
        }
    });

    ws.on("close", () => {
        clients = clients.filter((c) => c !== ws);
    });
});

app.get("/", (req, res) => {
    res.send("Mini Discord Server Çalışıyor!");
});

server.listen(3000, () => {
    console.log("Sunucu 3000 portunda çalışıyor.");
});


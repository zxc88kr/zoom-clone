import http from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
    socket.on("enterRoom", (msg, done) => {
        console.log(msg);
        setTimeout(() => {
            done();
        }, 5000);
    });
});

httpServer.listen(3000, () => {
    console.log(`Listening on http://localhost:3000`);
});

/* import WebSocket from "ws";
const wss = new WebSocket.Server({ server });
const sockets = [];
wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anonymous";
    console.log("Connected to Browser ✅");
    socket.on("close", () => {
        console.log("Disconnected from the Browser ❌");
    });
    socket.on("message", (msg) => {
        const message = JSON.parse(msg);
        switch (message.type) {
            case "message":
                sockets.forEach((aSocket) => {
                    aSocket.send(`${socket.nickname}: ${message.payload}`);
                }); break;
            case "nickname":
                socket["nickname"] = message.payload;
        }
    });
}); */
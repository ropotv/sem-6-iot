import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";
import path from 'path';
import express from 'express';


/**
 * Import your Room files
 */
import { ChatRoom } from "./rooms/chat-room";
import path from "path";

export default Arena({
    getId: () => "Chisinau Arena IOT",

    initializeGameServer: (server) => {
        /**
         * Define your room handlers:
         */

        console.log('init game server' , server.define.toString())
        server.define('chat', ChatRoom);


    },

    initializeExpress: (app) => {

        /**
         * Bind your custom express routes here:
         */
        app.get("/", (req, res) => {
            res.send("It's time to kick ass and chew bubblegum!");
        });

        /**
         * Bind @colyseus/monitor
         * It is recommended to protect this route with a password.
         * Read more: https://docs.colyseus.io/tools/monitor/
         */
        app.use("/colyseus", monitor());
        app.use('/chat', express.static(path.join(__dirname, "client/chat.html")));

    },


    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});

import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";
import path from "path";

import { ChatRoom } from "./rooms";

export default Arena({
  getId: () => "Chisinau Arena IOT",

  initializeGameServer: (server) => {
    server.define("chat", ChatRoom);
  },

  initializeExpress: (app) => {
    const chat = path.join(__dirname, "index.html");

    app.get("/", (req, res) => res.sendFile(chat));

    /**
     * Protect this route with a password.
     * Read more: https://docs.colyseus.io/tools/monitor/
     */
    app.use("/admin", monitor());
  },

  beforeListen: () => {},
});

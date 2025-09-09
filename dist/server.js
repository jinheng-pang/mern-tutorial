import express from "express";
import path from "path";
import router from "./routes/root.js";
import { __root } from "./util.js";
const app = express();
const PORT = process.env.PORT || 3000;
/** MOUNT MIDDLEWARE */
// Serve static files
app.use("/", express.static(path.join(__root, "public")));
app.use("/", router);
// . => any character, * => zero or more
app.all(/.*/, (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__root, "views", "404.html"));
    }
    else if (req.accepts("json")) {
        res.json({ message: "404 Not Found" });
    }
    else {
        res.type("txt").send("404 Not Found");
    }
});
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));

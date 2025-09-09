import express, { Request, Response } from "express";
import path from 'path';
import { __root } from "../util.js";

const router = express.Router();

// Regex
router.get(/^\/$|^\/index(\.html)?$/, (req: Request, res: Response) => {
    res.sendFile(path.join(__root, "views", "index.html"));
});

export default router;

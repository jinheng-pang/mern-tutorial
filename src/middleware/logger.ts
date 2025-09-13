import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { __root } from "../util.js";
import { Request, Response, NextFunction } from "express";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";

const logEvents = async (message: string, logFileName: string) => {
  const dateTime = format(new Date(), "dd/MM/yyyy\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__root, "logs"))) {
      await fsPromises.mkdir(path.join(__root, "logs"));
    }
    // add data to file, if file doesn't exist, it is automatically created
    await fsPromises.appendFile(
      path.join(__root, "logs", logFileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

// middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  console.log(`${req.method}\t${req.path}`);
  next();
};

export default logger;

console.log(format(new Date(), "dd/MM/yyyy\tHH:mm:ss")); // 13/09/2025      16:32:33

// Request: GET /users/123?sort=asc
// console.log(req.url);  "/users/123?sort=asc"
// console.log(req.path);  "/users/123"



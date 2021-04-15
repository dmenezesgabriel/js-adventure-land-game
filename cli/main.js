import dotenv from "dotenv";
import User from "./src/auth.js";

dotenv.config();

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

let user = new User(email, password);

await user.getSession();

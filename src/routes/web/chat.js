import { Router } from "express";

import { renderChat } from "../../controller/index.js";
import { isAuthenticated } from "../middleware/index.js";

//-------------------------------------------------

const chat = Router()

chat.route('/chat')
    .get(isAuthenticated, renderChat)

export { chat };
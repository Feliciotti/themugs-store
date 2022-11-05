import { Router } from "express";
import { isAuthenticated } from '../middleware/index.js';
import { getProfile } from "../../controller/index.js";

const profile = Router()

profile.route('/perfil')
    .get(isAuthenticated, getProfile)

export { profile }
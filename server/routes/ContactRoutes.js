import Router from "express";
import verifytoken from "../middlewares/AuthMiddleware.js";
import { searchcontact } from "../controllers/contactcontroller.js";

const contactRoutes = Router();

contactRoutes.post("/search",verifytoken, searchcontact);

export default contactRoutes;
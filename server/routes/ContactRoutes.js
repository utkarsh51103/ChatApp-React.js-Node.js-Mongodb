import Router from "express";
import verifytoken from "../middlewares/AuthMiddleware.js";
import { searchcontact, getContactsForDmList } from "../controllers/contactcontroller.js";


const contactRoutes = Router();

contactRoutes.post("/search",verifytoken, searchcontact);
contactRoutes.get("/get-contact-dm",verifytoken, getContactsForDmList); //

export default contactRoutes;
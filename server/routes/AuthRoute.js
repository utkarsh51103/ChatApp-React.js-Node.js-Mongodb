import Router from "express"
import {login, signup, getuserinfo, updateprofile} from "../controllers/usercontroller.js"
import verifytoken from "../middlewares/AuthMiddleware.js";

const authroute = Router();

authroute.post("/signup",signup)
authroute.post("/login",login)
authroute.get("/user-info",verifytoken,getuserinfo)
authroute.post("/update-profile",verifytoken,updateprofile)

export default authroute;
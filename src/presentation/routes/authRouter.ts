import { Request, Response, Router } from "express";
import { UserController } from "../controllers/userController";
import { AuthServices } from "../../Services/AuthServices";
import { AuthRepository } from "../../frameworks/database/mongodb/repository/authRepository";
import { Bcrypt } from "../../External- Libraries/bcrypt";
import { Mailer } from "../../External- Libraries/mailer";
import { GenerateOtp } from "../../External- Libraries/generateOtp";

import { Token } from "../../External- Libraries/token";
import { verifyJWT } from "../middleware/validateToken";
import { validateLoginUser, validateRegisterUser } from "../validators/authValidator";



const repository = new AuthRepository();
const bcrypt=new Bcrypt()
const mailer=new Mailer()
const generateOtp=new GenerateOtp
const token=new Token()

const services = new AuthServices(repository,bcrypt,mailer,generateOtp,token);

const controller = new UserController(services);

const authRouter = (router: Router) => {

 router.route('/register').post(validateRegisterUser,controller.onRegisterUser);
 router.route('/verify').post(controller.OnVeryOtpAndRegister.bind(controller))
 router.route('/login').post(validateLoginUser,controller.OnLoginUser.bind(controller))
 router.route('/refresh').get(controller.onRefresh.bind(controller))
 router.route('/logout').post(controller.onLogOut.bind(controller))
 router.route('/forgotPasswordSendOtp').post(controller.forgotPasswordSendOtp.bind(controller))
 router.route('/forgotPasswordVerifyOtp').post(controller.onVerifyForgotOtp.bind(controller))
 router.route('/change-forgot-password-change').post(controller.changePasswordAfterVerification.bind(controller))

 router.route('/resendOtp').post(controller.resendOtp.bind(controller))

 
 
 router.route('/verifyToken').post(controller.verifyToken.bind(controller))
 
 router.route('/test').get(verifyJWT,controller.home.bind(controller))

 return router;
}

export default authRouter;

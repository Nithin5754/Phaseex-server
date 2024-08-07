import { Request, Response, Router } from "express";
import { UserController } from "../controllers/userController";
import { AuthServices } from "../../services/AuthServices";
import { AuthRepository } from "../../frameworks/database/mongodb/repository/authRepository";
import { Bcrypt } from "../../External- Libraries/bcrypt";
import { Mailer } from "../../External- Libraries/mailer";
import { GenerateOtp } from "../../External- Libraries/generateOtp";

import { Token } from "../../External- Libraries/token";
import { verifyJWT } from "../middleware/validateToken";
import {
  validateLoginUser,
  validateRegisterUser,
} from "../validators/authValidator";
import { AuthController } from "../controllers/authController";

import rateLimitMiddleware from "../utils/rateLimiter";
import { SpaceService } from "../../services/spaceService";
import { workSpaceRepository } from "../../frameworks/database/mongodb/repository/workspaceRepository";
import { FolderRepository } from "../../frameworks/database/mongodb/repository/FolderRepository";
import { ListRepository } from "../../frameworks/database/mongodb/repository/ListRepository";
import { TaskRepository } from "../../frameworks/database/mongodb/repository/taskRepository";
import { TodoRepository } from "../../frameworks/database/mongodb/repository/todoRepository";
import { GoogleService } from "../../services/GoogleService";
import upload from "../middleware/multer";
import { CloudinaryStorage } from "../../External- Libraries/cloudnariyStorage";
import { MulterFileConverter } from "../../External- Libraries/multerFileConverter";
import { GptRepository } from "../../frameworks/database/mongodb/repository/GptRepository";
import { GptService } from "../../services/GptService";

const repository = new AuthRepository();
const bcrypt = new Bcrypt();
const mailer = new Mailer();
const generateOtp = new GenerateOtp();
const token = new Token();

const services = new AuthServices(
  repository,
  bcrypt,
  mailer,
  generateOtp,
  token
);

const spaceRepository = new workSpaceRepository();
const folderRepository = new FolderRepository();
const listRepository = new ListRepository();
const taskRepository = new TaskRepository();
const todoRepository = new TodoRepository();

const gptRepository = new GptRepository();
const gptService = new GptService(gptRepository);

const spaceService = new SpaceService(
  spaceRepository,
  folderRepository,
  listRepository,
  taskRepository,
  todoRepository
);
const ICloudinary = new CloudinaryStorage();
const multerConverter = new MulterFileConverter();
const googleService = new GoogleService(repository, ICloudinary);
const controller = new AuthController(
  services,
  spaceService,
  googleService,
  ICloudinary,
  multerConverter,
  gptService
);

const authRouter = (router: Router) => {
  router
    .route("/login")
    .post(validateLoginUser, controller.OnLoginUser.bind(controller));

  router.route("/googleAuth").post(controller.onGoogleAuth.bind(controller));
  router.route("/refresh").get(controller.onRefresh.bind(controller));
  router.route("/logout").post(controller.onLogOut.bind(controller));
  router
    .route("/forgotPasswordSendOtp")
    .post(controller.forgotPasswordSendOtp.bind(controller));
  router
    .route("/forgotPasswordVerifyOtp")
    .post(controller.onVerifyForgotOtp.bind(controller));
  router
    .route("/change-forgot-password-change")
    .post(controller.changePasswordAfterVerification.bind(controller));

  router.route("/verifyToken").post(controller.verifyToken.bind(controller));

  router.route("/test").get(controller.home.bind(controller));
  router
    .route("/add-profile")
    .post(
      verifyJWT,
      upload.single("profile_image"),
      controller.onAddProfile.bind(controller)
    );
  return router;
};

export default authRouter;

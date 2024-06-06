import { Router } from "express";
import { NotificationController } from "../controllers/NotificationController";
import { NotoficationService } from "../../Services/NotificationService";

import { verifyJWT } from "../middleware/validateToken";
import { NotificationRepository } from "../../frameworks/database/mongodb/repository/NotiFicationRepo";



const notificationRepository=new NotificationRepository()
const notificationService=new NotoficationService(notificationRepository)
const controller=new NotificationController(notificationService)


const notificationRoutes = (router: Router) => {
  router.use(verifyJWT);
  router.route("/get-all-notification").
  get(controller.onGetAllNotification.bind(controller))

  
  router.route('/get-all-unread-notification').get(controller.onGetAllNotificationUnRead.bind(controller))

  return router;

};

export default notificationRoutes;




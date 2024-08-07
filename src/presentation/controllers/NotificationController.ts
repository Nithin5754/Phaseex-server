import { NextFunction, Request, Response } from "express";
import { INotificationService } from "../../interfaces/INotificationService";

export class NotificationController {
  private notificationService: INotificationService;
  constructor(notificationService: INotificationService) {
    this.notificationService = notificationService;
  }

  onGetAllNotification = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.userId;
    try {
      if (!userId) {
        return res.status(404).json({ message: "credentials missing" });
      }
      let response =
        await this.notificationService.getAllNotification(userId);
      if (response.length < 0) {
        return res.status(400).json({ message: "No notifications found" });
      }
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  onGetAllNotificationUnRead = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.userId;
    try {
      if (!userId) {
        return res.status(404).json({ message: "credentials missing" });
      }
      let response =
        await this.notificationService.getAllNotificationUnReadOnly(userId);
      if (response.length < 0) {
        return res.status(400).json({ message: "No notifications found" });
      }
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  onUpdateReadNotification = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let notificationId = req.params.notificationId;

      if (!notificationId || typeof notificationId !== "string") {
        return res.status(400).json({ message: "credentials missing" });
      }
      let response = await this.notificationService.getUpdateReadNotification(
        notificationId
      );
      if (!response) {
        return res
          .status(404)
          .json({ message: "error in updating unread notification" });
      }
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  onDeleteNotificationById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let notificationId = req.params.notificationId;

      if (!notificationId || typeof notificationId !== "string") {
        return res.status(400).json({ message: "credentials missing" });
      }
      let response = await this.notificationService.getDeleteNotification(
        notificationId
      );
      if (!response) {
        return res
          .status(404)
          .json({ message: "error in deleting unread notification" });
      }
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

onDeleteNotifIcationLink= async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let notificationId = req.params.notificationId;


    if (!notificationId || typeof notificationId !== "string") {
      return res.status(400).json({ message: "credentials missing" });
    }
    let response = await this.notificationService.getDeleteInviteLinkNoti(
      notificationId
    );

    if (!response) {
      return res
        .status(404)
        .json({ message: "error in deletinG INVITE LINK notification" });
    }
    return res.status(200).json(response);
    
  } catch (error) {
    next(error)
  }
}


}

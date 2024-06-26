import { promises } from "dns";
import { NotificationType } from "../Entities/notification";


export interface INotificationRepository {

  allNotification(userId:string):Promise<NotificationType[]|null>
  totalNotification(userId:string):Promise<number>
  allNotificationUnRead(userId:string):Promise<NotificationType[]|null>
  allNotificationUnReadLength(userId:string):Promise<number>

   createNotification(userId:string,notificationData:Partial<NotificationType>):Promise<boolean>
   updateReadNotification(notificationId:string):Promise<boolean>
   deleteNotification(notificationId:string):Promise<boolean>
   deleteInviteLinkNoti(notificationId:string):Promise<boolean>
}



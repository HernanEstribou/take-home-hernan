import * as notificationsRepository from './notifications.repository.js';
import { getChannel } from './channels/channel.factory.js';

const getAllNotifications = async (id) => {
  const response = await notificationsRepository.getAllNotifications(id);

  return response;
};

const createNewNotification = async (notificationData) => {
  const notification =
    await notificationsRepository.createNewNotification(notificationData);

  const channel = getChannel(notificationData.channel);

  const result = await channel.send(notification);

  await notificationsRepository.createDelivery({
    notification_id: notification.id,
    channel: notificationData.channel,
    state: result.state,
    details: result.details,
  });

  return notification;
};

const updateOneNotification = async (notificationData) => {
  const response =
    await notificationsRepository.updateOneNotification(notificationData);

  return response;
};

const deleteOneNotification = async ({ id, userId }) => {
  const response = await notificationsRepository.deleteOneNotification({
    id,
    userId,
  });

  return response;
};
export {
  getAllNotifications,
  createNewNotification,
  updateOneNotification,
  deleteOneNotification,
};

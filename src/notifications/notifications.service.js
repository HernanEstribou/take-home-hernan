import * as notificationsRepository from './notifications.repository.js';

const getAllNotifications = async (id) => {
  const response = await notificationsRepository.getAllNotifications(id);

  return response;
};

const createNewNotification = async (notificationData) => {
  const response =
    await notificationsRepository.createNewNotification(notificationData);

  return response;
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

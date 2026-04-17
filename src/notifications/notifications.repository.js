import { prisma } from '../config/prisma.js';

const getAllNotifications = async (id) => {
  const notifications = await prisma.notification.findMany({
    where: { userId: parseInt(id) },
  });
  return notifications;
};

const createNewNotification = async (notificationData) => {
  const { userId, title, content, channel, recipient } = notificationData;

  const notification = await prisma.notification.create({
    data: { userId, title, content, channel, recipient },
  });

  return notification;
};

const updateOneNotification = async (notificationData) => {
  const { userId, id, title, content, channel, recipient } = notificationData;

  const existingNotification = await prisma.notification.findUnique({
    where: { id: parseInt(id) },
  });

  if (!existingNotification) {
    return null;
  }

  if (existingNotification.userId !== userId) {
    return { forbidden: true };
  }

  const notification = await prisma.notification.update({
    where: {
      id: parseInt(id),
    },
    data: { userId, title, content, channel, recipient },
  });

  return notification;
};

const deleteOneNotification = async ({ id, userId }) => {
  const notificationIdInt = parseInt(id);

  const existingNotification = await prisma.notification.findUnique({
    where: { id: notificationIdInt },
  });

  if (!existingNotification) {
    return null;
  }

  if (existingNotification.userId !== userId) {
    return { forbidden: true };
  }

  const deletedNotification = await prisma.notification.delete({
    where: {
      id: notificationIdInt,
    },
  });

  return deletedNotification;
};

const createDelivery = async ({ notification_id, channel, state, details }) => {
  return await prisma.notificationDelivery.create({
    data: {
      notification_id,
      channel,
      state,
      details,
    },
  });
};

export {
  getAllNotifications,
  createNewNotification,
  updateOneNotification,
  deleteOneNotification,
  createDelivery,
};

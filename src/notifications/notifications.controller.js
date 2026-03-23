import express from 'express';
import Joi from 'joi';
import * as notificationsService from './notifications.service.js';
import { CreateNotificationDto } from './dto/create-notification.dto.js';
import { UpdateNotificationDto } from './dto/update-notification.dto.js';
import { NotificationResponseDto } from './dto/notification-response.js';
import { authenticate } from '../auth/auth.middleware.js';

const router = express.Router();

const idSchema = Joi.number().integer().positive().required();

// Ruta: GET /notifications
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { error } = idSchema.validate(req.params.id);

    if (error) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const notifications = await notificationsService.getAllNotifications(
      req.params.id,
    );

    const notificationsDto = notifications.map(
      (notification) => new NotificationResponseDto(notification),
    );

    res.status(200).json(notificationsDto);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching notifications', error: error.message });
  }
});

// Ruta: POST /notification
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, content, channel, recipient } = req.body;
    const userId = req.user.id;

    const notificationDto = new CreateNotificationDto({
      title,
      content,
      channel,
      recipient,
    });

    const validation = notificationDto.validate();

    if (!validation.valid) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validation.errors,
      });
    }

    const notificationData = { userId, title, content, channel, recipient };

    const notification =
      await notificationsService.createNewNotification(notificationData);

    const notificationResponseDto = new NotificationResponseDto(notification);

    res.status(201).json(notificationResponseDto);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating notification', error: error.message });
  }
});

// Ruta: PUT /notification
router.put('/:notificationId', authenticate, async (req, res) => {
  try {
    const { error } = idSchema.validate(req.params.notificationId);

    if (error) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const id = req.params.notificationId;
    const userId = req.user.id;
    const { title, content, channel, recipient } = req.body;

    const notificationDto = new UpdateNotificationDto({
      title,
      content,
      channel,
      recipient,
    });

    const validation = notificationDto.validate();

    if (!validation.valid) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validation.errors,
      });
    }

    const notificationData = {
      userId,
      id,
      ...notificationDto,
    };

    const notification =
      await notificationsService.updateOneNotification(notificationData);

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    if (notification.forbidden) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const notificationResponseDto = new NotificationResponseDto(notification);

    return res.status(200).json({
      message: 'Notification updated',
      data: notificationResponseDto,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating notification', error: error.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { error } = idSchema.validate(req.params.id);
    if (error) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const userId = req.user.id;
    const notification = await notificationsService.deleteOneNotification({
      id: req.params.id,
      userId,
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    if (notification.forbidden) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const notificationResponseDto = new NotificationResponseDto(notification);

    res.status(200).json({
      message: 'Notification deleted',
      data: notificationResponseDto,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting notification', error: error.message });
  }
});

export default router;

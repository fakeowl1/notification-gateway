import type { FastifyInstance } from "fastify";
import type { NotificationService } from "../core/notification-service.js";

export function registerApiRoutes(
  _app: FastifyInstance,
  _notifications: NotificationService,
): void {}

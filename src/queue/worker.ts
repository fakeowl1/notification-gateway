import type { NotificationQueue } from "../core/ports.js";

export class NotificationWorker implements NotificationQueue {
  enqueue(..._args: unknown[]): unknown {
    return undefined;
  }
}

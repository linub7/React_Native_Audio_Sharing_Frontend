export type NotificationType = 'error' | 'success';

export interface NotificationState {
  message: string;
  type: NotificationType;
}

export type NotificationState = {
  modal: {
    open: boolean;
    text: string;
  };
  toast: {
    show: boolean;
    text: string;
    type: 'info' | 'danger' | 'success' | 'warning';
  };
};

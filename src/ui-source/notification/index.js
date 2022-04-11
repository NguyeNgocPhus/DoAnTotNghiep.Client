import { notification } from 'antd';
import { NOTIFICATION } from 'app-configs/constants';

export const NotificationInfo = (title, message) => {
    // Mục đích -> để truyền tham 1 tham số(nội dung) -> đỡ lặp lại nhiều lần title
    if (title + message === title) {
        notification.info({
            message: NOTIFICATION.INFO,
            description: title,
            placement: 'topRight',
            duration: 5,
        });
    } else {
        notification.info({
            message: title,
            description: message,
            placement: 'topRight',
            duration: 5,
        });
    }
};

export const NotificationSuccess = (title, message) => {
    // Mục đích -> để truyền tham 1 tham số(nội dung) -> đỡ lặp lại nhiều lần title
    if (title + message === title) {
        notification.success({
            message: NOTIFICATION.SUCCESS,
            description: title,
            placement: 'topRight',
            duration: 3,
        });
    } else {
        notification.success({
            message: title,
            description: message,
            placement: 'topRight',
            duration: 3,
        });
    }
   
};

export const NotificationError = (title = '', message = '') => {
    if (title + message === title) {
        notification.error({
            message: NOTIFICATION.ERROR,
            description: title,
            placement: 'topRight',
            duration: 5,
        });
    } else {
        notification.error({
            message: title,
            description: message,
            placement: 'topRight',
            duration: 5,
        });
    }
   
};

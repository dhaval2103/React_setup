import { notification } from 'antd';
import { CloseCircle } from 'iconsax-react';

export default (message, type) => {
    if (message !== undefined) {
        if (type === 'success') {
            notification.open({
                // placement: 'bottomRight',
                closeIcon: <CloseCircle size="24" color="#333230" />,
                duration: 2.5,
                type: 'success',
                message: message,
                // description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                icon: <i className="fa fa-check-circle"></i>,
            });
        } else {
            notification.open({
                // placement: 'bottomRight',
                closeIcon: <CloseCircle size="24" color="#333230" />,
                duration: 2.5,
                type: 'error',
                message: message,
                // description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                icon: <i className="fa fa-check-circle"></i>,
            });
        }
    }
}


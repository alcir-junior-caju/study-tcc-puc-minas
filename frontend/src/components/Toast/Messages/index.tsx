import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiXCircle,
  FiCheckCircle,
  FiInfo
} from 'react-icons/fi';

import { ToastMessage, useToast } from '@hooks/toast';

import { Container } from './styles';

interface MessageProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={20} />,
  success: <FiCheckCircle size={20} />,
  error: <FiAlertCircle size={20} />
};

const Messages: React.FC<MessageProps> = ({
  message: { id, type, title, description },
  style
}) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [removeToast, id]);

  return (
    <Container type={type} hasdescription={Number(!!description)} style={style}>
      {icons[type || 'info']}

      <div>
        <strong>{title}</strong>
        {description && <p>{description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(id)}>
        <FiXCircle size={20} />
      </button>
    </Container>
  );
};

export default Messages;

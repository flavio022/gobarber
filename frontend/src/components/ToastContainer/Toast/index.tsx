import React, { useEffect } from "react";

import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle
} from "react-icons/fi";
import { Container } from "./styles";
import { ToastMessage, useToast } from "../../../hooks/ToastContext";

interface ToastProps {
  message: ToastMessage;
  style: Object;
}
const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <>
      <Container
        type={message.type}
        hasDescription={Number(!!message.description)}
        style={style}
      >
        {icons[message.type || "info"]}
        <FiAlertCircle size={20} />
        <div>
          <strong>{message.type}</strong>
          {message.description && <p>{message.title}</p>}
        </div>
        <button type="button" onClick={() => removeToast(message.id)}>
          <FiXCircle size={18} />
        </button>
      </Container>
      ;
    </>
  );
};

export default Toast;

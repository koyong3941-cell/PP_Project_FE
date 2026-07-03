// src/hooks/useAlertify.js
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/default.min.css";

alertify.set("notifier", "position", "bottom-right");
alertify.set("notifier", "delay", 3);

export const useAlertify = () => {
  const showToast = (msg, className) => {
    const toast = alertify.notify(msg, "", 3);
    toast.element.classList.add(className);
  };

  return {
    success: (msg) => showToast(msg, "my-success"),
    error: (msg) => showToast(msg, "my-error"),
    warning: (msg) => alertify.warning(msg),
    message: (msg) => alertify.message(msg),
  };
};

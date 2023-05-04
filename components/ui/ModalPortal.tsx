import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

type Props = {
  children: React.ReactNode;
};

const ModalPortal = ({ children }: Props) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const node = document.getElementById('portal');
  if (!node) {
    return null;
  }

  return ReactDOM.createPortal(children, node);
};

export default ModalPortal;


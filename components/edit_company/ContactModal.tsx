import React, { useState } from "react";
import Modal from "@/components/modals/Modal";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const bodyContent = <h1>Hello!</h1>;

  return (
    <Modal isOpen={isOpen} title="Login" onClose={onClose} body={bodyContent} />
  );
};

export default ContactModal;

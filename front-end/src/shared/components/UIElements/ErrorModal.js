import React from "react";
import { Modal, Button } from "react-bootstrap";

const ErrorModal = (props) => {
  return (
    <Modal show={!!props.error} onHide={props.onClear}>
      <Modal.Header className="bg-danger">
        <Modal.Title>An Error Occurred!</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.error}</Modal.Body>
      <Modal.Footer>
        <Button
          className="btn btn-danger"
          variant="secondary"
          onClick={props.onClear}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;

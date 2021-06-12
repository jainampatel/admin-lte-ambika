import React from "react";

import { Modal, Button } from "react-bootstrap";

const MyModal = (props) => {
  return (
    <React.Fragment>
      <Modal show={!!props.text} onHide={props.onClear}>
        <Modal.Header className="bg-success">
          <Modal.Title>{props.header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.text}</Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-success"
            variant="secondary"
            onClick={props.onClear}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default MyModal;

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import connect from '../connect';

const mapStateToProps = ({ modalData }) => {
  const props = {
    modalData,
  };
  return props;
};

@connect(mapStateToProps)
class ModalWindow extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    const { closeModalWindow } = this.props;
    closeModalWindow();
  }

  render() {
    const { modalData } = this.props;

    return (
      <>
        <Modal show={modalData.isOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalData.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalData.body}</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}


export default ModalWindow;

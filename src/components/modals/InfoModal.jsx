import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import connect from '../../connect';

const mapStateToProps = ({ modalData }) => {
  const props = {
    modalData,
  };
  return props;
};

@connect(mapStateToProps)
class InfoModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    const { closeModalWindow } = this.props;
    closeModalWindow();
  }

  render() {
    const {
      modalData: {
        modalProps: { isOpen, body, title },
      },
    } = this.props;
    return (
      <>
        <Modal show={isOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{body}</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose} className="btn btn-outline-success btn-lg">
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}


export default InfoModal;

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

class ModalWindow extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { modalData } = nextProps;
    if (modalData.isOpen) {
      this.setState({ show: true });
    }
  }

  handleClose() {
    const { closeModalWindow } = this.props;
    this.props.closeModalWindow();
    this.setState({ show: false });
  }

  render() {
    const { show } = this.state;
    const { modalData } = this.props;

    return (
      <>
        <Modal show={show} onHide={this.handleClose}>
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

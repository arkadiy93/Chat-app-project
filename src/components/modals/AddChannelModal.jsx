import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import AddChannelForm from './AddChannelForm';
import connect from '../../connect';

const mapStateToProps = ({ modalData }) => {
  const props = {
    modalData,
  };
  return props;
};

@connect(mapStateToProps)
class AddChannelModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    const { closeModalWindow, cleanChannelFailure } = this.props;
    closeModalWindow();
    cleanChannelFailure();
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
          <Modal.Body>
            {body}
            <AddChannelForm />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}


export default AddChannelModal;

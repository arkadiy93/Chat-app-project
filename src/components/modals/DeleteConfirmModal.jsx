import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import connect from '../../connect';

const mapStateToProps = ({ modalData, currentChannel, channelDeletingState }) => {
  const props = {
    channelDeletingState,
    modalData,
    currentChannel,
  };
  return props;
};

const renderError = () => (
  <div className="alert mx-auto mt-3 alert-danger">
    <strong>Error! </strong>
    There was a problem with the connection.
  </div>
);

@connect(mapStateToProps)
class DeleteConfirmModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClose = this.handleClose.bind(this);
  }

  handleConfirm = id => () => {
    const { deleteChannel, currentChannel } = this.props;
    deleteChannel(id, currentChannel);
  }

  handleClose() {
    const { closeModalWindow, cleanChannelFailure } = this.props;
    closeModalWindow();
    cleanChannelFailure();
  }

  render() {
    const {
      modalData: {
        modalProps: {
          isOpen,
          body,
          title,
          id,
        },
      },
      channelDeletingState,
    } = this.props;
    const hasConnectionError = channelDeletingState === 'failed';
    return (
      <>
        <Modal show={isOpen} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{body}</Modal.Body>
          {hasConnectionError ? renderError() : null}
          <Modal.Footer>
            <div className="w-100 d-flex justify-content-end mt-3">
              <Button className="btn btn-outline-secondary mx-2" onClick={this.handleClose}>
                Cancel
              </Button>
              <Button className="btn btn-outline-success btn-lg" onClick={this.handleConfirm(id)}>
                Delete!
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}


export default DeleteConfirmModal;

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import RenameChannelForm from './RenameChannelForm';
import connect from '../../connect';

const mapStateToProps = ({ modalData }) => {
  const props = {
    modalData,
  };
  return props;
};

@connect(mapStateToProps)
class RenameChannelModal extends React.Component {
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
        modalProps: {
          isOpen,
          body,
          title,
          targetName,
          id,
        },
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
            <RenameChannelForm currentName={targetName} id={id} />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}


export default RenameChannelModal;

import React from 'react';


const handleClick = closeModal => () => {
  closeModal();
};

const renderModal = ({ body, title }, closeModal) => (
  <div style={{ display: 'block' }} className="modal fade show" id="modal" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
          <p>{body}</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={handleClick(closeModal)}>Close</button>
        </div>
      </div>
    </div>
  </div>
);


const ModalWindow = ({ modalData, closeModalWindow }) => {
  const { isOpen } = modalData;
  return isOpen ? renderModal(modalData, closeModalWindow) : null;
};

export default ModalWindow;

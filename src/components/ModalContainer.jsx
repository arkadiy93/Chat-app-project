import React from 'react';
import cn from 'classnames';


const handleClick = () => {
  const modal = document.getElementById('modal');
  modal.classList.remove('show');
  modal.removeAttribute('style');
};

const ModalContainer = ({ messageSendingState }) => {
  const modalStyle = {
    display: messageSendingState === 'failed' ? 'block' : 'none',
  };
  const modalClass = {
    show: messageSendingState === 'failed',
  };


  return (
    <div style={modalStyle} className={cn('modal fade', modalClass)} id="modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">Error</div>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Your message was not sent</p>
            <p>There was a problem with the connection.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClick}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;

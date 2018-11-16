import React from 'react';
// import MessagesField from './MessagesField';
// import InputField from './InputField';

const MainField = () => (
  <div className="col mh-100">
    <div className="row input">
      <div className="col-lg-12">
        <form className="input-group input-group-lg">
          <input type="text" className="form-control input-lg" placeholder="Type message..." />
          <span className="input-group-btn">
            <button className="btn btn-default btn-lg" type="submit">Send</button>
          </span>
        </form>
      </div>
    </div>
    <div className="jumbotron bg-white">
      Messages
    </div>
  </div>
);

export default MainField;

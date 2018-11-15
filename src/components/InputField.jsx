import React from 'react';
import axios from 'axios';

const submitForm = (e) => {
  e.preventDefault();
};


const InputField = () => (
  <div className="row input">
    <div className="col-lg-12">
      <form onSubmit={submitForm} className="input-group input-group-lg">
        <input type="text" className="form-control input-lg" placeholder="Type message..." />
        <span className="input-group-btn">
          <button className="btn btn-default btn-lg" type="submit">Send</button>
        </span>
      </form>
    </div>
  </div>
);

export default InputField;

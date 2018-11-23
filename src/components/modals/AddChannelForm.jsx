import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../../connect';

const mapStateToProps = ({ channelAddingState }) => {
  const props = {
    channelAddingState,
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
@reduxForm({
  form: 'newChannelName',
})
class AddChannelForm extends React.Component {
  setName = ({ channelName }) => {
    const { addChannel } = this.props;
    return addChannel(channelName);
  };

  render() {
    const { handleSubmit, submitting, channelAddingState } = this.props;
    const showError = channelAddingState === 'failed';
    return (
      <form
        onSubmit={handleSubmit(this.setName)}
        className="input-group input-group-lg"
      >
        <Field
          name="channelName"
          type="text"
          className="form-control input-lg"
          placeholder="Channel name"
          component="input"
          disabled={submitting}
        />
        <span className="input-group-btn">
          <button
            className="btn btn-default btn-lg"
            type="submit"
            disabled={submitting}
          >
          Set!
          </button>
        </span>
        {showError ? renderError() : null}
      </form>
    );
  }
}

export default AddChannelForm;

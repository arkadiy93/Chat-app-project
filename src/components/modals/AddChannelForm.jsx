import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../../connect';
import { channelsSelector } from '../../selectors';

const mapStateToProps = (state) => {
  const { channelAddingState } = state;
  const props = {
    channelAddingState,
    channelsData: channelsSelector(state),
  };
  return props;
};

const renderError = () => (
  <div className="alert mx-auto mt-3 alert-danger">
    <strong>Error! </strong>
    There was a problem with the connection.
  </div>
);

const validation = (...args) => {
  const [value,, props] = args;
  const { channelsData } = props;
  if (!value || !value.trim()) {
    return 'Channel name must include at least one letter';
  }
  if (channelsData.some(({ name }) => name === value)) {
    return 'A channel with this name already exists';
  }
  return undefined;
};


const renderField = ({
  input,
  label,
  type,
  hasConnectionError,
  meta: { touched, error, submitting },
}) => (
  <div className="input-group input-group-lg">
    <div className="input-group input-group-lg">
      <input {...input} className="form-control input-lg" disabled={submitting} placeholder={label} type={type} />
    </div>
    {touched && (error && <span className="alert mx-auto mt-2 alert-danger">{error}</span>)}
    {hasConnectionError && renderError()}
  </div>
);


@connect(mapStateToProps)
@reduxForm({
  form: 'newChannelName',
})
class AddChannelForm extends React.Component {
  setName = ({ channelName }) => {
    const { addChannel, channelsData } = this.props;
    return addChannel(channelName, channelsData);
  };

  handleClose = () => {
    const { closeModalWindow, cleanChannelFailure } = this.props;
    closeModalWindow();
    cleanChannelFailure();
  }

  render() {
    const { handleSubmit, channelAddingState } = this.props;
    const hasConnectionError = channelAddingState === 'failed';
    return (
      <form
        onSubmit={handleSubmit(this.setName)}
        className="input-group input-group-lg"
      >
        <Field
          name="channelName"
          type="text"
          label="Channel name"
          component={renderField}
          validate={validation}
          hasConnectionError={hasConnectionError}
        />
        <div className="w-100 d-flex justify-content-end mt-3">
          <button onClick={this.handleClose} type="button" className="btn btn-outline-secondary mx-2">
            Cancel
          </button>
          <button type="submit" className="btn btn-outline-success btn-lg">
            Add!
          </button>
        </div>
      </form>
    );
  }
}

export default AddChannelForm;

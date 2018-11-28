import React from 'react';
import { Field, reduxForm } from 'redux-form';
import connect from '../../connect';
import { channelsSelector } from '../../selectors';

const mapStateToProps = (state) => {
  const { channelRenamingState } = state;
  const props = {
    channelRenamingState,
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
  const { channelsData, currentName } = props;
  if (!value || !value.trim()) {
    return 'Channel name must include at least one letter';
  }
  if (currentName === value) {
    return 'This is the same as the current name';
  }
  if (channelsData.some(({ name }) => name === value)) {
    return 'A channel with this name already exists';
  }
  return undefined;
};

const renderField = ({
  input,
  type,
  hasConnectionError,
  meta: { touched, error, submitting },
}) => (
  <div className="input-group input-group-lg">
    <div className="input-group input-group-lg">
      <input {...input} className="form-control input-lg" disabled={submitting} type={type} />
    </div>
    {touched && (error && <span className="alert mx-auto mt-2 alert-danger">{error}</span>)}
    {hasConnectionError ? renderError() : null}
  </div>
);


@connect(mapStateToProps)
@reduxForm({
  form: 'newChannelName',
})
class AddChannelForm extends React.Component {
  componentDidMount() {
    const { currentName, initialize } = this.props;
    initialize({ channelName: currentName });
  }

  setNewName = ({ channelName }) => {
    const { renameChannel, id } = this.props;

    return renameChannel(id, channelName);
  };

  handleClose = () => {
    const { closeModalWindow, cleanChannelFailure } = this.props;
    closeModalWindow();
    cleanChannelFailure();
  }

  render() {
    const { handleSubmit, channelRenamingState } = this.props;
    const hasConnectionError = channelRenamingState === 'failed';
    return (
      <form
        onSubmit={handleSubmit(this.setNewName)}
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
            Set
          </button>
        </div>
      </form>
    );
  }
}

export default AddChannelForm;

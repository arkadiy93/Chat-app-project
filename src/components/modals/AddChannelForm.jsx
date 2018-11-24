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
  meta: { touched, error, submitting },
}) => (
  <div className="input-group input-group-lg">
    <div className="input-group input-group-lg">
      <input {...input} className="form-control input-lg" disabled={submitting} placeholder={label} type={type} />
      <span className="input-group-btn">
        <button className="btn btn-default btn-lg" type="submit" disabled={submitting}>
        Set!
        </button>
      </span>
    </div>
    {touched && (error && <span className="alert mx-auto mt-2 alert-danger">{error}</span>)}
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

  render() {
    const { handleSubmit, channelAddingState } = this.props;
    const showConnectionError = channelAddingState === 'failed';
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
        />
        {showConnectionError ? renderError() : null}
      </form>
    );
  }
}

export default AddChannelForm;

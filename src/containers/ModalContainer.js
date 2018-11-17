import { connect } from 'react-redux';
import Component from '../components/ModalContainer';
import * as actionCreators from '../actions';

const mapStateToProps = ({ messageSendingState }) => {
  const props = {
    messageSendingState,
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;

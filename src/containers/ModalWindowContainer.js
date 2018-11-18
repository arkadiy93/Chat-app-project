import { connect } from 'react-redux';
import Component from '../components/ModalWindow';
import * as actionCreators from '../actions';

const mapStateToProps = ({ modalData }) => {
  const props = {
    modalData,
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;

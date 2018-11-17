import { connect } from 'react-redux';
import Component from '../components/MainField';
import * as actionCreators from '../actions';
import dataSelector from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    data: dataSelector(state),
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;

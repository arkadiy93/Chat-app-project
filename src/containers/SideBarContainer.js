import { connect } from 'react-redux';
import Component from '../components/SideBar';
import * as actionCreators from '../actions';
// import { tasksSelector } from '../selectors';


const mapStateToProps = (state) => {
  const props = {
    channels: state,
  };
  return props;
};

const Container = connect(
  mapStateToProps,
  actionCreators,
)(Component);

export default Container;

import React from 'react';
import SideBarContainer from '../containers/SideBarContainer';
import MainFieldContainer from '../containers/MainFieldContainer';
import ModalContainer from '../containers/ModalContainer';

const App = () => (
  <div className="row">
    <SideBarContainer />
    <MainFieldContainer />
    <ModalContainer />
  </div>
);


export default App;

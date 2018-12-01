import React from 'react';
import SideBar from './SideBar';
import MainField from './MainField';
import ModalRoot from './ModalRoot';

const App = () => (
  <div className="container-fluid h-100">
    <div className="row h-100">
      <SideBar />
      <MainField />
      <ModalRoot />
    </div>
  </div>
);


export default App;

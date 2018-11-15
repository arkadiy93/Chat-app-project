import React from 'react';
import SideBar from './SideBar.jsx';
import MainField from './MainField.jsx';
import { DataProvider } from './DataContext';

const App = ({ initialData }) => (
  <DataProvider value={initialData}>
    <div className="app row h-100">
      <SideBar />
      <MainField />
    </div>
  </DataProvider>
);


export default App;

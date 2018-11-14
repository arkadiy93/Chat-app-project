import React from 'react';
import SideBar from './SideBar.jsx';
import MainField from './MainField.jsx';
import { DataProvider } from './DataContext';

const App = ({ initialData }) => (
  <DataProvider value={initialData}>
    <SideBar />
    <MainField />
  </DataProvider>
);


export default App;

import React from 'react';

export const DataContext = React.createContext('light');

export const DataProvider = DataContext.Provider;
export const DataConsumer = DataContext.Consumer;

import React from 'react';
import InputFormContainer from '../containers/InputFormContainer';
import { DataConsumer } from '../context/DataContext';

const renderMessages = (currentChannel, messages) => {
  const channelMessages = messages.filter(({ channelId }) => channelId === currentChannel);
  if (channelMessages.length === 0) return null;
  return channelMessages.map(({ message, author, id }) => (
    <div key={id}>
      <b>{ author }</b>
      <p>{ message }</p>
    </div>
  ));
};


const MainField = ({ data }) => (
  <div className="col">
    <div className="row input">
      <div className="col-lg-12">
        <InputFormContainer />
      </div>
    </div>
    <DataConsumer>
      {({ currentChannelId }) => (
        <div className="jumbotron bg-white d-flex flex-column-reverse">
          {renderMessages(currentChannelId, data)}
        </div>
      )}
    </DataConsumer>
  </div>
);

export default MainField;
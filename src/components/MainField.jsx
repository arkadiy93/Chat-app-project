import React from 'react';
import InputFormContainer from '../containers/InputFormContainer';
import { DataConsumer } from '../context/DataContext';

const renderMessages = (currentChannel, messages) => {
  const channelMessages = messages
    .filter(({ channelId }) => channelId === currentChannel)
    .reverse();
  if (channelMessages.length === 0) return null;
  return channelMessages.map(({ message, author, id }) => (
    <div key={id}>
      <b>{ author }</b>
      <p>{ message }</p>
    </div>
  ));
};


const MainField = ({ messagesData }) => (
  <div className="col">
    <div className="row input">
      <div className="col-lg-12">
        <InputFormContainer />
      </div>
    </div>
    <DataConsumer>
      {({ currentChannelId }) => (
        <div className="bg-white pre-scrollable">
          {renderMessages(currentChannelId, messagesData)}
        </div>
      )}
    </DataConsumer>
  </div>
);

export default MainField;

const host = '';

export default {
  messagesUrl: id => [host, 'api/v1/channels', id, 'messages'].join('/'),
  addChannelUrl: () => [host, 'api/v1/channels'].join('/'),
  deleteChannelUrl: id => [host, 'api/v1/channels', id].join('/'),
  renameChannelUrl: id => [host, 'api/v1/channels', id].join('/'),
};

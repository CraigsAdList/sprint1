/* eslint-disable react/jsx-one-expression-per-line */
// Should probably enable localStorage, for now it is just sick
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ChannelItem(props) {
  const { channel } = props;
  const {
    id, ownerId, showChannel, channelName, subscribers, topics, preferredReward,
  } = channel;

  function makeResponse() {

  }

  return (
    <div>
      <p>Channel id {id}</p>
      <p>Channel owner id {ownerId}</p>
      <p>Show in list flag {showChannel}</p>
      <p>Channel name {channelName}</p>
      <p>Number of subscribers {subscribers}</p>
      <p>Topics {topics}</p>
      <p>Preferred reward {preferredReward}</p>
      <p><button type="button" onClick={makeResponse}>Respond</button></p>
    </div>
  );
}
ChannelItem.defaultProps = {
  channel: PropTypes.shape({
    id: 0,
    ownerId: 0,
    showChannel: true,
    channelName: '',
    subscribers: 0,
    topics: [''],
    preferredReward: 0,
  }),
};
ChannelItem.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    ownerId: PropTypes.number.isRequired,
    showChannel: PropTypes.bool.isRequired,
    channelName: PropTypes.string.isRequired,
    subscribers: PropTypes.number.isRequired,
    topics: PropTypes.arrayOf(PropTypes.string),
    preferredReward: PropTypes.number,
  }),
};

function ListOfChannels() {
  const [channels, setChannels] = useState(Array(0));

  function getChannels() {
    // fetch channels from database
    fetch('/return_channels?for=channelsPage', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setChannels(data.channels_data);
        } else {
          throw new Error('Error while fetching channels data');
        }
      });
  }

  const listOfChannels = channels.map((channel) => <ChannelItem channel={channel} />);
  useEffect(() => { getChannels(); }, []);
  return (
    <div>
      {listOfChannels}
    </div>
  );
}

function ChannelsPage() {
  return (
    <div>
      {/* <MenuBar /> */}

      <ListOfChannels />
    </div>
  );
}

export default ChannelsPage;

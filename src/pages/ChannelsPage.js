import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import fetch from 'node-fetch';

function ChannelItem(props) {
  const { channel } = props;
  const {
    id, ownerId, showChannel, channelName, subscribers, topics, preferredReward,
  } = channel;

  function makeResponse() {

  }

  return (
    <div>
      {id}
      {ownerId}
      {showChannel}
      {channelName}
      {subscribers}
      {topics}
      {preferredReward}
      <button type="button" onClick={makeResponse}>Respond</button>
    </div>
  );
}
// ChannelItem.defaultProps = {
//   channel: PropTypes.shape({
//     id: PropTypes.number,
//     ownerId: PropTypes.number,
//     showChannel: PropTypes.bool,
//     channelName: PropTypes.string,
//     subscribers: PropTypes.string,
//     topics: PropTypes.arrayOf(PropTypes.string),
//     preferredReward: PropTypes.number,
//   }),
// };
ChannelItem.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.number.isRequired,
    ownerId: PropTypes.number.isRequired,
    showChannel: PropTypes.bool.isRequired,
    channelName: PropTypes.string.isRequired,
    subscribers: PropTypes.string.isRequired,
    topics: PropTypes.arrayOf(PropTypes.string),
    preferredReward: PropTypes.number,
  }).isRequired,
};

function ListOfChannels() {
  const [channels, setChannels] = useState(Array(0));

  function getChannels() {
    // fetch comments from database
    fetch('/get_channels', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setChannels(data);
      });
  }

  const listOfChannels = channels.map((channel) => <ChannelItem channel={channel} />);
  useEffect(() => { getChannels(); }, []);
  return (
    <div>
      Hi
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

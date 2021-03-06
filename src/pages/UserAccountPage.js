import { useEffect, useState } from 'react';

function UserAccountPage() {
  const [account, setAccount] = useState();
  const [ads, setAds] = useState([]);
  // eslint-disable-next-line no-unused-expressions
  const [channels, setChannels] = useState([]); 8

    / useEffect(() => {
      fetch('/account_info', { method: 'POST' })
        .then(((response) => response.json()
          .then((data) => {
            setAccount(data.account);
            setAds(data.ads);
            setChannels(data.channels);
          })
        ));
    }, [setAccount, setAds, setChannels]);

  function handleAdDelete(i) {
    setAds(...ads.splice(0, i), ...ads.splice(i + 1));
  }

  function handleChannelDelete(i) {
    setChannels(...channels.splice(0, i), ...channels.splice(i + 1));
  }

  return (
    <div>
      Welcome to the UserAccountPage!
      <table>
        <h2>{account}</h2>
        <h1>User Ads</h1>
        <tr>
          <p>Title:</p>
          <td>{ads.title}</td>
          <p>Topics:</p>
          <td>{ads.topic}</td>
          <p>Reward:</p>
          <td>{ads.reward}</td>
          <p>Description</p>
          <td>{ads.text}</td>
          <td><button onClick={() => handleAdDelete(ads.creator_id)} type="submit">Delete</button></td>
        </tr>
      </table>
      <table>
        <h1>User Channels</h1>
        <tr>
          <p>Channel Name:</p>
          <td>{channels.name}</td>
          <p>Subscribers:</p>
          <td>{channels.subscribers}</td>
          <p>Topics:</p>
          <td>{channels.topic}</td>
          <p>Preferred Reward:</p>
          <td>{channels.preferred_reward}</td>
          <td><button onClick={() => handleChannelDelete(channels.owner_id)} type="submit">Delete</button></td>
        </tr>
      </table>
      <ul>
        <li><a href="/">Go to AdsPage</a></li>
        <li><a href="/channels">Go to ChannelsPage</a></li>
        <li><a href="/login">Go to LoginPage</a></li>
        <li><a href="/signup">Go to SignupPage</a></li>
        <li><a href="/account_info">Go to UserAccountPage</a></li>
        <li><a href="/new_add">Go to NewAdPage</a></li>
        <li><a href="/new_channel">Go to NewChannelPage</a></li>
        <li><a href="/new_response">Go to NewResponsePage</a></li>
        <li><a href="/new_offer">Go to NewOfferPage</a></li>
      </ul>
    </div>
  );
}

export default UserAccountPage;

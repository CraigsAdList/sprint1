import { useState, useEffect, useCallback } from 'react';
import LoginErrorDialog from '../components/ui/js/LoginErrorDialog';

function NewOfferPage() {
  // const { state } = useLocation();
  // const { selected_channel_id } = state;

  const [ads, setAds] = useState([]);
  const [IsErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [ChannelName, setChannelName] = useState('');
  const [subscribers, setSubscibers] = useState('');
  const [price, setPrice] = useState('');

  const hideCloseHandler = useCallback(() => setIsErrorDialogOpen(false), []);
  const showCloseHandler = useCallback(() => setIsErrorDialogOpen(true), []);

  useEffect(() => {
    fetch('/return_channels?for=channelsPage', {
      method: 'GET',
    }).then((reponse) => reponse.json().then((data) => {
      setChannelName(data.channels_data[0].channelName);
      setSubscibers(data.channels_data[0].subscribers);
      setPrice(data.channels_data[0].preferredReward);
    }));
  }, []);

  useEffect(() => {
    fetch('/return_ads', {
      method: 'GET',
    }).then((reponse) => reponse.json().then((data) => {
      setAds(data.ads);
    }));
  }, []);

  return (
    <div>
      <div style={{ padding: '5%', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h>New Offer Page</h>
          <div>Channel Info: </div>
          <div>
            Channel Name:
            {ChannelName}
          </div>
          <div>
            Number of Subscribers:
            {subscribers}
          </div>
          <div>Topic:</div>
          <div>Prefered Contact:</div>
          <div>
            <div>
              Prederred price of ads:
              {`${price} `}
              / 1k subscribers

            </div>
          </div>
          <div>
            Message (optional):
            <form>
              <textarea
                type="text"
                style={{ resize: 'none', width: '30vw', height: '20vh' }}
              />

            </form>
          </div>
          <button type="button" onClick={showCloseHandler}>Make an Offer</button>
        </div>
        <div>
          {ads.map((i) => (
            <div>

              <div>
                <input type="checkbox" />
                creator_id:
                {i.creator_id}
              </div>
              <div>
                title:
                {i.title}
              </div>
              <div>
                topics:
                {i.topics}
              </div>
              <div>
                text:
                {i.text}
              </div>
              <div>
                reward:
                {i.reward}
              </div>
              <br />
            </div>
          ))}
        </div>
      </div>
      {IsErrorDialogOpen && (
      <LoginErrorDialog
        message="Placeholder. Will complete when Email processing is implemented"
        onCancel={hideCloseHandler}
      />
      )}
    </div>
  );
}

export default NewOfferPage;

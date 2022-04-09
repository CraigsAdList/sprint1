import { useNavigate } from 'react-router';
import { useState, useEffect, useCallback } from 'react';
import LoginErrorDialog from '../components/ui/js/LoginErrorDialog';
// import LoginErrorDialog from '../components/ui/js/LoginErrorDialog';

function NewResponsePage() {
  const navigate = useNavigate();

  // const [IsErrorDialogOpen, setIsErrorDialogOpen] = useState(false);

  // const hideCloseHandler = useCallback(() => setIsErrorDialogOpen(false), []);
  // const showCloseHandler = useCallback(() => setIsErrorDialogOpen(true), []);

  // const { state } = useLocation();
  // const { selected_channel_id } = state;

  // const [ads, setAds] = useState([]);
  const [IsErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [ChannelName, setChannelName] = useState('');
  const [subscribers, setSubscibers] = useState('');
  const [price, setPrice] = useState('');

  const hideCloseHandler = useCallback(() => setIsErrorDialogOpen(false), []);
  const showCloseHandler = useCallback(() => setIsErrorDialogOpen(true), []);

  useEffect(() => {
    fetch('/channelowner', {
      method: 'GET',
    }).then((reponse) => reponse.json().then((data) => {
      if (data.is_user_channel_owner === false) {
        navigate('/');
      }
    }));
  });

  useEffect(() => {
    fetch('/return_channels?for=channelsPage', {
      method: 'GET',
    }).then((reponse) => reponse.json().then((data) => {
      setChannelName(data.channels_data[0].channelName);
      setSubscibers(data.channels_data[0].subscribers);
      setPrice(data.channels_data[0].preferredReward);
    }));
  }, []);

  return (
    <div>
      <div style={{ padding: '5%', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h>Response Page</h>
          <div>Channel Info:</div>
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
          <button type="button" onClick={showCloseHandler}>Send a response</button>
        </div>
        <div>
          {/* ads.map((i) => (
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
          )) */}
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

export default NewResponsePage;

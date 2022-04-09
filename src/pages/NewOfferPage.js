import { useState, useEffect, useCallback } from 'react';
import LoginErrorDialog from '../components/ui/js/LoginErrorDialog';

function NewOfferPage() {
  // const { state } = useLocation();
  // const { selected_channel_id } = state;

  const [ads, setAds] = useState([]);
  const [IsErrorDialogOpen, setIsErrorDialogOpen] = useState(false);

  const hideCloseHandler = useCallback(() => setIsErrorDialogOpen(false), []);
  const showCloseHandler = useCallback(() => setIsErrorDialogOpen(true), []);

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
          <div>Channel Info:</div>
          <div>Channel Name:</div>
          <div>Number of Subscribers:</div>
          <div>Topic:</div>
          <div>Prefered Contact:</div>
          <div>
            <div>
              Prederred price of ads:
              <input type="text" />
              {' '}
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

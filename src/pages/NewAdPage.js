import { useNavigate } from 'react-router';
import { useState, useEffect, useCallback } from 'react';
import LoginErrorDialog from '../components/ui/LoginErrorDialog';

function NewAdPage() {
  const navigate = useNavigate();
  const [IsErrorDialogOpen, setIsErrorDialogOpen] = useState(false);

  const hideCloseHandler = useCallback(() => setIsErrorDialogOpen(false), []);
  const navigateBackToLogin = useCallback(() => navigate('/login'), [navigate]);

  
  function isUserLoggedIn() {
    fetch('/is_logged_in', {
      method: 'GET',
    }).then((reponse) => reponse.json().then((data) => {
      if (data.isuserloggedin === false) {
        setIsErrorDialogOpen(true);
      }
    }));
  }

  useEffect(() => {
    isUserLoggedIn();
  }, []);
  function add_ads(){
    fetch('/add_ads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'title',
        topics: 'topics',
        text: 'text',
        reward: 'reward',
       
      }),
    }).then((reponse) => reponse.json().then((data) => {
      if (data.isuserloggedin === false) {
        setIsErrorDialogOpen(true);
      }
    }));
    

  }


  return (
    <div>
      {IsErrorDialogOpen && (
      <LoginErrorDialog
        message="User isn't logged in."
        onCancel={hideCloseHandler}
        onRedirect={navigateBackToLogin}
        
      />
      )}
      <input type = "text" placeholder = "title" />
      <input type = "text" placeholder = "topics" />
      <input type = "text" placeholder = "text" />
      <input type = "text" placeholder = "reward" />
      <button onClick = {add_ads}>Add</button>
      <input type = "checkbox"  placeholder = "show my ads"/> 



       <h1>Welcome to the New Ad Page!</h1>
      <ul>
        <li><a href="/">Go to AdsPage</a></li>
        <li><a href="/channels">Go to ChannelsPage</a></li>
        <li><a href="/login">Go to LoginPage</a></li>
        <li><a href="/signup">Go to SignupPage</a></li>
        <li><a href="/acount">Go to UserAccountPage</a></li>
        <li><a href="/new_add">Go to NewAdPage</a></li>
        <li><a href="/new_channel">Go to NewChannelPage</a></li>
        <li><a href="/new_response">Go to NewResponsePage</a></li>
        <li><a href="/new_offer">Go to NewOfferPage</a></li>
      </ul>
    </div>
  )
}


export default NewAdPage;

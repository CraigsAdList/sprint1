<<<<<<< HEAD
// import { useNavigate } from 'react-router';
// import { useState, useEffect, useCallback } from 'react';
// import LoginErrorDialog from '../components/ui/LoginErrorDialog';

function NewResponsePage() {
  // Uncomment this code when Backend code is ready

  /* const navigate = useNavigate();
  const [IsErrorDialogOpen, setIsErrorDialogOpen] = useState(false);

  const hideCloseHandler = useCallback(() => setIsErrorDialogOpen(false), []);
  const navigateBackToLogin = useCallback(() => navigate('/login'), [navigate]);
  console.log(typeof (hideCloseHandler));

  function isUserLoggedIn() {
    fetch('/is_logged_in', {
      method: 'GET',
    }).then((reponse) => reponse.json().then((data) => {
      if (data.isuserloggedin === false) {
        setIsErrorDialogOpen(true);
        // console.log('not logged in');
        // navigate('/login', { state: { error: 'not_logged_in' } });
      }
    }));
  }

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  return (
    <div>
      {IsErrorDialogOpen && <LoginErrorDialog message="User isn't logged in."
      onCancel={hideCloseHandler} onRedirect={navigateBackToLogin} />}
    </div>
  ); */
  return (
    <div>
      Welcome to the LoginPage!
=======
/* eslint-disable react/jsx-one-expression-per-line */
// Should probably enable later, for now it is just useless
import { useLocation } from 'react-router-dom';
// I modified this page to illustrate how to access the data passed from ads page
// after clicking 'make an offer' button, you can edit it in any way you want

function NewResponsePage() {
  const { state } = useLocation();
  return (
    <div>
      <p>Id of the ad {state} </p>
      Welcome to the NewResponsePage!
>>>>>>> origin/main
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
  );
}

export default NewResponsePage;

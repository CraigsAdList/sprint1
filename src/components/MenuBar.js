import { useNavigate } from 'react-router';
import { useCallback, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import classes from './css/MenuBar.module.css';
import LoginErrorDialog from './ui/LoginErrorDialog';

function MenuBar() {
  const navigate = useNavigate();
  const [IsErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [RedirectFunction, setRedirectFunction] = useState({});

  const navigateBackToLogin = useCallback(() => navigate('/login'), [navigate]);
  const hideCloseHandler = useCallback(() => setIsErrorDialogOpen(false), []);

  const logOut = useCallback(() => {
    fetch('/handle_logout', {
      method: 'POST',
    }).then((reponse) => reponse.json().then((data) => {
      if (data.isuserloggedin === true) {
        setErrorMessage('Something went wrong. Please try again.');
        setIsErrorDialogOpen(true);
      } else {
        setErrorMessage('User Logged out Successfully');
        setRedirectFunction(navigateBackToLogin);
        setIsErrorDialogOpen(true);
      }
    }));
  }, [navigateBackToLogin]);
  return (
    <div>
      <header className={classes.header}>
        <div className={classes.logo}>CraigsAdList</div>
        <DropdownButton title="Menu" variant="secondary">
          <Dropdown.Item href="/">Go to AdsPage</Dropdown.Item>
          <Dropdown.Item href="/channels">Go to ChannelsPage</Dropdown.Item>
          <Dropdown.Item href="/login">Go to LoginPage</Dropdown.Item>
          <Dropdown.Item href="/signup">Go to SignupPage</Dropdown.Item>
          <Dropdown.Item href="/acount">Go to UserAccountPage</Dropdown.Item>
          <Dropdown.Item href="/new_add">Go to NewAdPage</Dropdown.Item>
          <Dropdown.Item href="/new_channel">Go to NewChannelPage</Dropdown.Item>
          <Dropdown.Item href="/new_response">Go to NewResponsePage</Dropdown.Item>
          <Dropdown.Item href="/new_offer">Go to NewOfferPage</Dropdown.Item>
          <Dropdown.Item onClick={logOut}>Log out</Dropdown.Item>
        </DropdownButton>

      </header>
      {IsErrorDialogOpen && (
      <LoginErrorDialog
        message={errorMessage}
        onCancel={hideCloseHandler}
        onRedirect={RedirectFunction}
      />
      )}

    </div>
  );
}

export default MenuBar;

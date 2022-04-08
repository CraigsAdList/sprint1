import { useNavigate } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import classes from './css/MenuBar.module.css';
import LoginErrorDialog from './ui/LoginErrorDialog';
import MenuNavigation from './MenuNavigation';

function MenuBar() {
  const navigate = useNavigate();
  const [IsErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [RedirectFunction, setRedirectFunction] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigateToAdsPage = useCallback(() => navigate('/'), [navigate]);
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

  function isUserLoggedIn() {
    fetch('/is_logged_in', {
      method: 'GET',
    }).then((reponse) => reponse.json().then((data) => {
      setIsLoggedIn(data.isuserloggedin);
    }));
  }

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  return (
    <div>
      <header className={classes.header}>
        <button type="button" className={classes.logo} onClick={navigateToAdsPage}>CraigsAdList</button>
        <DropdownButton title="Menu" variant="secondary">
          {!isLoggedIn && (
          <div>
            <Dropdown.Item>Not Logged In</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="/login">Log In</Dropdown.Item>
            <Dropdown.Item href="/signup">Sign Up</Dropdown.Item>
          </div>
          )}
          {isLoggedIn && (
          <div>
            <MenuNavigation />
            <Dropdown.Divider />
            <Dropdown.Item onClick={logOut}>Log out</Dropdown.Item>
          </div>
          )}
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

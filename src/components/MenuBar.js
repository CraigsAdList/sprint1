import { useNavigate, useLocation } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import classes from './css/MenuBar.module.css';
import LoginErrorDialog from './ui/js/LoginErrorDialog';
import MenuNavigation from './MenuNavigation';

function MenuBar() {
  const navigate = useNavigate();
  const location = useLocation();

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
        setIsLoggedIn(false);
        setRedirectFunction(navigateBackToLogin);
        setIsErrorDialogOpen(true);
      }
    }));
  }, [navigateBackToLogin]);

  useEffect(() => {
    fetch('/is_logged_in', {
      method: 'GET',
    }).then((reponse) => reponse.json().then((data) => {
      setIsLoggedIn(data.isuserloggedin);
      if (!data.isuserloggedin && location.pathname !== '/login' && location.pathname !== '/signup') {
        setErrorMessage("User isn't Logged in");
        setRedirectFunction(navigateBackToLogin);
        setIsErrorDialogOpen(true);
      }
    }));
    // need to disable linting here because useEffect would loop indefinitely
    // and slow down performance
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <header className={classes.header}>
        {isLoggedIn && <button type="button" className={classes.logo} onClick={navigateToAdsPage}>CraigsAdList</button>}
        {!isLoggedIn && <div className={classes.logo}>CraigsAdList</div>}

        <div>
          <span className={classes.menu}>
            <a href="/new_add">+</a>
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
          </span>
        </div>
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

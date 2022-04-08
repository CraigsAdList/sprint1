import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import Card from '../components/ui/js/Card';
import LoginErrorDialog from '../components/ui/js/LoginErrorDialog';

function LoginPage() {
  const [IsErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [emailText, setemailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [RedirectFunction, setRedirectFunction] = useState({});

  const navigate = useNavigate();

  const hideErrorDialog = useCallback(() => setIsErrorDialogOpen(false), []);
  const navigateToAdsPage = useCallback(() => navigate('/'), [navigate]);

  function setEmail(text) {
    setemailText(text.target.value);
  }

  function setPassword(text) {
    setPasswordText(text.target.value);
  }

  function logIn() {
    if (emailText === '' || passwordText === '') {
      setErrorMessage('Please enter your Email and Password');
      setIsErrorDialogOpen(true);
    } else {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailText, password: passwordText }),
      };
      fetch('/handle_login', requestOptions).then((reponse) => reponse.json().then((data) => {
        if (data.is_login_successful === true) {
          setErrorMessage('Log In Successful!');
          setRedirectFunction(navigateToAdsPage);
          setIsErrorDialogOpen(true);
        } else if (data.error_message === '') {
          setErrorMessage('Unable to login. Please Try again.');
          setIsErrorDialogOpen(true);
        } else {
          setErrorMessage(data.error_message);
          setIsErrorDialogOpen(true);
        }
      }));
    }
  }

  return (
    <div>
      <Card>
        <div>
          Welcome to the LoginPage!

          <div><input type="text" onChange={setEmail} placeholder="Enter Username" /></div>
          <div><input type="password" onChange={setPassword} placeholder="Enter Password" /></div>
          <button type="submit" onClick={logIn}>Submit</button>
          <div>
            Login to your account or
            {' '}
            <a href="/signup">Sign up</a>
          </div>
          {IsErrorDialogOpen && (
            <LoginErrorDialog
              message={errorMessage}
              onCancel={hideErrorDialog}
              onRedirect={RedirectFunction}
            />
          )}
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;

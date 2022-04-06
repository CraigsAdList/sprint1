import { useState, useCallback } from 'react';
// import { useNavigate } from 'react-router';
import LoginErrorDialog from '../components/ui/LoginErrorDialog';

function LoginPage() {
  const [IsErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [emailText, setemailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // const navigate = useNavigate();

  const hideErrorDialog = useCallback(() => setIsErrorDialogOpen(false), []);

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
      Welcome to the LoginPage!
      <input type="text" onChange={setEmail} placeholder="Enter Username" />
      <input type="password" onChange={setPassword} placeholder="Enter Password" />
      <button type="submit" onClick={logIn}>Submit</button>
      {IsErrorDialogOpen && (
      <LoginErrorDialog
        message={errorMessage}
        onCancel={hideErrorDialog}
      />
      )}
    </div>
  );
}

export default LoginPage;

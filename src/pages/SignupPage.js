import { useState, useCallback } from 'react';
// import { useNavigate } from 'react-router';
import LoginErrorDialog from '../components/ui/LoginErrorDialog';

function LoginPage() {
  const [IsErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [usernameText, setUsernameText] = useState('');
  const [emailText, setemailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [channelChecked, setChannelChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // const navigate = useNavigate();

  const hideErrorDialog = useCallback(() => setIsErrorDialogOpen(false), []);

  function setUsername(text) {
    setUsernameText(text.target.value);
  }

  function setEmail(text) {
    setemailText(text.target.value);
  }

  function setPassword(text) {
    setPasswordText(text.target.value);
  }

  function setChannelOwner(checkbox) {
    if (checkbox.target.checked) {
      setChannelChecked('true');
    } else {
      setChannelChecked('false');
    }
  }

  function signUp() {
    if (usernameText === '' || emailText === '' || passwordText === '') {
      setErrorMessage('Please enter all required fields correctly and fully');
      setIsErrorDialogOpen(true);
    } else {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usernameText,
          email: emailText,
          password: passwordText,
          channel_owner: channelChecked,
        }),
      };
      fetch('/handle_signup', requestOptions).then((reponse) => reponse.json().then((data) => {
        if (data.is_signup_successful === true) {
          setErrorMessage('Sign Up Successful!');
          setIsErrorDialogOpen(true);
        } else if (data.error_message === '') {
          setErrorMessage('Unable to signup. Please Try again.');
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
      Welcome to the SignupPage!
      <input type="text" onChange={setUsername} placeholder="Enter Username" />
      <input type="text" onChange={setEmail} placeholder="Enter Email" />
      <input type="text" onChange={setPassword} placeholder="Enter Password" />
      <input type="checkbox" onChange={setChannelOwner} placeholder="Enter Channel Owner" />
      <button type="submit" onClick={signUp}>Submit</button>
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

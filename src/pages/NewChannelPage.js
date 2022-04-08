import { useNavigate } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import LoginErrorDialog from '../components/ui/LoginErrorDialog';

function NewChannelPage() {
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

  return (
    <div>
      {IsErrorDialogOpen && (
      <LoginErrorDialog
        message="User isn't logged in."
        onCancel={hideCloseHandler}
        onRedirect={navigateBackToLogin}
      />
      )}
    </div>
  );
}
export default NewChannelPage;

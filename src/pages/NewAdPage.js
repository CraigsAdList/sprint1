function NewAdPage() {
  return (
    <div>
      Welcome to the NewAdPage!
      {IsErrorDialogOpen && (
      <LoginErrorDialog
        message="User isn't logged in."
        onCancel={hideCloseHandler}
        onRedirect={navigateBackToLogin}
      />
      )}
      <input type="text" placeholder="title" />
      <input type="text" placeholder="topics" />
      <input type="text" placeholder="text" />
      <input type="number" placeholder="reward" />
      <button className="popupbox" type="submit" onClick={add_ads}>Submit</button>
      <input type="checkbox" placeholder="show my ads" />
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

export default NewAdPage;

import { Dropdown, DropdownButton } from 'react-bootstrap';
<<<<<<< HEAD
import classes from './css/MenuBar.module.css';
=======
import classes from './MenuBar.module.css';
>>>>>>> origin/main

function MenuBar() {
  return (
    <div>
      <header className={classes.header}>
        <div className={classes.logo}>CraigsAdList</div>
        <DropdownButton title="Menu" variant="secondary">
          <Dropdown.Item href="/">Go to AdsPage</Dropdown.Item>
          <Dropdown.Item href="/channels">Go to ChannelsPage</Dropdown.Item>
<<<<<<< HEAD
          <Dropdown.Item href="/handle_login">Go to LoginPage</Dropdown.Item>
          <Dropdown.Item href="/handle_signup">Go to SignupPage</Dropdown.Item>
=======
          <Dropdown.Item href="/login">Go to LoginPage</Dropdown.Item>
          <Dropdown.Item href="/signup">Go to SignupPage</Dropdown.Item>
>>>>>>> origin/main
          <Dropdown.Item href="/acount">Go to UserAccountPage</Dropdown.Item>
          <Dropdown.Item href="/new_add">Go to NewAdPage</Dropdown.Item>
          <Dropdown.Item href="/new_channel">Go to NewChannelPage</Dropdown.Item>
          <Dropdown.Item href="/new_response">Go to NewResponsePage</Dropdown.Item>
          <Dropdown.Item href="/new_offer">Go to NewOfferPage</Dropdown.Item>
        </DropdownButton>

      </header>

    </div>
  );
}

export default MenuBar;

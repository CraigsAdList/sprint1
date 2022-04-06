import { Dropdown, DropdownButton } from 'react-bootstrap';
import classes from './css/MenuBar.module.css';

function MenuBar() {
  return (
    <div>
      <header className={classes.header}>
        <div className={classes.logo}>CraigsAdList</div>
        <DropdownButton title="Menu" variant="secondary">
          <Dropdown.Item href="/">Go to AdsPage</Dropdown.Item>
          <Dropdown.Item href="/channels">Go to ChannelsPage</Dropdown.Item>
          <Dropdown.Item href="/handle_login">Go to LoginPage</Dropdown.Item>
          <Dropdown.Item href="/handle_signup">Go to SignupPage</Dropdown.Item>
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

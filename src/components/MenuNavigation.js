import { Dropdown } from 'react-bootstrap';

function MenuNavigation() {
  return (
    <div>
      <Dropdown.Item href="/">Go to AdsPage</Dropdown.Item>
      <Dropdown.Item href="/channels">Go to ChannelsPage</Dropdown.Item>
      <Dropdown.Item href="/acount">Go to UserAccountPage</Dropdown.Item>
      <Dropdown.Item href="/new_add">Go to NewAdPage</Dropdown.Item>
      <Dropdown.Item href="/new_channel">Go to NewChannelPage</Dropdown.Item>
      <Dropdown.Item href="/new_response">Go to NewResponsePage</Dropdown.Item>
      <Dropdown.Item href="/new_offer">Go to NewOfferPage</Dropdown.Item>
    </div>
  );
}

export default MenuNavigation;

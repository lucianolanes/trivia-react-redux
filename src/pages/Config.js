import React from 'react';
import Button from '../components/Button';

class Config extends React.Component {
  render() {
    return (
      <div className="settingsContainer">
        <h2 data-testid="settings-title">You can&apos;t seem to make up your mind</h2>
        <h2>I think you better close it.</h2>
        <Button text="GUIDE ME TO THE PURPLE RAIN" linkTo="/" className="guide-me-btn" />
      </div>
    );
  }
}

export default Config;

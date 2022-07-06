// Framework and third-party non-ui
import React from 'react';

// App components

// JSON & Styles
import { NoMatchLayout } from './NoMatch-styled';

// Third-party components (buttons, icons, etc.)

function NoMatch() {
  return (
    <NoMatchLayout>
      <h2>Uh oh! You've requested a page that doesn't exist.</h2>
      <p>You may have clicked an old link or have a typo in your URL.</p>
    </NoMatchLayout>
  );
}

export default NoMatch;

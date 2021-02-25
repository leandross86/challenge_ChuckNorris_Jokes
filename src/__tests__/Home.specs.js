import { render } from '@testing-library/react';
import React from 'react';
import Home from '../pages/Home';

describe('Home app', () => {
  it('Find repo', () => {
    const { debug } = render(<Home />);
    debug();
  });
});
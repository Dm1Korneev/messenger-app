import { render, screen } from '@testing-library/react';

import { Main } from './Main';

test('renders learn react link', () => {
  render(<Main />);
  const signInButton = screen.getByRole('button', { name: 'Sign in' });
  expect(signInButton).toBeInTheDocument();
});

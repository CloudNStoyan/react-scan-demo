import { cleanup, render, screen } from '@testing-library/react';
// Different than jest. Globals are off by default.
import { afterEach, expect, test } from 'vitest';

import { App } from './App';

afterEach(() => {
  cleanup(); // Different than jest. RTL cleanup doesn't happen by default.
});

test('App renders data', () => {
  render(<App />, {});
  expect(screen.getByText('Todo List')).toBeInTheDocument();
});

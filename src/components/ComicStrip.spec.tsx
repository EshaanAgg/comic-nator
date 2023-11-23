import { render } from '@testing-library/react';
import { ComicStrip } from './ComicStrip';

test('renders without crashing', () => {
  render(<ComicStrip />);
});
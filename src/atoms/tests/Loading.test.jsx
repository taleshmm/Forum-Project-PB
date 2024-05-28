import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Loading from '../Loading';

describe('Loading component', () => {
  it('renders with default color when no color is provided', () => {
    const { container } = render(<Loading />);
    const loader = container.querySelector('.loader');

    expect(loader).toBeInTheDocument();
    expect(loader).toHaveStyle('border-bottom-color: #cbd5e0');
  });

  it('renders with provided color', () => {
    const { container } = render(<Loading colorLoad="#ff0000" />);
    const loader = container.querySelector('.loader');

    expect(loader).toBeInTheDocument();
    expect(loader).toHaveStyle('border-bottom-color: #ff0000');
  });
});

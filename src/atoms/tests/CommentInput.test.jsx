import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CommentInput from '../CommentInput';

describe('CommentInput', () => {
  it('should render input fields and a button', () => {
    const { getByPlaceholderText, getByLabelText, getByText } = render(
      <CommentInput onSubmit={() => {}} />
    );

    expect(getByPlaceholderText('Autor')).toBeInTheDocument();
    expect(getByLabelText('Escreva um comentário')).toBeInTheDocument();
    expect(getByText('Comentar')).toBeInTheDocument();
  });

  it('should update state when typing in input fields', () => {
    const { getByPlaceholderText, getByLabelText } = render(
      <CommentInput onSubmit={() => {}} />
    );

    const authorInput = getByPlaceholderText('Autor');
    const commentTextarea = getByLabelText('Escreva um comentário');

    fireEvent.change(authorInput, { target: { value: 'John' } });
    fireEvent.change(commentTextarea, { target: { value: 'This is a test comment' } });

    expect(authorInput.value).toBe('John');
    expect(commentTextarea.value).toBe('This is a test comment');
  });

  it('should call onSubmit callback with correct data when form is submitted', () => {
    const handleSubmit = jest.fn();
    const { getByPlaceholderText, getByLabelText, getByText } = render(
      <CommentInput onSubmit={handleSubmit} />
    );

    const authorInput = getByPlaceholderText('Autor');
    const commentTextarea = getByLabelText('Escreva um comentário');
    const submitButton = getByText('Comentar');

    fireEvent.change(authorInput, { target: { value: 'John' } });
    fireEvent.change(commentTextarea, { target: { value: 'This is a test comment' } });
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      text: 'This is a test comment',
      by: 'John',
      id: expect.any(Number),
    });
  });
});

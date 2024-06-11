import React, { useState } from 'react';
import '../atoms/styles/CommentInput.css';

export default function CommentInput({ onSubmit }) {
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('');

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      text: comment,
      by: author,
      id: parseInt((Math.random() * 100000).toFixed(5)),
    });
    setComment('');
    setAuthor('');
  };

  return (
    <div className="comment-container">
      <label htmlFor="comment" className="label">
        Escreva um comentário
      </label>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Autor"
          className="input-text"
          value={author}
          onChange={handleAuthor}
        />
        <textarea
          id="comment"
          className="textarea"
          rows="4"
          value={comment}
          onChange={handleChange}
          placeholder="Digite seu comentário aqui..."
        />
        <button type="submit" className="button">
          Comentar
        </button>
      </form>
    </div>
  );
}

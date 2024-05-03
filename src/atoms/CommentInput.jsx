/* eslint-disable react/prop-types */
import { useState } from 'react';

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
    <div className="bg-gray-800 rounded-xl p-4 my-4">
      <label
        htmlFor="comment"
        className="block text-sm font-medium text-gray-400 mb-2"
      >
        Escreva um comentário
      </label>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Autor"
          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:border-blue-500 mb-4"
          value={author}
          onChange={handleAuthor}
        ></input>
        <textarea
          id="comment"
          className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:border-blue-500"
          rows="4"
          value={comment}
          onChange={handleChange}
          placeholder="Digite seu comentário aqui..."
        ></textarea>
        <button
          type="submit"
          className="mt-2 bg-zinc-300 hover:bg-green-500 text-black font-semibold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600"
        >
          Comentar
        </button>
      </form>
    </div>
  );
}

import React from 'react';
import '../atoms/styles/Loading.css';

export default function Loading({ colorLoad }) {
  return (
    <div className="loader-container">
      <div
        className="loader"
        style={{ borderBottomColor: colorLoad ? colorLoad : '#cbd5e0' }}
      ></div>
    </div>
  );
}

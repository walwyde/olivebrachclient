import React from "react";

const Input = ({ name, label, type, onChange, value, error }) => {
  return (
    <div className="input-field">
      <input
        value={value}
        type={type}
        name={name}
        id={name}
        onChange={onChange}
      />
      <label htmlFor={name}>{label}</label>
      {error && <div className="red-accent-4 yellow-text">{error}</div>}
    </div>
  );
};

export default Input;

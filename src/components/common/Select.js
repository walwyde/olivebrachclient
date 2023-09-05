import React from "react";

const Select = ({ options, label, name, error, ...rest }) => {
  return (
    <div className="input-field">
      <select name={name} id={name} {...rest}>
        {options.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <label htmlFor={name}>{label}</label>

      {error && <div className="yellow-text">{error}</div>}
    </div>
  );
};

export default Select;

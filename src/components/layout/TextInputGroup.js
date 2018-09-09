import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextInputGroup = ({
  label,
  name,
  value,
  type,
  placeholder,
  onChange,
  error
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextInputGroup.defaultProps = {
  type: "text"
};

TextInputGroup.propTyped = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
};

export default TextInputGroup;

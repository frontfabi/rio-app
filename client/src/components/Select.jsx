import React from "react"
import PropTypes from 'prop-types'
import Label from './Label'

const Select = (
  {
    label,
    error,
    name,
    firstValue,
    children,
    register,
    isLoading = false,
  }) => (
    <div className="field">
      <Label>{label}</Label>
      <div className="control">
        <div className={`select ${error ? "is-focused is-danger" : ""} ${isLoading ? "is-loading" : ""}`}>
          <select name={name} ref={register}>
            <option value="">{firstValue}</option>
            {children}
          </select>
        </div>
        {error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  )

Select.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  firstValue: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  register: PropTypes.func.isRequired
}

export default Select

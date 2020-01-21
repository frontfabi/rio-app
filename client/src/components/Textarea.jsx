import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

const StyledLabel = styled.label`
 color: #fc9b44;
font-weight: 500;
`

const Textarea = ({ placeholder, label, rows, register, error, name }) => {
  return (
    <div className="field">
      <StyledLabel className="label">{label}</StyledLabel>
      <div className={`control ${error ? "has-icons-right" : ""}`}>
        <textarea
          className={`textarea ${error ? "is-danger" : ""}`}
          placeholder={placeholder}
          rows={rows}
          ref={register}
          name={name}
        >
        </textarea>
        {error && (
          <span className="icon is-right is-small">
            <i className="fas fa-exclamation-triangle" />
          </span>
        )}
        {error &&
          <p className="help is-danger">
            {error}
          </p>
        }
      </div>
    </div>
  )
}

Textarea.propTypes = {
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  label: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string
}

Textarea.defaultProps = {
  rows: 5
}

export default Textarea
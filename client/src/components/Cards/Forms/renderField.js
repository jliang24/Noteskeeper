import React from 'react';

const renderField = ({ input, label, type, meta: { touched, error}}) => {
  return (
    <div>
      <label className="ml-1 mb-0">{label}</label>
      <div>
        <input autocomplete="off" style={{width:'90%'}} className="form-control border border-secondary m-1" {...input} type={type} />
        {touched && error}
      </div>
    </div>
  )
}

export default renderField; 
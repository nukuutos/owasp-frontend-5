import React from 'react';
import { useField } from 'formik';

export const Input = ({ className, ...props }) => {
  const [field, meta] = useField(props);

  const errorClass = meta.error && meta.touched ? ' input--error' : '';

  className += errorClass;

  return <input className={className} {...field} {...props} />;
};

export default Input;

import React from 'react';
import Select from 'react-select';

export default function MultipleSelect ({ options, selectedOptions, onChange }) {
  return (
    <Select
      isMulti
      options={options}
      value={selectedOptions}
      onChange={onChange}
    />
  );
}



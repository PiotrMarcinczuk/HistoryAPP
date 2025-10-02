import * as React from 'react';
import { useIntl } from 'react-intl';

const Input = React.forwardRef((props, ref) => {
  const { attribute, disabled, intlLabel, name, onChange, required, value } = props;
  const { formatMessage } = useIntl();

  const handleChange = (e) => {
    onChange({
      target: {
        name,
        type: attribute.type,
        value: e.currentTarget.value,
      },
    });
  };

  return (
    <div>
      <label htmlFor={name}>{formatMessage(intlLabel)}</label>
      <input
        id={name}
        ref={ref}
        name={name}
        type="text"
        disabled={disabled}
        value={value || ''}
        required={required}
        onChange={handleChange}
      />
    </div>
  );
});

export default Input;

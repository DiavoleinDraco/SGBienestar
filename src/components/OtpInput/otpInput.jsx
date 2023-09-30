
import React, { useState } from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';

export default function OtpInput({ length, onChange }) {
  const [otpValue, setOtpValue] = useState('');

  // Esta función manejará los cambios en el valor del OTP
  const handleOtpChange = (newValue) => {
    setOtpValue(newValue);
    onChange(newValue);
  };

  return (
    <MuiOtpInput length={length} onChange={handleOtpChange} value={otpValue} />
  );
}
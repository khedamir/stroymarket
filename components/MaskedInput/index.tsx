import React, { FC, useEffect, useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import Input from '../Input';

interface MaskedInputProps {
  control: any;
  sent: boolean;
  name: string;
  rules: any;
  mask: string;
  type?: string;
  placeholder?: string;
}

const MaskedInput: FC<MaskedInputProps> = ({ control, sent, name, rules, mask, type, placeholder }) => {
  const [showMask, setShowMask] = useState(false);

  useEffect(() => {
    setShowMask(true);
  }, []);
  return useMemo(() => {
    if (showMask) {
      return (
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <InputMask readOnly={sent} mask={mask} id={name} {...field}>
              <Input placeholder={placeholder} type={type} {...field} />
            </InputMask>
          )}
        />
      );
    }
    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => <Input placeholder={placeholder} id={name} type={type} {...field} />}
      />
    );
  }, [control, mask, name, placeholder, rules, sent, showMask, type]);
};

export default MaskedInput;

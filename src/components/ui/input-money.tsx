import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import InputMask from 'react-input-mask';

interface MoneyProps {
  defaultValue: string;
  onChange: (value: string) => void;
  [key: string]: any;
}

const InputMoney: React.FC<MoneyProps> = ({ defaultValue, onChange, ...props }) => {
  const [mask, setMask] = useState<string>("99,99");

  const handleMoneyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Remove todos os caracteres não numéricos
    let value = event.target.value.replace(/[^\d,]/g, '');
    // Substitui ',' por '.' para manter como float
    value = value.replace(/,/g, '.');
    onChange(value);
    
  };

  const maskToCurrency = ({ nextState }: any) => {
    const { value } = nextState || {}
  
    let amountFormatted = value?.replace?.(/\D/g, '')
    amountFormatted = amountFormatted?.replace?.(/^0+/g, '')

    if (!amountFormatted) {
      return {
        ...nextState,
        value: `R$ 0,0`,
        selection: {
          start: 5,
          end: 5
        }
      };
    }
  
    if (amountFormatted?.length <= 2) {
      return {
        ...nextState,
        value: `R$ 0,${amountFormatted}`
      }
    }
  
    const amountFormattedWithComma = amountFormatted?.replace?.(
      /(?=\d{2})(\d{2})$/,
      ',$1'
    )
    const amountFormattedWithDot = amountFormattedWithComma?.replace?.(
      /(\d)(?=(\d{3})+(?!\d))/g,
      '$1.'
    )
  
    if (amountFormattedWithDot) {
      return {
        ...nextState,
        value: `R$ ${amountFormattedWithDot}`,
        selection: {
          start: amountFormattedWithDot.length + 3,
          end: amountFormattedWithDot.length + 3
        }
      }
    }
  
    return nextState
  }

  return (
    <InputMask
      mask="R$ 9999999999" // Don't use dots and commas
      alwaysShowMask={false}
      beforeMaskedStateChange={maskToCurrency}
      placeholder="R$ 0,00"
      value={defaultValue}
      onChange={handleMoneyChange}
      {...props}
    >
      <Input />
    </InputMask>
  );
};

export default InputMoney;

  

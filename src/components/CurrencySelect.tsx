import React from "react";

interface Currency {
  id: string;
  name: string;
}

interface CurrencySelectProps {
  currencies: Currency[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  currencies,
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <div>
      <select
        className="w-full py-2 px-2 border border-gray-300 bg-black rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required
      >
        <option value="">Select currency</option>
        {currencies.map((currency) => (
          <option key={currency.id} value={currency.id}>
            {currency.name} ({currency.id})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelect;

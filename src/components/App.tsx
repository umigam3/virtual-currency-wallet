import Header from "./Header";
import CurrencySelect from "./CurrencySelect";
import { useState } from "react";
import useFetchCurrencies from "../hooks/useFetchCurrencies";
import useFetchCurrenciesRates from "../hooks/useFetchCurrencyRates";

interface ConversionResult {
  currency: string;
  rate: number;
  converted: number;
}

function App() {
  const { currencies, error } = useFetchCurrencies();
  const { currencyRates, errorRates } = useFetchCurrenciesRates();
  const [amount, setAmount] = useState<number>(0);
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([
    "",
    "",
    "",
  ]);
  const [results, setResults] = useState<ConversionResult[]>([]);

  const handleSelectChange = (index: number, value: string) => {
    const updated = [...selectedCurrencies];
    updated[index] = value;
    setSelectedCurrencies(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedRates = selectedCurrencies
      .filter((cur) => cur !== "") // evita vacíos
      .map((cur) => {
        const rate = parseFloat(currencyRates[cur]);
        return {
          currency: cur,
          rate,
          converted: amount * rate,
        };
      });

    setResults(selectedRates);
  };

  const disabled = !!error || !!errorRates;

  return (
    <main className="w-full h-screen max-w-5xl mx-auto px-6">
      <Header />
      <form onSubmit={handleSubmit} className="space-y-6 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div className="md:col-start-2">
            <label>From (EUR)</label>
            <div className="relative">
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                €
              </span>
              <input
                type="number"
                value={amount}
                min={0}
                disabled={disabled}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                className="w-full pr-8 pl-2 py-2 border border-gray-300 bg-black text-white rounded"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <CurrencySelect
              key={i}
              currencies={currencies}
              value={selectedCurrencies[i]}
              onChange={(value) => handleSelectChange(i, value)}
              disabled={disabled}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            disabled={disabled}
          >
            See exchange rates
          </button>
        </div>
      </form>

      {error && (
        <div className="text-red-600 bg-red-100 border border-red-300 rounded-xl px-4 py-2 mb-4 text-center">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-6 bg-green-700 border border-black-300 rounded-lg p-4">
          <span className="text-lg font-semibold">Conversion results:</span>
          <ul className="space-y-2">
            {results.map((r) => (
              <li key={r.currency}>
                <span className="font-medium">
                  {r.converted.toFixed(2)} {r.currency}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}

export default App;

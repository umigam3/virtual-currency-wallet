import Header from "./Header";
import CurrencySelect from "./CurrencySelect";
import { useState } from "react";
import useFetchCurrencies from "../hooks/useFetchCurrencies";
import useFetchCurrenciesRates from "../hooks/useFetchCurrencyRates";
import CirclePlus from "./ui/CirclePlus";
import Trash from "./ui/Trash";

interface ConversionResult {
  currency: string;
  converted: number;
}

function App() {
  const { currencies, error } = useFetchCurrencies();
  const { currencyRates, errorRates } = useFetchCurrenciesRates();
  const [amount, setAmount] = useState("");
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([""]);
  const [results, setResults] = useState<ConversionResult[]>([]);

  const addCurrency = () => {
    if (selectedCurrencies.length < 3) {
      setSelectedCurrencies([...selectedCurrencies, ""]);
    }
  };

  const removeCurrency = (index: number) => {
    if (selectedCurrencies.length > 1) {
      const updated = selectedCurrencies.filter((_, i) => i !== index);
      setSelectedCurrencies(updated);
    }
  };

  const handleSelectChange = (index: number, value: string) => {
    const updated = [...selectedCurrencies];
    updated[index] = value;
    setSelectedCurrencies(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedRates = selectedCurrencies
      .filter((cur) => cur !== "")
      .map((cur) => {
        const rate = parseFloat(currencyRates[cur]);
        return {
          currency: cur,
          converted: parseFloat(amount) * rate,
        };
      });

    setResults(selectedRates);
  };

  const disabled = !!error || !!errorRates;

  return (
    <>
      <Header />
      <main className="w-full flex flex-col max-w-5xl mx-auto relative">
        <form onSubmit={handleSubmit} className="mb-10 px-6 max-w-xl mx-auto">
          <div className="mb-4">
            <div className="md:col-start-2">
              <label>Enter amount (EUR)</label>
              <div className="relative">
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  €
                </span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0"
                  value={amount}
                  min={0}
                  disabled={disabled}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pr-8 pl-2 py-2 border border-gray-300 bg-black text-white rounded"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col mx-auto max-w-full">
            {selectedCurrencies.map((value, i) => (
              <div className="w-full">
                <label>To</label>
                <div
                  key={i}
                  className="flex items-center justify-center gap-2 mb-3"
                >
                  <CurrencySelect
                    currencies={currencies}
                    value={value}
                    onChange={(val) => handleSelectChange(i, val)}
                    disabled={disabled}
                  />
                  {selectedCurrencies.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCurrency(i)}
                      className="cursor-pointer"
                      disabled={disabled}
                    >
                      <Trash />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {selectedCurrencies.length < 3 && (
            <div className="flex items-center">
              <button
                type="button"
                onClick={addCurrency}
                className="flex text-sm items-center gap-2 py-2 cursor-pointer -mt-2"
                disabled={disabled}
              >
                <CirclePlus />
                <span>Add exchange currency</span>
              </button>
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
              disabled={disabled}
            >
              See exchange rates
            </button>
          </div>
        </form>

        {(error || errorRates) && (
          <div className="text-red-600 bg-red-100 border border-red-300 rounded-xl px-4 py-2 mb-4 text-center space-y-1">
            {error && <div>{error}</div>}
            {errorRates && <div>{errorRates}</div>}
          </div>
        )}

        {results.length > 0 && (
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 m-6 shadow-md text-white">
            <h2 className="text-center text-xl md:text-xl font-semibold mb-6">
              {amount} EUR is equivalent to:
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
              {results.map((r) => (
                <div
                  key={r.currency}
                  className={`
            bg-gray-800 p-6 rounded-lg shadow-inner flex flex-col items-center justify-center
            ${results.length === 1 ? "w-full md:w-2/3" : ""}
            ${results.length === 2 ? "w-full sm:w-[45%]" : ""}
            ${results.length === 3 ? "w-full sm:w-[30%]" : ""}
          `}
                >
                  <span className="text-4xl font-bold">
                    {r.converted.toFixed(2)}
                  </span>
                  <span className="text-lg text-gray-300 mt-1">
                    {r.currency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;

import { useState, useEffect } from "react";

const useFetchCurrenciesRates = () => {
  const [currencyRates, setCurrencyRates] = useState<Record<string, string>>(
    {}
  );
  const [errorRates, setErrorRates] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrenciesRates = async () => {
      try {
        const res = await fetch(
          "https://api.coinbase.com/v2/exchange-rates?currency=EUR"
        );
        const data = await res.json();
        setCurrencyRates(data.data.rates);
      } catch (err) {
        setErrorRates("No se pudieron cargar las divisas correctamente.");
      }
    };

    fetchCurrenciesRates();
  }, []);

  return { currencyRates, errorRates };
};

export default useFetchCurrenciesRates;

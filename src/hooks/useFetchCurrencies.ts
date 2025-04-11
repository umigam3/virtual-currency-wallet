import { useState, useEffect } from "react";

const useFetchCurrencies = () => {
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await fetch("https://api.coinbase.com/v2/currencies");
        const data = await res.json();
        setCurrencies(data.data);
      } catch (err) {
        setError("No se pudieron cargar las divisas.");
      }
    };

    fetchCurrencies();
  }, []);

  return { currencies, error };
};

export default useFetchCurrencies;

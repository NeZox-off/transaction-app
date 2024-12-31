import { useState } from "react";

export type CurrencyType = "UAH" | "USD" | "PLN" | "EUR";
export type RatesType = {
  UAH: number;
  PLN: number;
  USD: number;
  EUR: number;
};

export const useTransition = () => {
  const [fromAmount, setFromAmount] = useState<number>(1);
  const [toAmount, setToAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<CurrencyType>("UAH");
  const [toCurrency, setToCurrency] = useState<CurrencyType>("PLN");

  const [currentRates, setCurrentRates] = useState<RatesType>({
    EUR: 0.95,
    PLN: 4.05,
    UAH: 41.8,
    USD: 1,
  });

  function setRates(baseCurrency: CurrencyType): RatesType {
    switch (baseCurrency) {
      case "EUR":
        return {
          USD: 1.031,
          UAH: 43.47,
          PLN: 4.21,
          EUR: 1,
        };
      case "UAH":
        return {
          USD: 42.3728,
          UAH: 1,
          PLN: 10.3734,
          EUR: 44.2477,
        };
      case "PLN":
        return {
          USD: 0.2387,
          UAH: 10.17,
          PLN: 1,
          EUR: 0.2304,
        };
      default:
        return {
          EUR: 0.95,
          PLN: 4.05,
          UAH: 41.8,
          USD: 1,
        };
    }
  }

  function converter(
    value: number,
    currencyFrom: CurrencyType,
    currencyTo: CurrencyType
  ) {
    const amountInUSD = value / currentRates[currencyFrom];
    const convertedAmount = parseFloat(
      (amountInUSD * currentRates[currencyTo]).toFixed(3)
    );
    return convertedAmount;
  }

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFromAmount = parseFloat(e.target.value) || 0;
    setFromAmount(newFromAmount);
    const newToAmount = converter(newFromAmount, fromCurrency, toCurrency);
    setToAmount(newToAmount);
  };

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newToAmount = parseFloat(e.target.value) || 0;
    setToAmount(newToAmount);
    const newFromAmount = converter(newToAmount, toCurrency, fromCurrency);
    setFromAmount(newFromAmount);
  };

  const handleFromCurrencyChange = (value: CurrencyType) => {
    setFromCurrency(value);
    setCurrentRates(setRates(value));

    const newFromAmount = converter(toAmount, toCurrency, value);
    setFromAmount(newFromAmount);
  };

  const handleToCurrencyChange = (value: CurrencyType) => {
    setToCurrency(value);
    setCurrentRates(setRates(value));

    const newToAmount = converter(fromAmount, fromCurrency, value);
    setToAmount(newToAmount);
  };

  return {
    currentRates,
    fromAmount,
    toAmount,
    fromCurrency,
    toCurrency,
    handleFromAmountChange,
    handleToAmountChange,
    handleFromCurrencyChange,
    handleToCurrencyChange,
  };
};

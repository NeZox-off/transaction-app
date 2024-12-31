import { CurrencyCodeEnum, ExchangeRatesEnum } from "../types/types";

export type SeedsType = {
  id: number;
  operation: "buy" | "sell";
  fromCurrency: {
    currency: "UAH" | "USD" | "PLN" | "EUR" | null;
    amount: number;
  };
  toCurrency: {
    currency: "UAH" | "USD" | "PLN" | "EUR" | null;
    amount: number;
  };
  course: ExchangeRatesEnum | null;
  time: Date | null;
  clientPhone: number | null;
};

export const seeds: SeedsType[] = [
  {
    id: 1,
    operation: "buy",
    fromCurrency: {
      currency: CurrencyCodeEnum.UAH,
      amount: 1200,
    },
    toCurrency: {
      currency: CurrencyCodeEnum.USD,
      amount: 1200,
    },
    course: ExchangeRatesEnum.UAH,
    time: new Date(),
    clientPhone: 380663217698,
  },
];

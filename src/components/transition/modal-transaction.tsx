import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { seeds, SeedsType } from "@/src/seeds/seeds";
import { useTransition } from "@/src/hooks/useTransition";

interface ModalTransactionProps {
  setTransactions: (data: SeedsType[]) => void;
  transaction: SeedsType[];
}

const ModalTransition = ({
  transaction,
  setTransactions,
}: ModalTransactionProps) => {
  const [sumFromClient, setSumFromClient] = useState("");
  const [phoneNum, setPhoneNum] = useState<string>("");
  const phoneRegex = /^\+\d{3}\s?\d{2}\s?\d{3}\s?\d{4,5}$/;
  const [operation, setOperation] = useState<"buy" | "sell" | null>(null);
  const [show, setShow] = useState(false);
  const {
    handleFromAmountChange,
    handleToAmountChange,
    handleFromCurrencyChange,
    handleToCurrencyChange,
    toCurrency,
    fromCurrency,
    toAmount,
    fromAmount,
    currentRates,
  } = useTransition();

  function onSubmit(e: any) {
    e.preventDefault();
    console.log({
      id: seeds.length + 1,
      operation: operation!,
      fromCurrency: {
        currency: fromCurrency,
        amount: fromAmount,
      },
      toCurrency: {
        currency: toCurrency,
        amount: toAmount,
      },
      time: new Date(),
      course: currentRates[fromCurrency],
      clientPhone: Number(phoneNum),
    });

    setTransactions([
      ...transaction,
      {
        id: seeds.length + 1,
        operation: operation!,
        fromCurrency: {
          currency: fromCurrency,
          amount: fromAmount,
        },
        toCurrency: {
          currency: toCurrency,
          amount: toAmount,
        },
        time: new Date(),
        course: currentRates[fromCurrency],
        clientPhone: Number(phoneNum),
      },
    ]);
    setShow(false);
  }

  const isSaveDisabled =
    !operation ||
    !fromCurrency ||
    !toCurrency ||
    fromAmount <= 0 ||
    toAmount <= 0 ||
    phoneRegex.test(phoneNum);

  return (
    <Dialog onOpenChange={setShow} open={show}>
      <DialogTrigger asChild>
        <Button size={"sm"}>Додати</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-zinc-700 border-white/10">
        <form onSubmit={onSubmit}>
          <DialogTitle className="mb-2">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-center mb-3">Валюта 1</p>
                <div className="flex flex-col gap-3">
                  <Select
                    value={fromCurrency}
                    onValueChange={(value: "EUR" | "PLN" | "USD" | "UAH") =>
                      handleFromCurrencyChange(value)
                    }
                  >
                    <SelectTrigger className="w-full bg-[#171717] border-white/10">
                      <SelectValue
                        placeholder="Обрати валюту"
                        className="text-white/40"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-[#171717] border-white/10">
                      <SelectItem value="UAH">UAH</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="PLN">PLN</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    onChange={(e) => handleFromAmountChange(e)}
                    value={fromAmount}
                  />
                </div>
              </div>
              <div>
                <p className="text-center mb-3">Валюта 2</p>
                <div className="flex flex-col gap-3">
                  <Select
                    value={toCurrency}
                    onValueChange={(value: "UAH" | "EUR" | "PLN" | "USD") =>
                      handleToCurrencyChange(value)
                    }
                  >
                    <SelectTrigger className="w-full bg-[#171717] border-white/10">
                      <SelectValue
                        placeholder="Обрати валюту"
                        className="text-white/40"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-[#171717] border-white/10">
                      <SelectItem value="UAH">UAH</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="PLN">PLN</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    onChange={(e) => handleToAmountChange(e)}
                    value={toAmount}
                  />
                </div>
              </div>
            </div>
          </DialogTitle>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="operation">Операція</Label>
              <Select
                onValueChange={(value: "buy" | "sell") => setOperation(value)}
              >
                <SelectTrigger
                  id="operation"
                  className="w-[300px] bg-[#171717] border-white/10"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#171717] border-white/10">
                  <SelectItem value="buy">Купити</SelectItem>
                  <SelectItem value="sell">Продати</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="sum">Сума</Label>
              <Input
                id="sum"
                className="w-[300px]"
                type="number"
                onChange={(e) => handleFromAmountChange(e)}
                value={fromAmount}
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="course">Курс</Label>
              <Input
                id="course"
                className="w-[300px]"
                disabled
                value={currentRates[fromCurrency]}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sum-from-client" className="w-20">
                Сума від клієнта
              </Label>
              <Input
                id="sum-from-client"
                className="w-[300px]"
                type="number"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSumFromClient(e.target.value)
                }
                value={sumFromClient}
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="client">Клієнт</Label>
              <Input
                id="client"
                className="w-[300px]"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPhoneNum(e.target.value)
                }
                value={phoneNum}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="comment">Коментар</Label>
            <Input id="comment" />
          </div>

          <DialogFooter className="sm:justify-center sm:items-center sm:flex-col gap-3">
            <div className="w-full">
              <p>Сума до виплати: {fromAmount}</p>
              <p>Здача: {parseFloat(sumFromClient) - fromAmount}</p>
            </div>
            <DialogClose asChild>
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600 px-5 w-40"
                disabled={isSaveDisabled}
              >
                Сохранити
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalTransition;

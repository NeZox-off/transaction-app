import ModalTransition from "@/src/components/transition/modal-transaction";
import { Button } from "@/src/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { cn } from "@/src/lib/cn";
import { seeds } from "@/src/seeds/seeds";
import { useState } from "react";

interface TransactionsProps {}

const Transactions = ({}: TransactionsProps) => {
  const [transactions, setTransactions] = useState(seeds);
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button size={"sm"}>Пошук</Button>
        </div>
        <ModalTransition
          transaction={transactions}
          setTransactions={setTransactions}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Операція</TableHead>
            <TableHead className="text-center">Валюта 1</TableHead>
            <TableHead className="text-center">Сума 1</TableHead>
            <TableHead className="text-center">Валюта 2</TableHead>
            <TableHead className="text-center">Сума 2</TableHead>
            <TableHead className="text-center">Курс</TableHead>
            <TableHead className="text-center">Час</TableHead>
            <TableHead className="text-center">Клієнт</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} className="font-medium">
              <TableCell
                className={cn(
                  "text-center",
                  transaction.operation === "buy" ? "bg-lime-600" : "bg-red-600"
                )}
              >
                {transaction.operation === "buy" ? "Купувати" : "Продаж"}
              </TableCell>
              <TableCell className="text-center">
                {transaction.fromCurrency.currency}
              </TableCell>
              <TableCell className="text-center">
                {transaction.fromCurrency.amount}
              </TableCell>
              <TableCell className="text-center">
                {transaction.toCurrency.currency}
              </TableCell>
              <TableCell className="text-center">
                {transaction.toCurrency.amount}
              </TableCell>
              <TableCell className="text-center">
                {new Intl.NumberFormat("es-ES", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }).format(transaction?.course)}
              </TableCell>
              <TableCell className="text-center">
                {transaction?.time?.toLocaleDateString("en-US")}
              </TableCell>
              <TableCell className="text-center">
                {transaction.clientPhone}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Transactions;

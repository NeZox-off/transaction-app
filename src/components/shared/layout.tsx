import { PropsWithChildren } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "../ui/button";
import { usePermission } from "@/src/hooks/usePermission";
interface LayoutProps extends PropsWithChildren {}

const navigation = [
  {
    name: "Транзакції",
    href: "/transactions",
  },
  {
    name: "Валюта",
    href: "/currency",
  },
  {
    name: "Каса",
    href: "/cash-register",
  },
  {
    name: "Клієнти",
    href: "/clients",
  },
];

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { role } = usePermission();
  const hasRole = role !== "casher" && role !== "admin";

  const { pathname } = location;

  return (
    <main className="h-dvh w-full flex flex-col items-center justify-center gap-3">
      <div className="max-w-full sm:max-w-sm w-full h-auto min-h-1/3 px-4 py-3 bg-zinc-700 rounded">
        {children}
      </div>
      <nav className="max-w-full sm:max-w-sm w-full px-4 py-3 flex items-center justify-between bg-zinc-700 rounded">
        {navigation.map((item, index) => (
          <Button
            disabled={pathname !== item.href && hasRole}
            key={index}
            size={"sm"}
          >
            <Link to={item.href}>{item.name}</Link>
          </Button>
        ))}
      </nav>
    </main>
  );
};

export default Layout;

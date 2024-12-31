import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/shared/layout";
import { PermissionProvider } from "./context/permission/PermissionProvider";
import Home from "./pages/home";
import Transactions from "./pages/transactions";
import Currency from "./pages/currency";
import CashRegister from "./pages/cash-register";
import Clients from "./pages/clients";

function App() {
  return (
    <PermissionProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/currency" element={<Currency />} />
            <Route path="/cash-register" element={<CashRegister />} />
            <Route path="/clients" element={<Clients />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </PermissionProvider>
  );
}

export default App;

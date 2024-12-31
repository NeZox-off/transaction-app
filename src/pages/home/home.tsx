import { Button } from "@/src/components/ui/button";
import { usePermission } from "@/src/hooks/usePermission";
import { useNavigate } from "react-router-dom";

interface HomeProps {}

const Home = ({}: HomeProps) => {
  const { setRole } = usePermission();
  const navigate = useNavigate();
  const handleRedirect = (role: "casher" | "admin") => {
    setRole(role);
    navigate("/transactions");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <Button onClick={() => handleRedirect("casher")}>Кассир</Button>
      <Button onClick={() => handleRedirect("admin")} variant={"red"}>
        Админ
      </Button>
    </div>
  );
};

export default Home;

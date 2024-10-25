import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Callback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  return (
    <div>
      <h2>Авторизация...</h2>
    </div>
  );
};

export default Callback;

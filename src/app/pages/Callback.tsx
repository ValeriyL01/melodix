import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clientId, getAccessToken } from "../api/auth";

const Callback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      navigate("/", { replace: true });
    } else {
      const handleCallback = async () => {
        const params = new URLSearchParams(location.search);
        const code = params.get("code");

        if (code) {
          await getAccessToken(clientId, code);
          navigate("/", { replace: true });
        }
      };

      handleCallback();
    }
  }, [location, navigate]);

  return (
    <div>
      <h2>Авторизация...</h2>
    </div>
  );
};

export default Callback;

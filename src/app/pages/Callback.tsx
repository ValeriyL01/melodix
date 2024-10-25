import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Callback: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { replace: true });
  }, [location, navigate]);

  return (
    <div>
      <h2>Authorization...</h2>
    </div>
  );
};

export default Callback;

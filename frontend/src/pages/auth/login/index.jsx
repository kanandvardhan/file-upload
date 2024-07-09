import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onSubmit = async () => {};
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-5 bg-gray-200 rounded-md">
        <div>
          <form
            onSubmit={onSubmit}
            className="p-5 grid grid-cols-2 items-start justify-items-stretch gap-y-5 gap-x-3"
          >
            <label>Phone Number:</label>
            <input name="phone" />

            <label>Password:</label>
            <input name="password" type="password" />

            <button
              onClick={() => navigate("/register")}
              className="col-span-1"
              type="button"
            >
              Register
            </button>

            <button className="col-span-1">Login</button>
          </form>
          {error && <span className="text-red-500">errors:</span>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { postRequest } from "../../../api";
import { useAuth } from "../../../context/auth";

const LoginPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, signin } = useAuth();

  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { phone, password } = formData;

    if (!phone || !password) {
      return setError("All fields are required");
    }

    await postRequest("/user/login", {
      phone,
      password,
    }).then((data) => {
      if (!data.error) {
        signin(data.data.user, () => navigate("/protected"));
      } else setError(data.message);
    });
  };

  if (user) return <Navigate to="/protected" />;

  return (
    <div className="h-full flex flex-col gap-10 justify-center items-center">
      <h1>Login</h1>
      <div className="p-5 bg-gray-200 rounded-md">
        <div>
          <form
            onSubmit={onSubmit}
            className="p-5 grid grid-cols-2 items-start justify-items-stretch gap-y-5 gap-x-3"
          >
            <label>Phone Number:</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleOnChange}
            />

            <label>Password:</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleOnChange}
            />

            <button
              onClick={() => navigate("/register")}
              className="col-span-1"
              type="button"
            >
              Register
            </button>

            <button className="col-span-1">Login</button>
          </form>
          {error && <span className="text-red-500">{error}</span>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

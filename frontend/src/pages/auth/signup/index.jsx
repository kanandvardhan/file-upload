import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { postRequest } from "../../../api";
import { useAuth } from "../../../context/auth";

const SignupPage = () => {
  const [error, setError] = useState("");
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { name, phone, password, dob } = formData;

    if (!name || !phone || !password || !dob) {
      return setError("All fields are required");
    }

    await postRequest("/user/signup", {
      phone,
      password,
      dob,
      name,
    }).then((data) => {
      if (!data.error) navigate("/login");
      else setError(data.message);
    });
  };

  if (user) return <Navigate to="/protected" />;

  return (
    <div className="h-full flex flex-col justify-center items- gap-10">
      <h1>Register</h1>
      <div className="p-5 bg-gray-200 rounded-md">
        <div>
          <form
            onSubmit={onSubmit}
            className="p-5 grid grid-cols-2 items-start justify-items-stretch gap-y-5"
          >
            <label>Name:</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleOnChange}
            />

            <label>Date of Birth:</label>
            <input
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleOnChange}
            />

            <label>Phone Number:</label>
            <input
              name="phone"
              type="number"
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

            <button className="col-span-2">Register</button>
            <button
              onClick={() => navigate("/login")}
              className="col-span-2"
              type="button"
            >
              Login
            </button>
          </form>
          {error && <span className="text-red-500">{error}</span>}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

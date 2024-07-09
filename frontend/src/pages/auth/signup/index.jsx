import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async () => {};
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="p-5 bg-gray-200 rounded-md">
        <div>
          <form
            onSubmit={onSubmit}
            className="p-5 grid grid-cols-2 items-start justify-items-stretch gap-y-5"
          >
            <label>Name:</label>
            <input name="name" />

            <label>Date of Birth:</label>
            <input name="dob" type="password" />

            <label>Password:</label>
            <input name="password" type="password" />

            <label>Password:</label>
            <input name="password" type="password" />

            <label>Password:</label>
            <input name="password" type="password" />

            <label>Password:</label>
            <input name="password" type="password" />

            <button className="col-span-2">Register</button>
            <button
              onClick={() => navigate("/login")}
              className="col-span-2"
              type="button"
            >
              Login
            </button>
          </form>
          {error && <span className="text-red-500">errors:</span>}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

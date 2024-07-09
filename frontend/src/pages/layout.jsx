import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const Layout = () => {
  return (
    <>
      <div>
        <AuthStatus />
      </div>
      <Outlet />
    </>
  );
};

export default Layout;

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p className="capitalize">
      Welcome {auth.user.name}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

export function PublicPage() {
  return <h3>Public</h3>;
}

import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const Layout = () => {
  return <Outlet />;
};

export default Layout;

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
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

export function ProtectedPage() {
  return <h3>Protected</h3>;
}

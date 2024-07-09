import "./App.css";
import { AuthProvider } from "./context/auth";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./pages/layout";
import LoginPage from "./pages/auth/login";
import { RequireAuth } from "./components/auth/require-auth";
import SignupPage from "./pages/auth/signup";
import ProtectedPage from "./pages/protected";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="login" />} />

            <Route path="/login" index element={<LoginPage />} />
            <Route path="/register" element={<SignupPage />} />

            <Route
              path="/protected"
              element={
                <RequireAuth>
                  <ProtectedPage />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

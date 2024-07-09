import "./App.css";
import { AuthProvider } from "./context/auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout, { ProtectedPage, PublicPage } from "./pages/layout";
import LoginPage from "./pages/auth/login";
import { RequireAuth } from "./components/auth/require-auth";
import SignupPage from "./pages/auth/signup";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<PublicPage />} />
            <Route path="/login" element={<LoginPage />} />
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

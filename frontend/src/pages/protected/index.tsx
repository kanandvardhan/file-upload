import { useAuth } from "../../context/auth";
import { KycForm } from "../../components/kyc/kyc-form";

const ProtectedPage = () => {
  const { user } = useAuth();

  if (user?.kyc === null) {
    return <KycForm />;
  }

  return <div>ProtectedPage</div>;
};

export default ProtectedPage;

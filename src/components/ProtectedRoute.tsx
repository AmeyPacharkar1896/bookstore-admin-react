import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { authService } from "../services/authService";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const verify = async () => {
      const user = await authService.getCurrentUser();
      setAuthorized(user?.role == "admin");
    };

    verify();
  }, []);

  if (authorized === null) return <div className="p-8">Checking access...</div>;
  if (!authorized) return <Navigate to="/admin/login" replace />;

  return <>{children}</>;
}
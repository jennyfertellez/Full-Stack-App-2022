import { useEffect } from "react";
import { Navigate } from "react-router-dom";

//This component signs out the authenticated user and redirects the user to the default route 
const UserSignOut = ({ context }) => {
  useEffect(() => {
    context.actions.signOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Navigate to="/" />;
};

export default UserSignOut;


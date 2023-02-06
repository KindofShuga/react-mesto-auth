import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...props }) => {
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to="mesto-react-auth/sign-in" replace/>
)};

export default ProtectedRoute;
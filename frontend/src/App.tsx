import React from "react";
import GlobalStyle from "./styles/global";
import SignIn from "./Pages/SingIn";
import SignUp from "./Pages/SingUp";
import { AuthProvider } from "./hooks/AuthContext";
import ToastContainer from "./components/ToastContainer";
const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <ToastContainer />
    <GlobalStyle />
  </>
);
export default App;

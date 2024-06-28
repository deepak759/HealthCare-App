import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser, logInUser } from "../util/Auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { authenticate } from "../store/Redux/Favourites";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();

  async function SignInHandler({ email, password }) {
    try {
      setIsAuthenticating(true);
      const res = await logInUser(email, password);
      console.log(res.data);
      dispatch(authenticate({token:res.data.token}));
    } catch (error) {
      Alert.alert(
        "Authentication Failed",
        "Could not log you in, Please Check your credentials or try againg later"
      );
      console.log(error);
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={"Loging you in..."} />;
  }

  return <AuthContent onAuthenticate={SignInHandler} isLogin />;
}

export default LoginScreen;

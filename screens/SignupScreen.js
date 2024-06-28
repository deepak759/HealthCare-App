import { useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { createUser } from "../util/Auth";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { authenticate } from "../store/Redux/Favourites";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();
  async function SignUpHandler({ email, password,userName }) {
    console.log(email,password,userName)
    try {
      setIsAuthenticating(true);
      const res = await createUser(email, password,userName);
console.log(res.data)
      dispatch(authenticate({token:res.data.token}));
    } catch (error) {
      Alert.alert(
        "Authentication Failed",
        "Could not log you in, Please Check your credentials or try againg later"
      );
console.log(error)
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={"Registering you ..."} />;
  }

  return <AuthContent onAuthenticate={SignUpHandler} />;
}

export default SignupScreen;

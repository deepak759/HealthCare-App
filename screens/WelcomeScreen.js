import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useSelector } from "react-redux";
import { getUserdetails } from "../util/Auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function WelcomeScreen() {
  const getUsertoken = useSelector((state) => state.authenticationInfo.token);
  const [loading, setLoading] = useState(true);
console.log(getUsertoken)
  const [userData, setUserData] = useState();
  useEffect(() => {
    async function getUserdetail(token) {
      try {
        const res = await getUserdetails(token);
        setUserData(res);
        setLoading(false);
        console.log(res);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    if (getUsertoken) {
      getUserdetail(getUsertoken);
    }
  }, [getUsertoken]);
  if (loading) {
    return <LoadingOverlay message={"Fetching User data"} />;
  }

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome! {userData.userName} </Text>
      <Text>You authenticated successfully!</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

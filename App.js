import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { PersistGate } from 'redux-persist/integration/react';
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store,persistor } from "./store/Redux/store";
// import { store, persistor } from './store';
import IconButton from "./components/ui/IconButton";
import { logout } from "./store/Redux/Favourites";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const dispatch = useDispatch();
  function logoutHnadler() {
    dispatch(logout());
  }
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",

        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        options={{
          headerRight: ({ tintColor }) => {
            return (
              <IconButton
                color={tintColor}
                onPress={logoutHnadler}
                icon={"log-out-outline"}
                size={24}
              />
            );
          },
        }}
        name="Welcome"
        component={WelcomeScreen}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const isLogin = useSelector(
    (state) => state.authenticationInfo.isAuthenticated
  );

  return (
    <NavigationContainer>
      {!isLogin ? <AuthStack /> : <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <Provider store={store}>
        <StatusBar style="light" />
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </>
  );
}

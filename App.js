// App.js
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import InitialNavigation from "./src/Navigation/initialNavigation";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <InitialNavigation />
          </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;

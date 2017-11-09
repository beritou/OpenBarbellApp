import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { withNetworkConnectivity } from 'react-native-offline';

import 'app/configs/ReactotronConfig';
import Store from 'app/redux/Store';
import ApplicationScreen from 'app/features/application/ApplicationScreen';
import * as GoogleSignInSetup from 'app/services/GoogleSignInSetup';
import Bluetooth from 'app/services/Bluetooth';
import AppState from 'app/services/AppState';
import * as Analytics from 'app/services/Analytics';
import Permissions from 'app/services/Permissions';

// initialize the store
var store = Store();

// request permissions
Permissions();

// initialize analytics
Analytics.setInitialAnalytics();

// configure google sign in
GoogleSignInSetup.configure();

// start the bluetooth
Bluetooth(store);

// set up app state listeners
AppState(store);

let App = () => (
    <ApplicationScreen />
);

App = withNetworkConnectivity({
    withRedux: true // It won't inject isConnected as a prop in this case
})(App);

// render
class OBBApp extends Component {

    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

// begin application
export default function () {
    AppRegistry.registerComponent('OBBApp', () => OBBApp);
}

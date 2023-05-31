import AppContainer from '@components/shared/app-container';
import {Provider} from 'react-redux';

import AppNavigator from 'src/navigation';
import store from 'src/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer>
        <AppNavigator />
      </AppContainer>
    </Provider>
  );
};

export default App;

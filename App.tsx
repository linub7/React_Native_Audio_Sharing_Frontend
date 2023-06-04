import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from 'react-query';

import AppContainer from '@components/shared/app-container';
import AppNavigator from 'src/navigation';
import store from 'src/store';

const queryClient = new QueryClient();
const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppContainer>
          <AppNavigator />
        </AppContainer>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;

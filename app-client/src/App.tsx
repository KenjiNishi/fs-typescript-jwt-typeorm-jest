import { Provider} from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div>
        <h3>Hello, World.</h3>
      </div>
    </Provider>
  );
}
export default App;

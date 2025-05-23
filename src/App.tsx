import { Provider } from 'react-redux'
import { RootNavigation } from './navigation'
import { persistor, store } from './store'
import { PersistGate } from 'redux-persist/integration/react'

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <RootNavigation />
      </PersistGate>
    </Provider>
  )
}

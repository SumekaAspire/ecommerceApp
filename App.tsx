
import './src/utils/bcryptSetUp';// has to to be on top
import React, { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AuthNavigation from './src/navigations/AuthNavigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { store } from './src/store/store'
import { Provider } from 'react-redux'
import { createTables } from './src/database/tables'
import { insertDefaultUsers } from './src/services/api'
import Toast from 'react-native-toast-message'

const App = () => {
   /**
    *initialize database, create tables, db connection opens, then queries execute
    * app restarts - every time runs(but dupilcate default not created- using INSERT OR IGNORE)
    * Once uninstalled and then install then db deleted, created new tables, and default users
    */
  useEffect(()=>{
    const initDatabase =async()=>{
      await createTables();  //create tables if not exists
      await insertDefaultUsers(); //insert default users
      console.log("database ready, initialized");
    };
    initDatabase();
  },[])
return(
  <GestureHandlerRootView>
  <SafeAreaProvider>
   <Provider store={store}>
     <AuthNavigation/>
     <Toast/>
   </Provider>
  </SafeAreaProvider>
</GestureHandlerRootView>
)
}

export default App
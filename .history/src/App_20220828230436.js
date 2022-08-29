import React, { useContext} from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth';
import { AuthContext } from './components/context/auth-context';

const App = props => {
  const AuthContext = useContext(AuthContext);
  // return <AuthContext.Consumer><Auth /></AuthContext.Consumer>;
  return <Auth/>
};

export default App;

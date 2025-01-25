import { Route, Routes } from 'react-router';
import { useState } from 'react';
import { Authentication } from './pages/Authentication';
import { Home } from './pages/Home';
import { ProtectedRoute } from './components/ProtectedRoute';

export const AppIncidents = () => {
  const [ user, setUser ] = useState( null );

  const setUserState = ( user ) => setUser( user );

  return (
    <Routes>
      <Route index element={ <Authentication setUserState={ setUserState } /> } />
      <Route path='/home' element={
        <ProtectedRoute isAuth={ ( user === null ) ? false : true }>
          <Home user={ user } />
        </ProtectedRoute>
      } />
    </Routes>
  );
}
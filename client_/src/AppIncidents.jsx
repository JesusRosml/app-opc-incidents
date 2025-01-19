import { Route, Routes } from 'react-router';
import { Authentication } from './Authentication';
import { Home } from './Home';
import { useState } from 'react';
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
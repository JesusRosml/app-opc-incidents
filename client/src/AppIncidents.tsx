import { Route, Routes } from 'react-router';
import { Authentication } from './Authentication';
import { Home } from './Home';

export const AppIncidents = () => {
  return (
    <Routes>
      <Route index element={ <Authentication /> } />
      <Route path='/home' element={ <Home /> } />
    </Routes>
  );
}
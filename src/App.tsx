import './App.css';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import { renderRoutes } from './routes';
import AppLoader from '@shared/AppLoader';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<AppLoader />}>
        <Routes>{renderRoutes()}</Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
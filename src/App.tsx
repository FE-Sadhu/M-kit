import React from 'react';
import './App.css';
import { useAuth } from './context/auth-context';
import { AuthenticatedApp } from './authenticated-app';
import { UnauthenticatedApp } from './unauthenticated-app/index';
import { ErrorBoundary } from './components/error-boundary';
import { FullPageErrorFallback } from './libs/lib';

function App() {
  const { user } = useAuth();
  return (
    <div className="app">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;

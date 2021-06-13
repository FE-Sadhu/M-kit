import React from 'react';
import "./App.css";
import { useAuth } from './context/auth-context';
import { AuthenticatedApp } from './authenticated-app';
import { UnauthenticatedApp } from './unauthenticated-app/index';

function App() {
  const { user } = useAuth();
  return <div className="app">{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</div>;
}

export default App;

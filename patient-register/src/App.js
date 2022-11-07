import Amplify from 'aws-amplify'
import config from './aws-exports'
import { withAuthenticator } from '@aws-amplify/ui-react'
import './App.css';
import React from 'react';
import Header from './pages/Header'
import Form from './pages/Form'

Amplify.configure(config);

function App() {

  return (
    <div className="App">
      <Header />
      <Form />
    </div>
  );
}

export default withAuthenticator(App);

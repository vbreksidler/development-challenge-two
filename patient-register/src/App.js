import Amplify from 'aws-amplify'
import config from './aws-exports'
import { withAuthenticator } from '@aws-amplify/ui-react'
import './App.css';
import React from 'react';
import Header from './pages/Header'
import Content from './pages/Content'
import Footer from './pages/Footer'

Amplify.configure(config);

function App() {

  return (
    <div className="App">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default withAuthenticator(App);

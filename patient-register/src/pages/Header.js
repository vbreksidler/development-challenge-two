import Amplify from 'aws-amplify'
import config from '../aws-exports'
import { withAuthenticator } from '@aws-amplify/ui-react'
import signOut from '../utils/singOut'
import React from 'react';

Amplify.configure(config);

const cognitoId = config.aws_user_pools_id;
const cognitoRegion = config.aws_cognito_region


function Header() {
    return (
        <div className="div_header">
            <header className="App-header">
                <div className='congnito_user_id'>
                    Logged in user id: {(cognitoId.split('sa-east-1_'))}
                </div>
                <div className='cognito_region'>
                    Server region: {cognitoRegion}
                </div>
                <button onClick={() => signOut()}>SignOut</button>
            </header>
        </div>
    );
}

export default withAuthenticator(Header);

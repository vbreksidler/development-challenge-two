import Amplify from 'aws-amplify'
import config from '../aws-exports'
import { withAuthenticator } from '@aws-amplify/ui-react'
import signOut from '../utils/singOut'
import React from 'react';
import styles from './styles.module.scss';

Amplify.configure(config);

const cognitoId = config.aws_user_pools_id;
const cognitoRegion = config.aws_cognito_region


function Header() {
    return (
        <div>
            <header className={styles.header}>
                <div className={styles.logo}></div>
                <div className={styles.status}>
                    <div className={styles.congnito_user_id}>
                        User-id: {(cognitoId.split('sa-east-1_'))}
                    </div>
                    <div className={styles.cognito_region}>
                        Server region: {cognitoRegion}
                    </div>
                </div>
                <button onClick={() => signOut()}>SignOut</button>
            </header>
        </div>
    );
}

export default withAuthenticator(Header);

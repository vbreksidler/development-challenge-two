import Amplify from 'aws-amplify'
import config from '../aws-exports'
import { withAuthenticator } from '@aws-amplify/ui-react'
import signOut from '../utils/singOut'
import React from 'react';
import styles from './styles.module.scss';

Amplify.configure(config);

function Header() {
    return (
        <div>
            <header className={styles.header}>
                <div className={styles.logo}></div>
                <button onClick={() => signOut()}>SignOut</button>
            </header>
        </div>
    );
}

export default withAuthenticator(Header);

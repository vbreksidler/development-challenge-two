import Amplify from 'aws-amplify'
import config from '../aws-exports'
import { withAuthenticator } from '@aws-amplify/ui-react'
import React from 'react';
import styles from './styles.module.scss';

Amplify.configure(config);

function Footer() {
    return (
        <section className={styles.footer}>
            <footer className={styles.fixed_footer}>
                <div className={styles.content_footer}>
                    <p> ©VBR, 2022. Desenvolvido em Javascript, com React, e estilização com Sass.</p>
                </div>
            </footer>
        </section>
    );
}

export default withAuthenticator(Footer);

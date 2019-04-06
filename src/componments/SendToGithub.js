import React, {Component} from 'react';
import {OauthSender} from '../vendor/OauthSender';
import {githubClientID} from "../parse";

export class SendToGithub extends Component {
    render() {
        return (

            <OauthSender
                authorizeUrl="https://github.com/login/oauth/authorize"
                clientId={githubClientID}
                redirectUri="https://www.pleaseban.me/oauth"
                state={{from: '/login'}}
                args={{scope: 'user:email'}}
                render={({url}) => <a href={url}>使用github登陆</a>}
            />

        );
    }
}

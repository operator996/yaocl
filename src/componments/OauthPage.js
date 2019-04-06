import React, {Component} from 'react';
import {ReceiveFromGithub} from "./ReceiveFromGithub";

export  class OauthPage extends Component {
    render() {
        return (
            <div>
                <ReceiveFromGithub setUser={this.props.setUser}/>
            </div>
        );
    }
}

import React, {Component} from 'react';
import {SendToGithub} from "./SendToGithub";
import GithubIcon from "../static/gitub.png";

export class LoginPage extends Component {
    render() {
        return (
            <div className="section columns">
                <div className="column is-5"/>
                <div className="column ">
                    <div className="title">第三方登陆</div>
                    <div className="button">
                        <img style={{height: 20, "margin-right": 5}} src={GithubIcon} alt="github"/><SendToGithub
                        setUser={this.props.setUser}/></div>
                </div>
                <div className="column"/>
            </div>
        );
    }
}

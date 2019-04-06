import React, {Component} from 'react';
import {parse as qs} from 'query-string';
import Parse from '../parse';

export class ReceiveFromGithub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            processing: true,
            error: false,
            error_message: ''
        }
    }

    componentDidMount() {
        var params = qs(window.location.search);

        Parse.Cloud.run("githubOauth", params).then(resp => {
            if (resp.status === 'ok') {

                var user = new Parse.User();
                var myAuthData = {
                    id: resp.id,
                    access_token: resp.access_token
                };
                user._linkWith('github', {authData: myAuthData}).then(user => {
                    this.setState({processing: false});

                    window.location = '/'

                    console.log('user:', user);
                })
            } else {
                this.setState(
                    {
                        progressing: false,
                        error: true,
                        error_message: resp.reason
                    });
            }
        })
    }


    render() {
        let params = qs(window.location.search);
        console.log('query str', params);
        return (
            <div>
                {this.state.processing && <p>Authorizing now...</p>}
                {this.state.error && (
                    <p className="error">An error occurred: {this.state.error_message}</p>
                )}
            </div>
        )


    }
}

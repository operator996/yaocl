import React, {Component} from 'react';
import Parse from "../parse";

class LogOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progressing: true
        };
    }

    componentDidMount() {
        Parse.User.logOut().then(() => {
            this.setState({progressing: false});
            window.location = '/'
        })
    }

    render() {
        return (
            <div>
                <h3 className="h3">{this.state.progressing ? '退出中' : '退出成功'}</h3>
            </div>
        );
    }
}


export default LogOut;

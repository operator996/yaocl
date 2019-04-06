import React, {Component} from 'react';
import {Link} from "react-router-dom";

export class Navbar extends Component {
    render() {
        return (
            <nav className="navbar is-spaced has-shadow">
                <div className="navbar-brand">
                    <Link to="/" className="navbar-item"><img src="/asserts/banner.png" width="144" alt="脉命网"/></Link>
                </div>
                <Link to="/survey" className="navbar-item">全部爆料</Link>
                <div className="navbar-end">
                    {this.props.user === null && <div className="navbar-item">
                        <div className="buttons">
                            <Link to="/login" className="button ">
                                <strong>登陆</strong>
                            </Link>
                        </div>
                    </div>}
                    {this.props.user !== null && <div className="navbar-item">
                        <div className="buttons">
                            <Link to="/logout" className="button ">
                                <strong>退出</strong>
                            </Link>
                        </div>
                    </div>}
                    <div className="navbar-item">
                        <div className="buttons">
                            <Link to="/survey/add" name="add" className="button is-primary">
                                <strong>爆料</strong>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}


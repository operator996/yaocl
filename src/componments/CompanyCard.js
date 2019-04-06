import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export class CompanyCard extends Component {
    render() {
        return (
            <li>
                <div className="card company_list_item">

                    <div className="card-content">
                        <div className="media">
                            <div className="media-content">
                                <p className="title is-4">{this.props.name}</p>
                                <p className="subtitle is-6">996指数 {this.props.intensePoint}</p>
                            </div>
                        </div>
                        <div className="content">
                            <span>爆料数 {this.props.surveyCount} </span>
                            <span>爆料部门 {this.props.departmentCount}</span>
                            <span>认为靠谱 {this.props.agreeCount} 人</span>
                            <span>认为不靠谱 {this.props.disagreeCount} 人</span>
                        </div>
                    </div>
                    <footer className="card-footer">
                        <div className="card-footer-item vote_footer">
                            <div className="columns vote_button_container">
                                <div className=" column">
                                    <div className="button " name="agree" onClick={this.props.handleClick}>靠谱</div>
                                </div>
                                <div className=" column">
                                    <div name="disagree" onClick={this.props.handleClick} className="button ">不靠谱</div>
                                </div>
                                <div className=" column"><Link name="add" onClick={this.props.handleClick}
                                                               to="/survey/add" className="button ">爆料</Link>
                                </div>

                            </div>
                        </div>
                    </footer>
                </div>
            </li>
        );
    }
}

CompanyCard.defaultProps = {
    name: '某不知名公司',
    totalIndex: 0,
    totalCount: 0,
    groupCount: 0,
    agreeCount: 0,
    disagreeCount: 0
};

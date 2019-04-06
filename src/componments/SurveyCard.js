import React, {Component} from 'react';
import {isOvertimeKeyMap, overtimeShitfKeyMap, overtimeAllowanceKeyMap} from "./SurveyAdd";

export class SurveyCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.setState({expand: !this.state.expand })
    }
    render() {
         const extraInfoLimit = 100;
         let extraOverflow = false;
         let extraInfo = this.props.extraInfo;
         if (extraInfo == null || extraInfo === '') {
             extraInfo = '暂无';

         } else {
             extraOverflow = extraInfo.length > extraInfoLimit;
             if (!this.state.expand) {
                 extraInfo = extraOverflow ? extraInfo.substring(0, extraInfoLimit) + '...' : extraInfo;

             }
         }

         let extraClasses = 'extra ' + (extraOverflow === true ? 'clickIcon': '');

    return (
            <li>
                <div className="card ">
                    <div className="card-content survey-card-container">
                        <div className="company-info">
                            <p className="title is-4 is-primary">{this.props.company}</p>
                            <p className="subtitle is-6">{this.props.department} / {this.props.jobTitle}</p>
                        </div>
                        <div className="detail">
                            <section className="questions">
                                <span>是否实行996: <b>{isOvertimeKeyMap[this.props.isOvertime]}</b> </span>
                                <span>是否可以调休: <b>{overtimeShitfKeyMap[this.props.overtimeShift]}</b></span>
                                <span>是否有加班补偿: <b>{overtimeAllowanceKeyMap[this.props.overtimeAllowance]}</b></span>
                            </section>
                            <section className={extraClasses} onClick={this.handleClick}>
                                <span>详情: {extraInfo} </span>

                            </section>
                        </div>

                    </div>
                </div>
            </li>
        );
    }
}

SurveyCard.defaultProps = {
    name: '某不知名公司',
    totalIndex: 0,
    totalCount: 0,
    groupCount: 0,
    agreeCount: 0,
    disagreeCount: 0
}

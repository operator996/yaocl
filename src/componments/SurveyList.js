import React, {Component} from 'react';
import {SurveyCard} from "./SurveyCard";

export class SurveyList extends Component {

    render() {
        let cards  = this.props.surveys.map(surveyObj => {
            return <SurveyCard key={surveyObj.objectId} company={surveyObj.company} jobTitle={surveyObj.jobTitle}
                               department={surveyObj.department} isOvertime={surveyObj.isOvertime}
            overtimeShift={surveyObj.overtimeShift} overtimeAllowance={surveyObj.overtimeAllowance}
            extraInfo={surveyObj.extraInfo}/>;
        });
        return (
            <div className="columns">
                <div className="column"/>
                <div className="column is-two-thirds">
                    <ul id="survey-list">
                        {cards}
                    </ul>
                </div>
                <div className="column"/>
            </div>

        );
    }
}

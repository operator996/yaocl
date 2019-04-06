import React, {Component} from 'react';
import {CompanyCard} from "./CompanyCard";

export class CompanyList extends Component {
    render() {
        let companies = this.props.companies.map(corp =>
                <CompanyCard key={corp.objectId} name={corp.name} agreeCount={corp.agreeCount}
                             disagreeCount={corp.disagreeCount} surveyCount={corp.surveyCount}
                             departmentCount={corp.departmentCount} intensePoint={corp.intensePoint}
                             handleClick={e => this.props.handleClick(corp, e)}/>
        );

        return (

            <div className="columns">
                <div className="column"/>
                <div className="column is-11">
                    <ul>{companies}</ul>
                </div>
                <div className="column "/>
            </div>
        );
    }
}

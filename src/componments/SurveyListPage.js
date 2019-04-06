import React, {Component} from 'react';
import  Parse from '../parse';
import Notification from 'react-bulma-notification-fix';
import {SurveyList} from "./SurveyList";
import {PageLoader} from "./PageLoader";
import PropTypes from "prop-types";
import {Pagination} from "./Pagination";

const NoSurvey = () => {
    return <div className="section"><h3 className="title">暂时没有信息</h3></div>
};

export class SurveyListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            surveys: null,
            currentPage:1,
            pages:1,
            loading:true
        }
        this.gotoPage = this.gotoPage.bind(this);
    }
    gotoPage(num) {
        this.setState({loading: true});
        let q = new Parse.Query('Company');
        q.skip(this.props.pageSize * (num - 1));
        q.limit(this.props.pageSize);
        q.find().then(items => {
            let companies = items.map(value => {
                let json = value.toJSON();
                json['ref'] = value;
                return json;
            });
            this.setState({
                companies: companies,
                loading: false,
                currentPage: num
            })
        }).catch(e => {
            this.setState({loading: false});
            console.log(e);
        });
    }
    componentDidMount() {
        let q = new Parse.Query('Survey');
        q.count().then(count=>{
            let pages = Math.floor(count /this.props.pageSize) + (count % this.props.pageSize > 0 ? 1: 0);
            this.setState({pages: pages})
        }).catch( e=> {
            Notification.error('page load failed, please try again');
            console.log(e);
        });
        q.limit(10).find().then(results => {
           let items = results.map(obj => obj.toJSON());
            this.setState({surveys: items,
            loading:false});
        }).catch( e=> {
            Notification.error('page load failed, please try again');
            console.log(e);
        });
    }
    render() {
        let isSurveysNotEmpty = this.state.surveys && this.state.surveys.length !== 0;
        return (
            <div className="section " id="survey-list-container">
                {<PageLoader loading={this.state.loading}/>}
                {isSurveysNotEmpty ? <SurveyList surveys={this.state.surveys}/> :  <NoSurvey/> }
                {isSurveysNotEmpty && <Pagination objectName={'Survey'} current={this.state.currentPage} count={this.state.pages}
                                                                gotoPage={this.gotoPage}/>}
            </div>
        );
    }
}
SurveyListPage.defaultProps = {
    pageSize:10
};
SurveyListPage.protoTypes = {
    pageSize: PropTypes.number
};

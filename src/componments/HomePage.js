import React, { Component } from 'react';
import {CompanyList} from "./CompanyList";
import Parse, {Vote} from "../parse";
import Notification from 'react-bulma-notification-fix';
import {SearchBar} from "./SearchBar";
import {PageLoader} from "./PageLoader";
import * as R from "ramda";
import {Pagination} from "./Pagination";
import PropTypes from "prop-types";

export class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {companyCount: 0,
            companies: [],
            pages: 1,
            currentPage: 1,
            loading:true,
            notification:true};
        this.handleClick = this.handleClick.bind(this);
        this.handleAgree = this.handleAgree.bind(this);
        this.gotoPage = this.gotoPage.bind(this);
    }

    handleAgree(obj, type) {
        debugger
        let voteKey = (type)  => type+'Count';
        let index = R.findIndex(it =>it.objectId === obj.objectId, this.state.companies);
        let newCompany = Object.assign({}, this.state.companies[index]);
        let has_vote = newCompany['voted'];
        if (has_vote != null) {
            if (has_vote === type) {
                Notification.info("你已经投票了");
                return;
            } else {
                //投相反的票
                newCompany[voteKey(newCompany['voted'])] -=1;
                newCompany['voted'] = type;
            }
        }
        let key = voteKey(type);
        if (newCompany[key]){
            newCompany[key] += 1;
        }else {
            newCompany[key] = 1;
        }
        newCompany['voted'] = type;

        let newCompanies = R.update(index, newCompany, this.state.companies);
        this.setState({companies: newCompanies});

        let user = Parse.User.current();
        let q = new Parse.Query('Vote');
        q.equalTo('from', user);
        q.equalTo('to', obj.ref);
        q.first().then(vote=> {
            if (vote == null) {
                let vote = new Vote();
                vote.set('from', user);
                vote.set('to', obj.ref);
                vote.set('type', type);
                vote.save();
            } else {
                if (vote.get('type') !== type){
                    vote.set('type', type);
                    vote.save();
                }
            }
        }).catch(e=>{
            console.log('vote error', e);
            }
        );

    }
    handleClick(obj, event) {
        if (this.props.user != null) {
            switch (event.target.getAttribute('name')) {
                case 'agree':
                    this.handleAgree(obj, 'agree');
                    break;
                case 'disagree':
                    this.handleAgree(obj, 'disagree');
                    break;
                default:
                    break;
            }
        } else {
            if (event.target.name === 'add') {
                event.preventDefault();
            }
            Notification.info('请先登陆');
        }
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
        Parse.Cloud.run('homePage', {pageSize: this.props.pageSize}).then(resp=> {
            let count = resp.count;
            let pages = Math.floor(count /this.props.pageSize) + (count % this.props.pageSize > 0 ? 1: 0);

            let companies = resp.companies.map(value => {
                let json = value.toJSON();
                json['ref'] = value;
                return json;
            });
            this.setState({companyCount: count,
                    companies: companies,
                    loading:false,
                    pages:pages,
                },
                )
        }).catch(e =>{
            this.setState({loading:false});
            console.log(e);
        });
    }
    render() {
        return (
            <section className="section">
                <PageLoader loading={this.state.loading}/>
                <SearchBar companyCount={this.state.companyCount}/>
                <CompanyList companies={this.state.companies} handleClick={this.handleClick}/>
                {this.state.companies.length > 0 && <Pagination objectName={'Company'} current={this.state.currentPage} count={this.state.pages}
                gotoPage={this.gotoPage}/>}
            </section>
        );
    }
}

HomePage.defaultProps = {
    companyCount: 0,
    pageSize:10
};
HomePage.protoTypes = {
    companyCount: PropTypes.number,
    pageSize: PropTypes.number
};

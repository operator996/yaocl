import React, {Component} from 'react';
import {Link} from "react-router-dom";
import * as R from "ramda";
import {Survey} from "../parse";
import Notification from 'react-bulma-notification-fix';
export const keyMap = {
    company:'公司',
    department:'部门',
    jobTitle:'岗位',
    overtimeAllowance:'加班补偿',
    overtimeShift:'调休',
    isOvertime:'是否实行996',
    extraInfo:'具体情况'
}
export const overtimeShitfKeyMap = {
    sure: '可以',
    inTheory: '理论上可以',
    negative: '不可以'
}
export const isOvertimeKeyMap = {
    never: '从不',
    seldom: '偶尔',
    often: '经常'
}
export const overtimeAllowanceKeyMap = {
    none: '没有',
    lessThan2Times: '少于2倍',
    overTwoTimes: '两倍及以上'
}
export class SurveyAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company:'',
            department:'',
            jobTitle:'',
            overtimeAllowance:'',
            overtimeShift:'',
            isOvertime:'',
            extraInfo:'',
            isSubmitting:false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        let result = R.filter(key => this.state[key] === '' && key !== 'extraInfo', Object.keys(keyMap));
        result.forEach(key=> Notification.error('您需要填写' + keyMap[key]));
        if (result.length !== 0) {
            return;
        }
        let survey = new Survey();
        Object.keys(keyMap).forEach(key=> survey.set(key, this.state[key]));
        this.setState({isSubmitting: true});

        survey.save().then(obj => {
            this.setState({isSubmitting:false});
            Notification.info("提交成功,3秒后跳转首页");
            setTimeout(()=>{
                window.location = '/';
            },3000);
        }).catch(e=>{
            this.setState({isSubmitting:false});
            Notification.error("提交失败,请重试");
            console.log(e);
        })
    }

    render() {
        let loaderClass = 'button is-link';
        if (this.state.isSubmitting) {
            loaderClass += ' is-loading'
        }
        return (
            <div className="columns section">
                <div className="column"/>
                <div className="column is-two-third">
                    <div>
                        <div className="title">填写爆料信息</div>
                        <div className="field">
                            <label className="label">公司</label>
                            <div className="control">
                                <input name="company" className="input" type="text" placeholder="公司"
                                       onChange={this.handleInputChange} value={this.state.company}/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">部门</label>
                            <div className="control">
                                <input name="department" className="input" type="text" placeholder="部门"
                                       onChange={this.handleInputChange} value={this.state.department}/>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">岗位</label>
                            <div className="control">
                                <input name="jobTitle" className="input" type="text" placeholder="岗位"
                                       onChange={this.handleInputChange} value={this.state.jobTitle}/>
                            </div>
                        </div>
                        <div className="control">
                            <label className="label">是否实行996</label>
                            <label className="radio">
                                <input type="radio" name="isOvertime" value="never"
                                       checked={this.state.isOvertime === "never"}
                                       onChange={this.handleInputChange}/>
                                没有
                            </label>
                            <label className="radio">
                                <input type="radio" name="isOvertime" value="seldom"
                                       checked={this.state.isOvertime === "seldom"}
                                       onChange={this.handleInputChange}/>
                                偶尔
                            </label>
                            <label className="radio">
                                <input type="radio" name="isOvertime" value="often"
                                       checked={this.state.isOvertime === "often"}
                                       onChange={this.handleInputChange}/>
                                经常
                            </label>
                        </div>
                        <div className="control">
                            <label className="label">是否有加班补偿</label>
                            <label className="radio">
                                <input type="radio" name="overtimeAllowance" value="none"
                                       checked={this.state.overtimeAllowance === "none"}
                                       onChange={this.handleInputChange}/>
                                没有
                            </label>
                            <label className="radio">
                                <input type="radio" name="overtimeAllowance" value="lessThan2Times"
                                       checked={this.state.overtimeAllowance === "lessThan2Times"}
                                       onChange={this.handleInputChange}/>
                                有,少于2倍
                            </label>
                            <label className="radio">
                                <input type="radio" name="overtimeAllowance" value="overTwoTimes"
                                       checked={this.state.overtimeAllowance === "overTwoTimes"}
                                       onChange={this.handleInputChange}/>
                                有,两倍以上
                            </label>
                        </div>
                        <div className="control">
                            <label className="label">996后是否可以调休</label>
                            <label className="radio">
                                <input type="radio" name="overtimeShift" value="sure"
                                       checked={this.state.overtimeShift === "sure"}
                                       onChange={this.handleInputChange}/>
                                可以
                            </label>
                            <label className="radio">
                                <input type="radio" name="overtimeShift" value="inTheory"
                                       checked={this.state.overtimeShift === "inTheory"}
                                       onChange={this.handleInputChange}/>
                                只是原则上可以
                            </label>
                            <label className="radio">
                                <input type="radio"  name="overtimeShift" value="negative"
                                       checked={this.state.overtimeShift === "negative"}
                                       onChange={this.handleInputChange}/>
                                不可以
                            </label>
                        </div>
                        <div className="field">
                            <label className="label">具体情况,可选</label>
                            <div className="control">
                                <textarea className="textarea" name="extraInfo" placeholder="具体情况"
                                          value={this.state.extraInfo} onChange={this.handleInputChange}/>
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <button className={loaderClass} onClick={this.handleSubmit}>提交</button>
                            </div>
                            <div className="control">
                                <button className="button is-text"><Link to="/">取消</Link></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column"/>
            </div>

        );
    }
}

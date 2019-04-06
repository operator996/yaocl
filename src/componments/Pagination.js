import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as R from "ramda";
export class Pagination extends Component {
    constructor(props) {
        super(props);
        this.handleGotoPage = this.handleGotoPage.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePrevPage = this.handlePrevPage.bind(this);
        this.state = {
            objUrl: '/'+ this.props.objectName +'/page/'
        }
    }
    handleGotoPage(pageNum,e) {
        e.preventDefault();
        this.props.gotoPage(pageNum);
    }
    handlePrevPage(e) {
        e.preventDefault();
        if (this.props.prevPage)
            this.props.prevPage();
        else {
            this.props.gotoPage(this.props.current -1);
        }
    }
    handleNextPage(e){
        e.preventDefault();
        if (this.props.nextPage)
            this.props.nextPage();
        else {
            this.props.gotoPage(this.props.current + 1);
        }
    }
    renderLinks() {
        if (this.props.count <= 10) {
            return R.map(num => {
                let isCurrentPage = num === this.props.current;
                let classNames = 'pagination-link ';
                let label = '';
                if (isCurrentPage) {
                    classNames =+ 'is-current';
                    label = 'Page ' + num;
                    return (
                        <li>
                            <a className={classNames} aria-label={label} aria-current="page" href="/#">{num}</a>
                        </li>
                    )
                } else {
                    label = 'Goto page ' + num;
                    return (
                        <li>
                            <a href={this.state.objUrl + num} className={classNames} aria-label={label} onClick={e=> this.handleGotoPage(num,e)}>{num}</a>
                        </li>
                    )
                }

            },R.range(1,this.props.count+1));
        }
        else {
            let list = [];
            //-1 means ellipsis
            //generate left side,
            if (this.props.current <= 3) {
                list.push(1,2,3,4)
            } else {
                list.push(1,2);
            }


            if (4 <= this.props.current && this.props.current <= this.props.count-3) {
                list.push(-1, this.props.current-1, this.props.current, this.props.current+1, -1);
            } else {
                list.push(-1, Math.floor(this.props.count/2), Math.floor(this.props.count/2) +10,-1);
            }

            if (this.props.current >= this.props.count -2) {
                list.push(this.props.count-3, this.props.count-2, this.props.count-1, this.props.count);
            } else {
                list.push( this.props.count-1, this.props.count);
            }
            return R.map(num => {
                let isCurrentPage = num === this.props.current;
                let classNames = 'pagination-link ';
                let label = '';
                if (isCurrentPage) {
                    classNames =+ 'is-current';
                    label = 'Page ' + num;
                    return (
                        <li>
                            <a className={classNames} aria-label={label} aria-current="page" href="/#">{num}</a>
                        </li>
                    )
                } else {
                    if (num === -1) {
                        return (
                            <li>
                                <span className="pagination-ellipsis">&hellip;</span>
                            </li>
                        )
                    } else {
                        label = 'Goto page ' + num;
                        return (
                            <li>
                                <a href={this.state.objUrl + num } className={classNames} aria-label={label} onClick={e=> this.handleGotoPage(num,e)}>{num}</a>
                            </li>
                        )
                    }

                }

            },list);
        }

    }
    render() {
        let list = this.renderLinks();
        let prevLink, nextLink;

        prevLink = this.props.current === 1 ? '/#' : this.state.objUrl + (this.props.current-1);
        nextLink = this.props.current === this.props.pages ? '#' : this.state.objUrl + (this.props.current+1);

        return (
            <div className="columns">
                <div className="column"/>
                <div className="column is-two-thirds">
                    <nav className="pagination" role="navigation" aria-label="pagination">
                        {this.props.current ===1 ?
                            <a href={prevLink} className="pagination-previous" title="This is the first page" onClick={this.handlePrevPage} disabled>上一页</a> :
                            <a href={prevLink} className="pagination-previous" title="This is the first page" onClick={this.handlePrevPage} >上一页</a>
                        }
                        <a href={nextLink} className="pagination-next" onClick={this.handleNextPage}>下一页</a>
                        <ul className="pagination-list">
                            {list}
                        </ul>
                    </nav>
                </div>
                <div className="column"/>
            </div>


        );
    }
}
Pagination.protoTypes = {
    current: PropTypes.number,
    count: PropTypes.number,
    prevPage: PropTypes.func,
    nextPage: PropTypes.func,
    gotoPage: PropTypes.func,
    objectName: PropTypes.string.isRequired
};
Pagination.defaultProps = {
    current:1,
    count:1,

};

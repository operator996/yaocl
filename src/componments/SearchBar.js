import React from 'react';
export const SearchBar = (props) => {

    return (
        <div className="columns">
            <div className="column">

            </div>
            <div className="column is-two-thirds">
                <nav className="level" id="search-panel">

                    <div className="level-left">
                        <div className="level-item">
                            <p className="subtitle is-5">
                                目前共收录了 <strong>{props.companyCount}</strong> 家公司
                            </p>
                        </div>

                    </div>


                    <div className="level-right">
                        <div className="level-item">
                            <div className="field has-addons">
                                <p className="control">
                                    <input className="input" type="text" placeholder="搜索中意的公司"/>
                                </p>
                                <p className="control">
                                    <button className="button">
                                        搜索
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            <div className="column">

            </div>
        </div>
    );
}

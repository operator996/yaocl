import React from 'react';

export const PageLoader = (props) => {
    let loaderClasses = 'pageloader';
    if (props.loading) {
        loaderClasses += ' is-active'
    }
    return (
        <div className={loaderClasses}><span className="title">{props.title}</span></div>
    )
}

PageLoader.defaultProps = {
    title: "加载中",
    loading: true
};

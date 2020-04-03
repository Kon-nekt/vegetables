import React from 'react';

import '../css/categories.css'

class Categories extends React.Component {

    render(){
        return(
            <>
                <h1 className="categories_header">{this.props.name}</h1>
                <div className = "fStroke">
                    {this.props.children}
                </div>
            </>
        )
    }
}

export default Categories;

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Cat extends Component {

    static propTypes = {
        spaces: PropTypes.array.isRequired,
    }

    state = {
        x: 
        transform: 'translate(0,0)',
    }
    
    componentDidMount() {
        document.addEventListener('keydown', this.arrowKeys);
    }

    arrowKeys = e => {

        let transform
       
        if(e.which == 37) {
            // left
            console.log('left');
        } else if (e.which===38) {
            // up 
            console.log('left');
        } else if (e.which===39) {
            // right
            console.log('right');
        } else if (e.which===40) {
            // down
            console.log('down');
        }

    };

    render() {
    	const catClass = `cat cat-left`;

    	return (
	        <span className={catClass}></span>
	    )
    }
}

const mapStateToProps = state => (
    {
        spaces: state.garden.spaces
    }
);

export default connect(mapStateToProps)(Cat);

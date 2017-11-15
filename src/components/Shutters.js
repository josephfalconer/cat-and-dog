import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


class Shutters extends Component {

    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        isGameOver: PropTypes.bool.isRequired,
        shuttersMessage: PropTypes.string.isRequired
    }

    render() {
        const { isOpen, isGameOver, shuttersMessage } = this.props,
            className = `shutters ${isOpen ? 'js-open-shutters' : ''}`;

        return (
            <div className={className}>
                <div className="shutter shutter--left" >
                    <span className="shutter__lining hori top"></span>
                    <span className="shutter__lining hori bottom"></span>
                    <span className="shutter__lining vert right"></span>

                    <div className={`shutter__inner--left ${'null'}`}>
                        <span className="message">{shuttersMessage}</span>
                    </div>

                </div>

                <div className="shutter shutter--right" >
                    <span className="shutter__lining hori top"></span>
                    <span className="shutter__lining hori bottom"></span>
                    <span className="shutter__lining vert left"></span>

                    <div className={`shutter__inner--right ${'null'}`}>
                    <span className="message">{shuttersMessage}</span>
                    </div>

                </div>
            </div>
        );
    };
}

const mapStateToProps = state => (
    {
        isGameOver: state.game.isGameOver,
        shuttersMessage: state.game.shuttersMessage
    }
);

export default connect(mapStateToProps)(Shutters);


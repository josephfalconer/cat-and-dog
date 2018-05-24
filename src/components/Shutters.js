import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

class Shutters extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    shuttersMessage: PropTypes.string.isRequired
  }

  render() {
    const { isOpen, shuttersMessage } = this.props;
    const className = `shutters ${isOpen ? 'js-open-shutters' : ''}`;
    return (
      <div className={className}>
        <div className="shutter shutter--left" >
          <span className="shutter__lining hori top"></span>
          <span className="shutter__lining hori bottom"></span>
          <span className="shutter__lining vert right"></span>
          <div className={`shutter__inner--left ${'null'}`}>
            <p className="shutter__message">{shuttersMessage}</p>
          </div>
        </div>
        <div className="shutter shutter--right" >
          <span className="shutter__lining hori top"></span>
          <span className="shutter__lining hori bottom"></span>
          <span className="shutter__lining vert left"></span>
          <div className={`shutter__inner--right ${'null'}`}>
            <p className="shutter__message">{shuttersMessage}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    shuttersMessage: state.shuttersMessage,
    isOpen: state.gameSwitches.isOpenShutters
  }
);

export default connect(mapStateToProps)(Shutters);

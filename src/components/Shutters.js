import React, { Component, PropTypes } from 'react';

export default class Shutters extends Component {

    static propTypes = {
        message: PropTypes.string,
        imgClass: PropTypes.string,
        updateMessage: PropTypes.func.isRequired,
        updateImg: PropTypes.func.isRequired,
        widthStyle: PropTypes.string.isRequired,
        startGame: PropTypes.func.isRequired,
        isPlayedGame: PropTypes.bool.isRequired
    };

    state = {
        hints: [ 
            { hint: "Get the yummy food.", class: "get-food" },
            { hint: "If you get too tired it's game over.", class: "too-tired" },
            { hint: "If your stamina gets to 12 or more, you'll be stuck with indigestion until your stamina gets back down to 10.", class: "too-big" },
            { hint: "Watch out for the dog - Not only does he chase your fluffy self, but he eats the food too.", class: "avoid-dog" },
            { hint: "Hit the \u2190 \u2191 \u2192 \u2193 keys on your keyboard to move. On mobile your screen is the button pad, tap it to move.", class: "move-cat" },
            { hint: "Try to last for 60 seconds!", class: 'time-limit' },
            { hint: "Ready?", class: 'get-ready' }
            ],
        hintIndex: 0,
        buttonText: "Next tip"
    };

    componentDidMount() {
        // Display first hint
        this.nextHint();
    
    };

    nextHint = () => {

        if (!this.state.isDoneHints) {

            if (this.state.hintIndex >= this.state.hints.length - 1) {
                this.state.buttonText = "Start!";
                this.setState(this.state);
            }

            if (this.state.hintIndex >= this.state.hints.length) {
                this.props.startGame(10,8);

            } else {

                this.props.updateMessage(this.state.hints[this.state.hintIndex].hint);
                this.props.updateImg(this.state.hints[this.state.hintIndex].class);
                this.state.hintIndex++;
                this.setState(this.state);
            }

        }
 
    };

    render() {
        return (
            <div className="shutters">
                <div className="shutter--left" style={{width: this.props.widthStyle}} >

                    <span className="shutter__lining hori top"></span>
                    <span className="shutter__lining hori bottom"></span>
                    <span className="shutter__lining vert right"></span>

                    <div className={"shutter__inner--left "+this.props.imgClass}>
                        <span className="game-over">Game Over</span>
                        <span className="message">{this.props.message}</span>



                        {!this.props.isPlayedGame ?
                            <button className="shutter__ctrl skip"
                                onClick={() => this.props.startGame(10,8)} >
                                Skip all
                            </button>
                            :
                            null
                        }
                    </div>
                </div>
                <div className="shutter--right" style={{width: this.props.widthStyle}} >

                    <span className="shutter__lining hori top"></span>
                    <span className="shutter__lining hori bottom"></span>
                    <span className="shutter__lining vert left"></span>

                    <div className={"shutter__inner--right "+this.props.imgClass}>
                        <span className="game-over">Game Over</span>
                        <span className="message">{this.props.message}</span>
                        
                        {!this.props.isPlayedGame ?
                            <button className="shutter__ctrl next" 
                                onClick={() => this.nextHint()} >
                                {this.state.buttonText}
                            </button>
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        );

    };

    

}





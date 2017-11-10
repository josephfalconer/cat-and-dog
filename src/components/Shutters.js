import React, { Component } from 'react';


const hints = [
    { hint: "Get the yummy food.", className: "get-food" },
    { hint: "If you get too tired it's game over.", className: "too-tired" },
    { hint: "If your stamina gets to 12 or more, you'll be stuck with indigestion until your stamina gets back down to 10.", className: "too-big" },
    { hint: "Watch out for the dog - Not only does he chase your fluffy self, but he eats the food too.", className: "avoid-dog" },
    { hint: "Hit the \u2190 \u2191 \u2192 \u2193 keys on your keyboard to move. On mobile your screen is the button pad, tap it to move.", className: "move-cat" },
    { hint: "Try to last for 60 seconds!", className: 'time-limit' },
    { hint: "Ready?", className: 'get-ready' }
];


export default class Shutters extends Component {

    static propTypes = {
    }

    state = {
        hintIndex: 0,
    }

    componentDidMount() {
        // Display first hint
        this.getHint(0);
    
    }

    getHint = increment => {
        const nextHint = hints[this.state.hintIndex + increment];

        if (nextHint)
            this.setState({...this.state, currentHint: hints[this.state.hintIndex + increment] });
    }

    render() {
        const { currentHint } = this.state;
        console.log(currentHint);
        return (
            <div className="shutters">
                <div className="shutter--left" >
                    <span className="shutter__lining hori top"></span>
                    <span className="shutter__lining hori bottom"></span>
                    <span className="shutter__lining vert right"></span>

                    <div className={`shutter__inner--left ${'this.state.currentHint.className'}`}>
                        <span className="message">{currentHint && currentHint.hint}</span>
                    </div>

                </div>

                <div className="shutter--right" >
                    <span className="shutter__lining hori top"></span>
                    <span className="shutter__lining hori bottom"></span>
                    <span className="shutter__lining vert left"></span>

                    <div className={`shutter__inner--right ${'this.state.currentHint.className'}`}>
                        <span className="message">{currentHint && currentHint.hint}</span>
                    </div>

                </div>

                <div style={{position: 'fixed', zIndex: '500'}}>
                    <button className="shutter__ctrl" onClick={()=>{this.getHint(-1)}}>Previous</button>
                    <button className="shutter__ctrl" onClick={()=>{this.getHint(1)}}>Next</button>
                </div>
            </div>
        );
    };
}





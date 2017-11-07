import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Import action creators
import * as ShutterActionCreators from '../actions/shutters';
import * as CatActionCreators from '../actions/cat';
import * as TimerActionCreators from '../actions/timer';

// Garden imports Column which imports Space, which in turn imports Cat and Dog
import Garden from '../components/Garden';
import DirectionButton from '../components/Button';
import Timer from '../components/Timer';
import EndStats from '../components/Stats';
import FloatMessage from '../components/Message';
import Shutters from '../components/Shutters';

// Import CSS
import '../css/garden.css'; 

class App extends Component {

    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    };

    state = {
        difficulty: 600,
        isInGame: false,
        isRequiredGarden: false,

        widthStyle: '50%',
        bgStyle: '#fff',
        clrBrown: "#ad9549",

        selectClass: "shutter__ctrl difficulty",

        isPlayedGame: false,
        isEndedGame: false,
        isStartingGame: false
    };

    setDifficulty = e => {
        this.state.difficulty = parseInt(e.target.value);
        this.setState(this.state);
    };

    startGame = () => {

        // If 'New Game' not clicked
        if (!this.state.isStartingGame) {

            // Avoid user starting multiple games by double clicks on 'New Game'
            this.setState({
                ...this.state,
                isStartingGame: true
            });

            var application = this;

            application.state.isEndedGame = false;
            this.setState(this.state);

            // Constants for shutters
            const { dispatch } = application.props;
            const updateMessage = bindActionCreators(ShutterActionCreators.updateMessage, dispatch);
            const updateImg = bindActionCreators(ShutterActionCreators.updateImg, dispatch);

            // For new games AFTER hints seen
            if (application.state.isPlayedGame) {

                // Set the shutter decoration and message
                updateMessage("Starting a new game...");
                updateImg("get-ready");

                // Close the shutters
                application.state.widthStyle = '50%';
                application.setState(application.state);
                
                setTimeout(function(){
                    // Open again, leaving a second to read and second to open
                    application.state.widthStyle = '0%';
                    application.setState(application.state);
                    // Deliver the game. This also sets state.
                    application.deliverGame();
                },2000);

                setTimeout(function(){
                    // After shutters close, don't need stats
                    application.state.isOutStats = false;

                    // Hide the difficulty select element
                    application.state.selectClass += " hidden";
                    application.setState(application.state);
                },2000);

            
            } else {

                // This code runs FIRST GAME ONLY
                this.state.widthStyle = '0%';
                application.setState(application.state);
                // Manipulate class of select (move over/z-index etc)
                this.state.selectClass += " with-stats hidden";
                // Deliver the game. This also sets state.
                this.deliverGame()
                // App knows at least one game has been played (after shutters close)
                setTimeout(function(){
                    application.state.isPlayedGame = true;
                    application.setState(application.state);
                },1000);
            }

            // Turn the background back to white
            this.state.bgStyle = "#fff";

        }

        

    };

    deliverGame = () => {

        const application = this;

        application.setState({
                ...application.state,
                isInGame: true,
                isRequiredGarden: true,
                isStartingGame: false
            });
        // Make sure the shutters are closed before this.startGame re-activated
        setTimeout(function(){
            application.setState({
                ...application.state,
                isStartingGame: false
            });
        },1000);
    };

    endTheGame = () => {
        // Set state prop to be passed down to Garden component
        this.state.isEndedGame = true;
        this.setState(this.state);

        const application = this;
        // Inform other parts of the application
        application.state.isInGame = false
        // Add a dark background to the screen
        application.state.bgStyle = this.state.clrBrown;

        // After 3 seconds dismount Garden
        setTimeout(() => {
            application.state.isRequiredGarden = false;
            application.setState(this.state);
        },3000);

        setTimeout(() => {
            // Close the shutters after 2 seconds
            application.state.widthStyle = '50%';
            application.setState(application.state);

            // After a further 2 seconds
            setTimeout(function(){
                // Open shutters again 
                application.state.widthStyle = '0%';
                // Show the stats
                application.state.isOutStats = true;
                // Show the select
                application.state.selectClass = "shutter__ctrl difficulty with-stats";

                application.setState(application.state);
            },2000);
        },2000);

        application.setState(application.state);
    };

    render() {

        // Redux properties for shutters
        const { imgClass, message } = this.props.shutters;
        // Redux state properties for cat
        const { energy, mealsEaten, timesStuck, isStuck } = this.props.cat;
        // Redux properties for timer
        const { secsRemaining } = this.props.timer;

        // Dispatch method 
        const { dispatch } = this.props;
        // Shutter action creators
        const updateImg = bindActionCreators(ShutterActionCreators.updateImg, dispatch);
        const updateMessage = bindActionCreators(ShutterActionCreators.updateMessage, dispatch);
        // Cat action creators
        const updateEnergy = bindActionCreators(CatActionCreators.updateEnergy, dispatch);
        const fixCat = bindActionCreators(CatActionCreators.fixCat, dispatch);
        const freeCat = bindActionCreators(CatActionCreators.freeCat, dispatch);
        const resetStats = bindActionCreators(CatActionCreators.resetStats, dispatch);
        
        // Timer action creators
        const updateSecsRemaining = bindActionCreators(TimerActionCreators.updateSecsRemaining, dispatch);
        const resetTimer = bindActionCreators(TimerActionCreators.resetTimer, dispatch);
 
        return (
            <div className="main-container">

                <div className="garden__bg" style={{background: this.state.bgStyle}} ></div>

                <div className="garden__contr">

                    {this.state.isRequiredGarden ?
                        <Garden
                            width={this.props.width}
                            height={this.props.height}
                            difficulty={this.state.difficulty}
                            energy={energy}
                            updateEnergy={updateEnergy}
                            fixCat={fixCat}
                            isStuck={isStuck}
                            freeCat={freeCat}
                            resetStats={resetStats}
                            updateMessage={updateMessage}
                            updateImg={updateImg}
                            endTheGame={this.endTheGame}
                            isEndedGame={this.state.isEndedGame} />
                        :
                        null
                    }

                    {isStuck ? 
                        <FloatMessage />
                        :
                        null
                    }


                    <Shutters 
                        message={this.state.message} 
                        startGame={this.startGame} 
                        widthStyle={this.state.widthStyle}
                        imgClass={imgClass}
                        message={message}
                        updateImg={updateImg}
                        updateMessage={updateMessage}
                        isPlayedGame={this.state.isPlayedGame}
                    />

                    {this.state.isOutStats ?
                        <EndStats 
                            newGame={this.startGame}
                            statsInfo={this.state.statsInfo}
                            secsRemaining={secsRemaining}
                            energy={energy}
                            mealsEaten={mealsEaten}
                            timesStuck={timesStuck}
                        />
                        :
                        null
                    }

                    
                    <select className={this.state.selectClass} onChange={this.setDifficulty} >
                        <option value={600}>Easy</option>
                        <option value={500}>Medium</option>
                        <option value={400}>Hard</option>
                    </select>
                
                    {this.state.isInGame ? 
                        <Timer 
                            updateSecsRemaining={updateSecsRemaining}
                            resetTimer={resetTimer}
                            secsRemaining={secsRemaining} 
                            energy={energy} 
                            updateMessage={updateMessage}
                            updateImg={updateImg}
                            endTheGame={this.endTheGame}
                            isEndedGame={this.state.isEndedGame}
                        />
                        :
                        null
                    }
                </div>
            </div>
        );
    }

};

const mapStateToProps = state => (
    {
        shutters: state.shutters,
        cat: state.cat,
        timer: state.timer
    }
);

export default connect(mapStateToProps)(App);


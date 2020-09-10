import React from 'react';
import Cell from './Cell';
import Statics from './Statics';
import '../Styles/Game.css'

const newGun = Array(15).fill(null);
const fireVoice = new Audio('https://www.cinarr.com/gunfire.mp3');
const loseVoice = new Audio('https://www.cinarr.com/game-lose-2.mp3');
const successVoice = new Audio('https://www.cinarr.com/success-sound-effect.mp3');
const backgroundVoice = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: Array(10).fill(new Array(15).fill(null)),
            isRunning: false,
            point: 0,
            gunPoint: 7,
            previousGunPoint: 0,
            enemyLevel: 1,
            levelTarget: 0,
            attackCount: 1500,
            currentAttack: 0,
            bullet: 0,
            gameStatus: 'Ready To Start!'
        }

        this.baseState = this.state;
        this.gameRef = React.createRef();
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        this.attack();
    }

    async handleKeyDown(event) {
        if (event.keyCode === 37 && this.state.gunPoint > 0) {
            this.setState({
                previousGunPoint: this.state.gunPoint,
                gunPoint: this.state.gunPoint - 1
            }, () => {
                this.InitializeGun();
            });
        }

        if (event.keyCode === 39 && this.state.gunPoint < 14) {
            this.setState({
                previousGunPoint: this.state.gunPoint,
                gunPoint: this.state.gunPoint + 1
            }, () => {
                this.InitializeGun();
            });
        }

        if (event.keyCode === 32) {
            this.fire(this.state.gunPoint);
        }
    }

    async InitializeGun() {
        if (this.state.isRunning) {
            const newStage = this.state.stage.slice();
            newGun[this.state.previousGunPoint] = 4;
            newGun[this.state.gunPoint] = 1;
            newStage[9] = newGun;

            this.setState({
                stage: newStage
            });
        }
    }

    async fire(point) {
        if (this.state.isRunning) {
            const currentStage = this.state.stage.slice();
            let isAttacking = true;

            if (this.state.bullet > 0) {
                fireVoice.load();
                fireVoice.play();

                this.setState({
                    bullet: (this.state.bullet - 1)
                });

                for (let index = currentStage.length - 2; index >= 0; index--) {
                    setTimeout(() => {
                        const oldFire = currentStage[index + 1];

                        if (oldFire[point] === 3) {
                            oldFire[point] = 4;
                        }
                        currentStage[index + 1] = oldFire;

                        if (isAttacking) {
                            if (index > 1) {
                                const newFire = currentStage[index];

                                if (newFire[point] === 2) {
                                    this.setState({
                                        point: this.state.point + 1
                                    });
                                    isAttacking = false;
                                }

                                newFire[point] = 3;
                                currentStage[index] = newFire;
                                this.InitializeGun();
                            }
                        }

                        this.setState({
                            stage: currentStage
                        });

                        this.CheckGameStatus();
                    }, (currentStage.length - index) * 25);
                }
            }
        }
    }

    async attack() {
        for (let index = this.state.currentAttack; index <= this.state.attackCount; index++) {
            setTimeout(() => {
                if (this.state.isRunning) {
                    this.CheckGameStatus();

                    const newStage = this.state.stage.slice();
                    const rand = Math.floor(Math.random() * 14);
                    const enemy = Array(15).fill(null);

                    if (index < this.state.attackCount) {
                        enemy[rand] = 2;
                    }

                    newStage.splice((newStage.length - 2), 1);

                    this.setState({
                        stage: [
                            enemy,
                            ...newStage
                        ]
                    });
                }
            }, (index + 1) * 1000);
        }
    }

    InitializeLevel() {
        this.setState({
            bullet: this.state.enemyLevel * 10,
            levelTarget: this.state.enemyLevel * 7
        });
    }

    CheckGameStatus() {
        if (this.state.bullet === 0) {
            this.setState({
                isRunning: false,
                gameStatus: "Game Over!"
            });

            backgroundVoice.pause();
            loseVoice.play();

        } else if (this.state.point === this.state.levelTarget) {
            this.setState({
                point: 0,
                levelTarget: this.state.levelTarget,
                enemyLevel: (this.state.enemyLevel + 1)
            });

            successVoice.play();
            this.InitializeLevel();
        } else {
            const controlledLine = this.state.stage[8];

            for (let index = 0; index < controlledLine.length; index++) {
                if (controlledLine[index] === 2) {
                    this.setState({
                        isRunning: false,
                        gameStatus: "Game Over!"
                    });

                    backgroundVoice.pause();
                    loseVoice.play();
                }
            }
        }
    }

    start() {
        if (!this.state.isRunning && this.state.enemyLevel === 1) {
            this.setState({
                isRunning: true,
                gameStatus: "Fireee!!"
            });

            backgroundVoice.load();
            backgroundVoice.play();

            setTimeout(() => {
                this.InitializeLevel();
                this.InitializeGun();
            }, 50);

            this.gameRef.current.focus();
        }
    }

    reset() {
        this.setState(this.baseState);

        backgroundVoice.pause();
        this.gameRef.current.focus();
    }

    pause() {
        if (this.state.isRunning) {
            backgroundVoice.pause();
        } else {
            backgroundVoice.play();
        }

        setTimeout(() => {
            this.setState({
                isRunning: !this.state.isRunning
            });
        }, 50);
        this.gameRef.current.focus();
    }

    render() {
        return (
            <div className="game-area">
                <div className="game-board" ref={this.gameRef} onKeyDown={this.handleKeyDown} tabIndex="0" >
                    {this.state.stage.map(row => row.map((cell, x) => <Cell key={x} type={cell} />))}
                </div>
                <Statics
                    bullet={this.state.bullet}
                    Point={this.state.point}
                    Enemy={this.state.enemyLevel}
                    Status={this.state.gameStatus}
                    Start={() => this.start()}
                    Reset={() => this.reset()}
                    Pause={() => this.pause()}
                />
            </div>
        );
    }
}

export default Game;
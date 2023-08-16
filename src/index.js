import React from "react";
import ReactDOM  from "react-dom";

 //game react file responsible for the messages given to user of the game, user interactions
import {Message, generate_game_board, set_disk, ResetArray, UndoBoard} from './game'; 

let diskClicked = "empty"; //string storing the disk clicked
let isActive = false; //stores whether or not a game is active

//generate the visual representation of the game board with the onclick attributes
generate_game_board();
//renders the initial message with the correct prop when clicked
ReactDOM.render(<Message isActive={isActive} player={diskClicked}/>, document.getElementById('game-status'));

//component for the red disk
class RedDisk extends React.Component {
    constructor(props) {
        super(props);
        this.state = { //this state consists of the style
            style: {
                backgroundColor: "red",
                position: "relative",
                boxShadow: "none"
            }  
        };
        this.left = this.left.bind(this);
    }

    clicked() {
        diskClicked = "red";
        isActive = true;

        //calls function to show the active button by changing style
        showActiveButton(diskClicked);

        set_disk(diskClicked); //calls function to change the game board color accordingly
        //renders the message with the correct prop when clicked
        ReactDOM.render(<Message isActive={isActive} player={diskClicked}/>, 
            document.getElementById('game-status'));
    }

    left() {
        //remove shadow if this disk is no longer the active one.
        if(diskClicked !== "red") {
            this.setState({
                style: {
                    backgroundColor: "red",
                    position: "relative",
                    boxShadow: "none"
                }  
            });
        }
    }

    render() {
        return (
            <div>
                <button id="red" onClick={this.clicked} onMouseLeave={this.left} style={this.state.style}>
                Red
                </button>
            </div>
        );
    }
};

//component for the black disk
class BlackDisk extends React.Component {
    constructor(props) {
        super(props);
        this.state = { //this state consists of the style
            style: {
                backgroundColor: "black",
                position: "relative",
                boxShadow: "none"
            }  
        };
        this.left = this.left.bind(this);
    }

    clicked() {
        diskClicked = "black";
        isActive = true;

        //calls function to show the active button by changing style
        showActiveButton(diskClicked);

        set_disk(diskClicked); //calls function to change the game board color accordingly
        //renders the message with the correct prop when clicked
        ReactDOM.render(<Message isActive={isActive} player={diskClicked}/>, 
            document.getElementById('game-status'));
    }

    left() {
        //remove shadow if this disk is no longer the active one.
        if(diskClicked !== "black") {
            this.setState({
                style: {
                    backgroundColor: "black",
                    position: "relative",
                    boxShadow: "none"
                }  
            });
        }
    }

    render() {
        return (
            <div>
                <button id="black" onClick={this.clicked} onMouseLeave={this.left} style={this.state.style}>Black</button>
            </div>
        );
    }
};

const disks = [<RedDisk></RedDisk>, <BlackDisk></BlackDisk>]; //array of the player disks
ReactDOM.render(disks, document.getElementById('disks'));


//component for the undo button
class Undo extends React.Component {
    clicked() {
        //calls the function to render the message, undo the board
        UndoBoard();
    }

    render() {
        return (
            <div>
                <button className="action" onClick={this.clicked}>Undo</button>
            </div>
        );
    }
};

//component for the reset button
class Reset extends React.Component {
    clicked() {
        //resets the game
        
        let answer = window.confirm("Are you sure you want to reset the game? All progress will be lost.");
        if (answer) {
            isActive = false;
            diskClicked = "empty"; //intializes the game back to the empty value
            showActiveButton("empty");
            ResetArray(); //calls function to reset array;
        }
        else {
            isActive = true;
        }
        //renders the message with the correct prop when clicked
        ReactDOM.render(<Message isActive={isActive} player={diskClicked}/>, 
            document.getElementById('game-status'));
    }

    render() {
        return (
            <div>
                <button className="action" onClick={this.clicked}>New Game</button>
            </div>
        );
    }
};

//renders the undo and reset buttons
const action = [<Undo></Undo>, <Reset></Reset>];
ReactDOM.render(action, document.getElementById('action-buttons'));

//function to show the active button 
export function showActiveButton(id_input) {
    //checks that the id is not the empty value, and changes the opposites.
    if(id_input !== "empty") {
        const element = document.getElementById(id_input);
        element.style.boxShadow = "0 35px grey";
        element.style.bottom = "35px";

        if (id_input === "red") {
            const black = document.getElementById("black");
            black.style.boxShadow = "none";
            black.style.bottom = "0";
        } else if (id_input === "black") {
            const red = document.getElementById("red");
            red.style.boxShadow = "none";
            red.style.bottom = "0";    
        }
    } 
    //if the active button is empty again, reset both the red and black buttons to their defaults
    if(id_input === "empty") {
        const red = document.getElementById("red");
        red.style.boxShadow = "none";
        red.style.bottom = "0";

        const black = document.getElementById("black");
        black.style.boxShadow = "none";
        black.style.bottom = "0";
    } 
}
/* eslint-disable no-loop-func */
import React, {useState} from "react";
import ReactDOM  from "react-dom";

import {getArray, CheckForWinner} from './game_calc'; 
import { showActiveButton } from "./index";

const num_rows = 6; //number of rows in the board;
const num_columns = 7; //number of columns in the board

let diskClicked = "empty" //this records the disk clicked
let winnerFound = false; //records if a winner has been found
let winnerName = ""; //records the name of the winner

let arrayBoard = []; //2d array of the board, initiated as:
for (let row = 0; row < num_rows; row++) {
    let subArray = []; //subarray to add
    for (let column = 0; column < num_columns; column++) {
        subArray.push("empty"); //initializes all elements with empty
    }
    arrayBoard.push(subArray)
}

//these two variables store variables needed for the undo button.
let historyArray = [];  //array storing the history of the game instance in terms of the board and the player played, allowing undos to happen.

//displays message based on the status of the game
export class Message extends React.Component {
    
    render() {
        if(this.props.isActive === false) {
            return (
                <p>Start a new game by clicking any disk</p>
            );
        } else if (this.props.isActive === true) {  //message when 
            showActiveButton(this.props.player);
            set_disk(this.props.player);
            return (
                <p>It's player {this.props.player}'s turn</p>
            );
        } else if (this.props.message !== false) { //message when an explicit message is passed in
            return (
                <p>{this.props.message}</p>
            );        
        }
    }
};

//function to generate the array representation of the board that is used to make pattern computations;

//function to set the disk used
export function set_disk (input) {
    diskClicked = input;
}

//component-based representation of the board based on the array board with each slot being a react component with a column id.
//each slot has an onclick attribute that causes a column insertion to be recorded. 
//the disk parameter is the string representing the value of the disk inserted: red or black
export function generate_game_board() {
    let slots  = []; //array of the slots
    for (let row = 0; row < num_rows; row++) {
        let subArray = []; //subarray for the slots
        for (let column = 0; column < num_columns; column++) {
            class Slot extends React.Component { 
                 //function for handling clicked events
                clicked() { 
                    //code only runs if the diskClicked is not set to empty
                    if (diskClicked !== "empty") {   
                        //changes the array and outputs a message if the change occurs
                        getArray(arrayBoard, column, diskClicked);
                        //changes the color based on the array 
                        modifyColor(arrayBoard);
                        
                        //adds the arrayBoard to the history Array the Array board and the player disk                        
                        const history  = Copy2dArray(arrayBoard);
                        historyArray.push([diskClicked, history]);

                        //finds the next player.
                        let nextPlayer = "red"
                        if (diskClicked === "red") {
                            nextPlayer = "black";
                        }    
                        //updates the message to pass to the next player
                        ReactDOM.render(<Message isActive={true} player={nextPlayer}/>, 
                            document.getElementById('game-status')); 

                        //modifies the game array and 
                        //checks for a winner and output a message if no winner has been found
                        if (winnerFound) {
                            //output the same winner if a winner has already been found
                            ReactDOM.render(<Message message={winnerName+ " has already won! Please start a new game."}/>, 
                                document.getElementById('game-status'));  

                        } else if (CheckForWinner(arrayBoard, diskClicked) && !winnerFound) {
                            winnerFound = true; //set variables when a winner is found for the first time
                            winnerName = diskClicked;
                        }                          
                    }
                }
                
                render () {
                     //returns the circularly shaped slots
                     //the id name is based on the column number and row number as a string
                    return (
                        <button onClick={this.clicked} className="slot"  id={"r"+row+"c"+column}>

                        </button>
                    );
                }        
            }
            subArray.push(<Slot></Slot>); //initializes all elements with empty
        }
        slots.push(subArray)
    }
    ReactDOM.render(slots, document.getElementById("board"))//append the slots to the game
}

export function ResetArray() {
    //resets all values to default ones:
    historyArray = [];
    diskClicked = "empty";
    winnerFound = false;
    winnerName = "";

    arrayBoard = [];
    for (let row = 0; row < num_rows; row++) {
        let subArray = []; //subarray to add
        for (let column = 0; column < num_columns; column++) {
            subArray.push("empty"); //initializes all elements with empty
        }
        arrayBoard.push(subArray)
    }
    generate_game_board();
}

//functions to undo the board
export function UndoBoard() {
    //only allow undos if there is already one disk on the board
    if(historyArray.length > 1) {
        //remove the last element
        historyArray.pop();
        let lastPlayer = historyArray[historyArray.length - 1][0];
        arrayBoard = historyArray[historyArray.length - 1][1]; //change the array to be the past one.

        modifyColor(arrayBoard); //change the color of the array
        ReactDOM.render(<Message isActive={true} player={lastPlayer}/>, document.getElementById('game-status'));

        //check for winner again with the last player. If there is no winner anymore, change the boolean to false
        if (!CheckForWinner(arrayBoard, lastPlayer)) {
            winnerFound = false;
        }
    } else {
        ReactDOM.render(<Message message={"Board cannot be undone further. Restart game."}/>, 
            document.getElementById('game-status'));
    }
}

//changes color of the slotsbased on the array provided and the disk clicked
function modifyColor(array) {
    for (let row = 0; row < num_rows; row++) {
        for (let column = 0; column < num_columns; column++) {
            //gets each slot rendered in the game board
            //this works since each slot has been assigned an id this way
            let slot = document.getElementById("r"+row+"c"+column); 
            //changes if the color is not empty
            if(array[row][column] !== "empty") {
                slot.style.backgroundColor= array[row][column];
            } else {
                slot.style.backgroundColor= "white";
            }
        }
    }
}

//function to copy the subarray
function Copy2dArray(Array2d) {
    let to_return = [];

    for (let row = 0; row < num_rows; row++) {
        let subArray = [];
        for (let column = 0; column < num_columns; column++) {
            subArray.push(Array2d[row][column]); //add elements to the subarray
        }
        to_return.push(subArray);
    }

    return to_return;
}


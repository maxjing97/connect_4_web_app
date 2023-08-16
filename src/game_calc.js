import ReactDOM  from "react-dom";

import { Message } from "./game";

const num_rows = 6; //number of rows in the board;
const num_columns = 7; //number of columns in the board

//function modifies the values of an array after column has been clicked
export function getArray(array, column, disk) {
    if (disk !== "empty") {
        let dropped = false; //boolean variable to check if a disk has been dropped in this function call. initialized to false

        for (let row = 0; row < num_rows; row++) {
          if (array[row][column] === "empty" && !dropped) {
      
            array[row][column] = disk; //sets the first row, if the first row is empty.
            dropped = true; //sets dropped to true afterwards
          } 
        }
    }
}

//function to check for winner and output a message is there is a winnter
export function CheckForWinner(array, disk) {
    //invokes search for winner on all 4 possible directions, represented by a enum
    if (FindHorizontalRows(array, disk)) {
      //output message of winner if a winner has been found,
      ReactDOM.render(<Message message={disk+ " has won!"}/>, 
        document.getElementById('game-status'));
        return true;
    }
    else if (FindVerticalRows(array, disk)) {
      //output message of winner if a winner has been found,
      ReactDOM.render(<Message message={disk+ " has won!"}/>, 
        document.getElementById('game-status'));
      return true;
    }
    else if (FindLeftDiagonalRows(array, disk)) {
      //output message of winner if a winner has been found,
      ReactDOM.render(<Message message={disk+ " has won!"}/>, 
        document.getElementById('game-status'));
      return true;
    }
    else if (FindRightDiagonalRows(array, disk)) {
      //output message of winner if a winner has been found,
      ReactDOM.render(<Message message={disk+ " has won!"}/>, 
        document.getElementById('game-status'));
      return true;
    }

    return false;
  }
  
  //helper function to find horizontal rows by iterating through the columns
  function FindHorizontalRows(array, disk) {
    //iterate through each  columns to find the number of consecutive enums
    for(let row = 0; row < num_rows; row++) {
      for(let col = 0; col < num_columns; col++) {
        //check for 4 consecutive rows: this is only possible is the row index is not greater than 4 less than the length
        if(col <= (num_columns - 4)) {   
          let consecutive = 0;//stores number of consecutive values equal to the passed disk are found
  
          //then loop through the following four values to see if any of them match the disk type.
          for (let i = 0; i < 4; i++) {
            if (array[row][col + i] === disk) {
              consecutive++;
            }
          }
  
          //return true if consecutive values are found.
          if (consecutive === 4) {
            return true;
          }  
        
        }
      }
    }
  
    return false;
  }
  
  //helper function to find vertical rows by iterating through the columns
  function FindVerticalRows(array, disk) {
    //iterate through each  columns to find the number of consecutive enums
    for(let col = 0; col < num_columns; col++) {
      for(let row = 0; row < num_rows; row++) {
        //check for 4 consecutive rows: this is only possible is the row index is not greater than 4 less than the length
        if(row <= (num_rows - 4)) {   
          let consecutive = 0;//stores number of consecutive values equal to the passed disk are found
  
          //then loop through the following four values to see if any of them match the disk type.
          for (let i = 0; i < 4; i++) {
            if (array[row+i][col] === disk) {
              consecutive++;
            }
          }
  
          //return true if consecutive values are found.
          if (consecutive === 4) {
            return true;
          }  
        
        }
      }
    }
    
    
    return false;
  }
  
  //helper function to find left diagonal rows by iterating through the columns and rows
  function FindLeftDiagonalRows(array, disk) {
    //iterate through each  columns to find the number of consecutive enums
    
    for(let row = 0; row < num_rows; row++) {
      for(let col = (num_columns - 1); col >= 0; col--) {
        if(col >= 3 && row <= (num_rows-4)) {   
          let consecutive = 0;//stores number of consecutive values equal to the passed disk are found
  
          //then loop through the following four diagonal values to see if any of them match the disk type.
          for (let i = 0; i < 4; i++) {
  
            if (array[row+i][col - i] === disk) {
              consecutive++;
            }
          } 
          //return true if consecutive values are found.
          if (consecutive === 4) {
            return true;
          }  
        
        }
      }
    }
  
    return false;
  } 
  
  //helper function to find right diagonal rows by iterating through the columns and rows
  function FindRightDiagonalRows(array, disk) {
      //iterate through each  columns to find the number of consecutive enums
    for(let row = 0; row < num_rows; row++) {
      for(let col = 0; col < num_columns; col++) {
        if(col <= (num_columns - 4) && row <= (num_rows-4)) {   
          let consecutive = 0;//stores number of consecutive values equal to the passed disk are found
  
          //then loop through the following four diagonal values to see if any of them match the disk type.
          for (let i = 0; i < 4; i++) {
            if (array[row+i][col + i] === disk) {
              consecutive++;
            }
          }
  
          //return true if consecutive values are found.
          if (consecutive === 4) {
            return true;
          }  
        
        }
      }
    }
  
    return false;
  }

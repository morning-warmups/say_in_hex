(function Main() {
  'use strict';
  var input, tens, ones;
  // the input is the puzzle, or things that we want to resolve.
  input = ['0xF5', '0xB3', '0xE4', '0xBBBB', '0xA0C9', '0xBEF0FF'];

  // we'll say each number comes in pairs.
  // x0 is a prefix, base 16 hex. 
  // http://stackoverflow.com/questions/8186965/what-do-numbers-using-0x-notation-mean
  // tens, is the name we're gonna give each value if is on the first position
  tens = {
    'A': 'atta',
    'B': 'bibbity',
    'C': 'city',
    'D': 'dickety',
    'E': 'ebbity',
    'F': 'fleventy',
    '0': ''
  };

  // this is the names of the values that we're gonna give them if they're
  // in the second position
  ones = {
    '0': '',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
    'A': 'ehh',
    'B': 'bee',
    'C': 'cee',
    'D': 'dee',
    'E': 'eee',
    'F': 'eff'
  };

 // first we iterate in the array of inputs, because we need to solve each one.
  for (var k in input) {
    // creating local scope variables, one for pairs, because we're reading hex in pairs
    // output is the string where we're gonna store the value for this input, it resets each time
    var pairs, output;
    // when you iterate in an object, you should check whether the property is original or was inherited 
    // from the prototype. 
    // Which now that I think about it wasn't needed here because we're iterating an array. must've been that I'm used to it.
    if (input.hasOwnProperty(k)) {
      // we're using a regular expresion literal, it says any letter from A to F and any number
      // from 0 to 9, which is repeated twice, the g modifier makes it so it returns all ocurrences and 
      // not just the first one.
      // pairs will be equal to an array of pairs that we can try and read.
      pairs = input[k].match(/[A-F0-9]{2}/g);
      // if pairs is null, it means the regex didn't match and the input is invalid.
      if (pairs === null) {
        continue;
      }
      //first part of output is going to be the original value. 
      output = input[k] + " ";
      // now we iterate in the array of pairs we just created.
      for (var i = 0; i < pairs.length; i++) {
        // using ternary operators because they look nice.
        // this say, if i (the index of current pair) is less than 1, then output is empty
        // if not, it is bitey, because in the rules say "Above a full byte you add "bitey" to the name"
        output += i < 1 ? '' : 'bitey ';
        // the first element of the pair is named in the array tens, so we look for tens[current pair][first character]
        // you can access the characters on a string using the [] notation
        output += tens[pairs[i][0]] + "-";
        // the second element of the pair is named in the array ones, so we look for ones[current pair][second character]
        output += ones[pairs[i][1]];
        // if the first char of the pair is a zero we add a space, I don't remember why.
        output += pairs[i][0] == '0' ? " " : "";
      }
      // show the output to the user either in browser or shell.
      console.log(output);
    }
  }


})();
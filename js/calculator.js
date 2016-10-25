$(document).ready(function(){
   var memory = "", memOn = false,                       // Clear Memory / "Nothing on it"
       memCall = false, clear = false, equal = false,    // Last Btn info
       previousVal = "0+", currentVal = "",
       decimalPoint = false;

// Format values and display (for now just display)      // For now, CALC is 100% functional, but doesn't add commas
   function calcDisplay(val, dot) {                      // This feature will be added as soon as I have more time,
      if (!dot) {                                        // but for now, I'll just submit it as it is, with Love!! :)
         $('#numDisp').html(String(val));          // Plain number display
      } else {
         $('#numDisp').html(String(val) + dot);    // Add a dot in case decimal was JUST pressed
      }
//      console.log($('#numDisp').html());
   }

// Do the math and call calcDisplay
   function calculate() {
      // Avoid large numbers
      if (isNaN(previousVal[previousVal.length-1]) && currentVal === "") {    // Removes symbol if no number to calculate
         previousVal = previousVal.slice(0, previousVal.length-1);
      }
      if (eval(previousVal + currentVal) > 999999999) {
         previousVal = String(eval(previousVal + currentVal).toExponential(6));
      } else { // Just do the math
         previousVal = eval(previousVal + currentVal) % 1 === 0 ? String(eval(previousVal + currentVal)) : String(eval(previousVal + currentVal).toFixed(2));
      }
      // Resets
      currentVal = "";
      decimalPoint = false;
      calcDisplay(previousVal);
   }

// Clear Memory
   function memClear() {
      memory = ""; // <--- Cleared
      memOn = false; // <--- There's nothing in the Memory!!
      memCall = false; // Reset btn call
   }
 
// Memory + and - buttons
   $('.memory').click(function() {
      memory += this.value + $('#numDisp').html(); // Will get + or - and current value
      memory = memory.replace(/--/g, "+");         // Fixes issue with eval ("--")
      memory = String(eval(memory));
      memOn = true; // <--- There's something in the Memory!!
      
/* TOOK THIS AWAY, after thinking about it.. Perhaps I'll bring this behaviour back (i.e. clearing memory if it is === 0)
      if (eval(memory) === 0) {
         memClear();
      }
*/
      // Resets
      if (isNaN(memory)) {
         memory = "";
         memClear();
      }
      equal = false;
      memCall = false;
      clear = false;
   });

// Memory mrmc button   
   $('.memoryCall').click(function() {
      if(equal) {
         currentVal = "";
         previousVal = "0+";
      }
      if (memOn) {
         calcDisplay(currentVal = memory);
         if (memCall) {
            memClear();
         }
         memCall = true;
      }
      // Resets
      equal = false;
      clear = false;
   });

// Number buttons
   $('.number').click(function() {
      if(equal || memCall) {
         currentVal = "";
         previousVal = "0+";
         if (memCall) {
            $('#symbolDisp').html("");
         }
      }
      if(currentVal.length < 9) {
         if ($('#numDisp').html() === "0") {
            currentVal = "";
         }
         currentVal += this.value;
      }
      calcDisplay(currentVal);
      // Resets
      equal = false;
      memCall = false;
      clear = false;
   });
   
// Symbol buttons
   $('.symbol').click(function() {
      $('#symbolDisp').html(this.value);
      if (!equal) {
         calculate();
      }
      previousVal += this.value;
      // Resets
      equal = false;
      memCall = false;
      clear = false;
   });
   
// Decimal button
   $('.dot').click(function() {
      if (!decimalPoint) {
         currentVal = currentVal === "" ? "0." : currentVal + ".";
         calcDisplay(eval(currentVal), ".");
         decimalPoint = true;
      }
      // Resets
      equal = false;
      memCall = false;
      clear = false;
   });

// C (Clear) button
   $('.clear').click(function() {
      // Just clear the screen and current num
      calcDisplay(0);
      currentVal = "";
      if (clear) {  // If pressed twice in a row, reset calc
         previousVal = "0+";
         $('#symbolDisp').html("");
      }
      clear = true;
      // Resets
      equal = false;
      memCall = false;
      decimalPoint = false;
   });

// Equal-To button
   $('.equal').click(function() {
      $('#symbolDisp').html("");
      if (!equal) {
         calculate();
      }
      // Resets
      clear = true;  // So that CLEAR btn acts as 2nd click after EQUAL
      equal = true;
      memCall = false;
   });
   
});

//words array holds all words
//correct array holds a zero(not yet identifed), or a one(identifed), for each word at the corresponding index
const tally = {
    'words': {
      'pink': ['see','big','a','I','at','we','he','go','is','the','can', 'like'],
      'red': ['come','dad','fun','into','have','here','on','look','jump','with','run','play'],
      'orange':['has','her','his','it','to','in','too','she','you','an','and','get'],
      'yellow':['not','new','of','yes','will','this','good','for','be','mom','little','me'],
      'green':['its','said','make','by','do','put','friend','time','who','your','does','because'],
      'teal':['how','more','now','him','goes','are','them','there','they','their','that','some'],
      'blue':['was','were','when','from','but','had','no','want','or','all','been','as'],
      'purple':['what','which','would','these','two','up','if','my','one','about','could','first'],
      'white':['not','only','out','any',"don't",'many','then','where','why','saw','say','so']
      },
    'correct': [],
    'colors':{
      'pink':'#f5c8f8',
      'red':'#fa586f',
      'orange':'#f66926',
      'yellow':'#f6e926',
      'green':'#26f627',
      'teal':'#16dff8',
      'blue':'#699bf1',
      'purple':'#be69f1',
      'white':'#ffffff'
    }
  }
  
  var notGotWords,
      counter,
      defaultArray;
  //Get the selected color from the dropdown, corresponding to the word array of interest
  function getSetWord(){
    var el = document.getElementById("wordSelect");
    var wordSet = el.options[el.selectedIndex].value;
    return wordSet;
  }
  function getSelected(){
    let setChoice = getSetWord();
    return tally.words[setChoice];
    }
  function getColor(){
    let setChoice = getSetWord();
    return tally.colors[setChoice];
  }
  function updateColor(){
    var el = document.getElementById("word-wrapper");
    var theColor = getColor();
    el.style.backgroundColor = theColor;
  }
  //Fill the zero array (scoreboard) based on length of selected words array
  function fillZeroArray(arrSelect){
    
    let zeroArr = new Array(arrSelect.length).fill(0); 
    tally.correct = zeroArr; 
  }
   
   //Will filter the selected array based on words that have not been correctly identified
   function notGot(item,index){
    
    return tally.correct[index] == 0;
    
  }
    //Clear div of current word, called when new selection is made
   function clearDiv(){
     
     document.getElementById("word-wrapper").innerHTML = '';
   }

   function mixWords(arr){
  
    let newArr = [];
    let allWords = arr;
    let wordLen = allWords.length;
    
    while (newArr.length < wordLen){
      let randIndex = Math.floor(Math.random()*allWords.length);
      newArr.push(allWords[randIndex]);
      allWords.splice(randIndex,1);
      
    }
    
    return newArr;

  }
   //Get the selection, update the array to work on, and create the scoreboard array
   function updateNotGot(){
      
      
      var selectedArr = mixWords(getSelected());
      let setChoice = getSetWord();
      tally.words[setChoice] = selectedArr;
      fillZeroArray(selectedArr);
      notGotWords = selectedArr.filter(notGot);
      clearDiv();
      updateColor();
      updateMissBtnBlue();
      counter = 0;
    }
  
   updateNotGot();
  //After clicking 'Go' initially, button text and color changes
   function updateMissBtn(){
     
     var el = document.getElementById("change");
     
     if(el.classList.contains('btn-primary')){
       el.classList.replace('btn-primary', 'btn-danger');
       el.innerHTML = 'missed';
     } 
     
   }
    //Reverts button back to 'Go' and blue when starting new word set
    function updateMissBtnBlue(){
     
     var el = document.getElementById("change");
       el.classList.replace('btn-danger', 'btn-primary');
       el.innerHTML = 'GO';   
   }
    
   function showWord(){
    
     updateMissBtn(); 
    
     if(counter === notGotWords.length){  
      var selectedArr = getSelected();
      notGotWords = selectedArr.filter(notGot);
      counter = 0;
    }
    currWord = notGotWords[counter];
    document.getElementById("word-wrapper").innerHTML = currWord;
    textFit(document.getElementById("word-wrapper"), {alignHoriz: true, alignVert: true});
    counter += 1;
  }
    //check if all words have been correctly identified
    function allCorrect(){
      
      return tally.correct.indexOf(0) === -1;
    }  
   
    function logCorrect(){
  
      var selectedArr = getSelected();
      //Adjust counter (it was already incremented in showWord)
      currIndex = counter - 1;
      //Return the word
      currWord = notGotWords[currIndex];
      //Find the index of the word in the original words array
      wordIndex = selectedArr.indexOf(currWord);
      //Update tally.correct array to show it was correctly identified
      tally.correct[wordIndex] = 1;
      //Check if all the words have been identified
      if(allCorrect()){
        
        alert('Congrats! All correct!');
        updateNotGot();
        updateMissBtnBlue();
        return;
      }
      
      showWord();
      
    }

    /*
    //will randomly pick from a list of items
    function pickRandomLines(arr){
  
  let newArr = [];
  
  let allLines = arr;
  
  while (newArr.length < 3){
    
  let randIndex = Math.floor(Math.random()*allLines.length);
  
  newArr.push(allLines[randIndex]);
  
  allLines.splice(randIndex,1);
    
  }
  
  return newArr;
}
*/
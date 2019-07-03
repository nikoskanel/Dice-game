
let scores,roundScore,activePlayer,gamePlaying;


init();

document.querySelector('.btn-roll').addEventListener('click',function(){
    
    if (gamePlaying){
    //1. Random number
    let dice=Math.floor(Math.random() * 6) + 1;
    let dice2=Math.floor(Math.random() * 6 )+ 1;

    //2. Display the result
    let diceDOM = document.querySelector('.dice');
    let dice2DOM = document.querySelector('.dice-2');

    document.querySelector('.dice').style.display = 'block';
    document.querySelector('.dice-2').style.display = 'block';

    document.querySelector('.dice').src = 'dices/dice-'+ dice + '.png';
    document.querySelector('.dice-2').src = 'dices/dice-'+ dice2 + '.png';


    //3. Update the round score IF the number is NOT 1
    if (dice>1 && dice2>1){
        //Add score
        roundScore += dice + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;

    }else if (dice===1 || dice2===1){
        //Display dice-1 and lost message for 2 seconds
        diceDOM.src = 'dices/dice-1.png';
        document.querySelector('.lost-msg').style.display = 'block';
        gamePlaying=false;
        setTimeout(nextPlayer,1000);
    }
    }
    

});

document.querySelector('.btn-hold').addEventListener('click',function(){
    if (gamePlaying){
        //Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.querySelector('#score-'+ activePlayer).textContent = scores[activePlayer];
    
    //Winning Score
    let input=document.querySelector('.final-score').value;
    let winningScore;
    if (input){
         winningScore=input;
    }else{
         winningScore=100;
    }

    //Check if player won the game
    if (scores[activePlayer]>=winningScore){
        document.querySelector('#name-'+activePlayer).textContent = 'Winner!!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice-2').style.display = 'none';

        document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        
        gamePlaying = false;
    }else{
    //Next player
    nextPlayer();
    }
    }
    
});

function nextPlayer(){
      //Next player
      gamePlaying=true;
      activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
      roundScore = 0;
      document.getElementById('current-0').textContent = 0;
      document.getElementById('current-1').textContent = 0;
  
      document.querySelector('.player-0-panel').classList.toggle('active');
      document.querySelector('.player-1-panel').classList.toggle('active');
  
  
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice-2').style.display = 'none';

      document.querySelector('.lost-msg').style.display = 'none';

}

document.querySelector('.btn-new').addEventListener('click',init);

function init (){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';

    document.querySelector('.lost-msg').style.display = 'none';


    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    

}
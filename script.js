let scores = {
    player: 0,
    computer: 0,
    ties: 0
};

function playGame(userChoice) {
    const choices = ['rock', 'paper', 'scissor'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    
    let result = '';
    let textColor = '#1f2937'; // Default text color

    // Evaluate outcomes and match premium text styling
    if (userChoice === computerChoice) {
        result = `It is a tie! Both chose ${userChoice}.`;
        textColor = '#4b5563';
        scores.ties++;
    } 
    else if (userChoice === 'rock') {
        if (computerChoice === 'scissor') {
            result = 'You win! Rock crushes scissors.';
            textColor = '#16a34a'; // Premium Corporate Green
            scores.player++;
        } else {
            result = 'You lose! Paper covers rock.';
            textColor = '#dc2626'; // Premium Corporate Red
            scores.computer++;
        }
    } 
    else if (userChoice === 'paper') {
        if (computerChoice === 'rock') {
            result = 'You win! Paper covers rock.';
            textColor = '#16a34a';
            scores.player++;
        } else {
            result = 'You lose! Scissor cuts paper.';
            textColor = '#dc2626';
            scores.computer++;
        }
    } 
    else if (userChoice === 'scissor') {
        if (computerChoice === 'paper') {
            result = 'You win! Scissor cuts paper.';
            textColor = '#16a34a';
            scores.player++;
        } else {
            result = 'You lose! Rock crushes scissors.';
            textColor = '#dc2626';
            scores.computer++;
        }
    }

    // Populate Dynamic DOM Text Nodes
    document.getElementById('computerChoice').textContent = computerChoice.toUpperCase();
    
    const txtElement = document.getElementById('resultText');
    txtElement.textContent = result;
    txtElement.style.color = textColor;
    
    // Inject Graphic Source File Links
    const compImg = document.getElementById('computerImage');
    compImg.src = (computerChoice === 'scissor') ? 'scissor.jpg' : computerChoice + '.png';

    // Reveal UI container box
    document.getElementById('result').style.display = 'block';
}

// ==========================================
// EVERYTHING BELOW EXTENDS YOUR GAME TO BEST OF 5
// ==========================================

let gameActive = true;

function updateScoreboard() {
    if (document.getElementById('playerScore')) {
        document.getElementById('playerScore').textContent = scores.player;
    }
    if (document.getElementById('computerScore')) {
        document.getElementById('computerScore').textContent = scores.computer;
    }
    if (document.getElementById('tieScore')) {
        document.getElementById('tieScore').textContent = scores.ties;
    }

    // Best of 5 logic: First to reach 3 wins wins the match
    if (scores.player === 3 || scores.computer === 3) {
        gameActive = false; 
        
        const finalResult = scores.player === 3 ? "🎉 Game Over! You won the match!" : "❌ Game Over! Computer won the match!";
        const finalColor = scores.player === 3 ? '#16a34a' : '#dc2626';

        const txtElement = document.getElementById('resultText');
        if (txtElement) {
            txtElement.textContent = finalResult;
            txtElement.style.color = finalColor;
        }
    }
}

// Intercept your original function exactly once
const originalPlayGame = playGame;
playGame = function(userChoice) {
    if (!gameActive) {
        alert("The match is over! Please click 'Play Again' to reset.");
        return;
    }

    // 1. Run your original function unchanged (displays the result div)
    originalPlayGame(userChoice); 
    
    // 2. Safely update scoreboard figures and track best of 5 limits
    updateScoreboard();          
};

// Reset system handler linked to your button
window.resetMatch = function() {
    scores.player = 0;
    scores.computer = 0;
    scores.ties = 0;
    gameActive = true;
    updateScoreboard();
    
    if (document.getElementById('result')) {
        document.getElementById('result').style.display = 'none';
    }
};

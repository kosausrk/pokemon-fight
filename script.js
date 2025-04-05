let player = {
    name: "Player",
    health: 100,
    strength: 20,
    cunning: 15,
    speed: 10
};

let computer = {
    name: "Computer",
    health: 100,
    strength: 18,
    cunning: 12,
    speed: 12
};

function updateHealthDisplay() {
    document.getElementById("player-health").innerText = `Health: ${player.health}`;
    document.getElementById("computer-health").innerText = `Health: ${computer.health}`;
}

function logBattle(message) {
    const log = document.getElementById("battle-log");
    log.innerHTML += `<br>${message}`;
    log.scrollTop = log.scrollHeight;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function computerMove() {
    const moves = ["attack", "block", "finisher"];
    const move = moves[getRandomInt(0, 2)];
    let damage = 0;

    switch (move) {
        case "attack":
            damage = Math.floor(computer.strength * 0.7 + getRandomInt(0, 5));
            player.health -= damage;
            logBattle(`Computer used Attack! Player loses ${damage} HP.`);
            break;
        case "block":
            logBattle("Computer used Block! No damage dealt.");
            break;
        case "finisher":
            if (computer.health < 40) {
                damage = Math.floor(computer.strength * 1.5 + getRandomInt(5, 10));
                player.health -= damage;
                logBattle(`Computer used Finisher! Player loses ${damage} HP.`);
            } else {
                logBattle("Computer attempted Finisher but failed.");
            }
            break;
    }

    player.health = Math.max(player.health, 0);
    updateHealthDisplay();
    checkGameOver();
}

function attack() {
    const damage = Math.floor(player.strength * 0.7 + getRandomInt(0, 5));
    computer.health -= damage;
    logBattle(`Player used Attack! Computer loses ${damage} HP.`);
    computer.health = Math.max(computer.health, 0);
    updateHealthDisplay();
    checkGameOver();
    if (computer.health > 0) setTimeout(computerMove, 800);
}

function block() {
    logBattle("Player used Block! Incoming damage will be reduced.");
    // Placeholder — modify as needed to interact with future damage.
    setTimeout(computerMove, 800);
}

function finisher() {
    if (player.health < 40) {
        const damage = Math.floor(player.strength * 1.5 + getRandomInt(5, 10));
        computer.health -= damage;
        logBattle(`Player used Finisher! Computer loses ${damage} HP.`);
    } else {
        logBattle("Player attempted Finisher but failed.");
    }
    computer.health = Math.max(computer.health, 0);
    updateHealthDisplay();
    checkGameOver();
    if (computer.health > 0) setTimeout(computerMove, 800);
}

function checkGameOver() {
    if (player.health <= 0) {
        logBattle("<strong>Game Over! Computer wins!</strong>");
        disableButtons();
    } else if (computer.health <= 0) {
        logBattle("<strong>Victory! Player wins!</strong>");
        disableButtons();
    }
}

function disableButtons() {
    document.querySelectorAll("button").forEach(btn => btn.disabled = true);
}

// Initialize
updateHealthDisplay();

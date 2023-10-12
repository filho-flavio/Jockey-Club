const HORSES = ["Marujo", "Tordilho", "Belga", "Twister", "Jade", "Lucky"];
let bets = [];

function addBet() {
  let inHorse = document.querySelector("#inHorse");
  let horse = Number(inHorse.value);
  let inBet = document.querySelector("#inBet");
  let bet = Number(inBet.value);

  if (isNaN(horse) || !validateBet(horse) || isNaN(bet) || bet == 0) {
    alert("Digite um cavalo válido");
    inHorse.focus();
    return;
  }

  bets.push({ horse: horse, bet: bet });

  let list = "";
  let currentList = "";

  for (let i = 0; i < bets.length; i++) {
    list += `N°: ${bets[i].horse} - Horse: ${getHorse(
      bets[i].horse
    )} - Bets: R$${bets[i].bet} \n`;
    currentList = `N°: ${bets[i].horse} - Horse: ${getHorse(
      bets[i].horse
    )} - Bets: R$${bets[i].bet} \n`;
  }

  showBets(list);

  document.querySelector("#outHorse").textContent = currentList;
  inHorse.value = "";
  inBet.value = "";
  inHorse.focus();
}

const btBet = document.querySelector("#btBet");
btBet.addEventListener("click", addBet);

const getHorse = (num) => {
  let pos = num - 1;
  return HORSES[pos];
};

function validateBet(tam) {
  let num = HORSES.length;

  return tam >= 1 && tam <= num;
}

function showBets(list) {
  document.querySelector("#outHorse").textContent = "";
  document.querySelector("#outBets").textContent = list;
}

const btWinner = document.querySelector("#btWinner");
btWinner.addEventListener("click", () => {
  if (bets.length < 2) {
    alert("Enter a minimum of 3 bets to play the Draw!");
    return;
  }
  let winningHorse = Number(prompt("Input the winning horse: "));

  calculateWinner(winningHorse);
});

function calculateWinner(winner) {
  let result = [];
  let totalBets = [];
  let sumWinner = 0;
  let numBets = 0;
  bets.forEach((bet) => {
    result.push(bet.horse);
    totalBets.push(bet.bet);
  });

  result.forEach((res) => {
    if (res === winner) {
      numBets++;
      sumWinner += res;
    }
  });

  const sum = totalBets.reduce(
    (acumulator, currentValue) => acumulator + currentValue,
    0
  );

  showResult(numBets, sum, winner, sumWinner);
}

function showResult(num, sum, winner, sumWinner) {
  let result = "Final results of the race\n";
  result += "-------------------------------------\n";
  result += "Total number of bets: " + bets.length + "\n";
  result += "Total amount bet R$: " + sum + "\n\n";
  result += "Winner Nº " + winner + " - " + getHorse(winner) + "\n";
  result += "-------------------------------------\n";
  result += "Number of bets on the winner: " + num + "\n";
  result += "Total amount bet on the winner R$: " + sumWinner;
  document.querySelector("#outBets").textContent = result;
}

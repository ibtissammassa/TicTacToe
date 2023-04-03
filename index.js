const cells = document.querySelectorAll(".Cell");
const reset = document.querySelector(".button");
const text = document.querySelector(".turn");
const win_combinations=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let options =["","","","","","","","",""];//where we store our current table
let running = false;
let player="X";

initGame();

function initGame(){
    cells.forEach(cell=>cell.addEventListener("click",cellClicked));
    reset.addEventListener("click",Restart);
    text.innerHTML=`Player <span>${player}</span>'s turn !`;
    running=true;
}

function cellClicked(){
    const index = this.getAttribute("index");//this refers the the cell clicked
    if(options[index]!="" || running==false){
        return;
    }
    updateCell(this,index);
    checkWinner();//we check winning everytime after a cell is updated
}

function updateCell(cell,index){
    cell.textContent=player;
    options[index]=player;
}

function changePlayer(){
    player = (player=="X")? "O": "X";
    text.innerHTML=`Player <span>${player}</span>'s turn !`;
}

function checkWinner(){
    let won = false;

    for(let i=0;i<win_combinations.length;i++){//we go trought every combination to check if it's there in our table
        const combin = win_combinations[i];
        const cell1 = options[combin[0]];
        const cell2 = options[combin[1]];
        const cell3 = options[combin[2]];

        if(cell1==""||cell2==""||cell2==""){
            continue;//if any of the cells in a combination is empty we continue to the other one because there is no winning in this comb
        }else if(cell1==cell2&&cell2==cell3){
            won = true;
            cells[combin[0]].style.color='#F1C40F';
            cells[combin[1]].style.color='#F1C40F';
            cells[combin[2]].style.color='#F1C40F';
            break;
        }
    }

    if(won){
        running=false;
        text.innerHTML=`Player <span>${player}</span> Wins !`;
    }else if(!options.includes("")){
        text.innerHTML=`Draw..try again!`;
        running=false;
    }else{
        changePlayer();
    } 
}

function Restart(){
    player="X";
    options = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell=>cell.textContent="");
    running=false;
    text.innerHTML=`Player <span>${player}</span>'s turn !`;
    initGame();
}
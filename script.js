let Path = [null,null,null];
let Difficulties = ['Easy', 'Medium', 'Hard'];
let Operations = ['Addition','Subtraction','Multiplication','Division','Mixed'];
let Sorting = ['Score','Percent','Difficulty'];
let Element = null;
let Initialize = 'program';
let Num1 = null;
let Num2 = null;
let Ans = null
let NumAsked = 0;
let NumCorrect = 0;
let AddBadges=[null,null,null];
let SubBadges=[null,null,null];
let MultBadges=[null,null,null];
let DivBadges=[null,null,null];
let MixBadges = [null,null,null];
let OtherBadges=[null,null,null];
let SubmitButtonStatus = 'Submit';
let QuestionAsked = null;
let DifficultySpike = 1;
let score = 0;
let DifficultyLevels = ['None Attempted','None Attempted','None Attempted','None Attempted','None Attempted'];
let HighScores = [0,0,0,0,0];
let HighPercentage = [0,0,0,0,0];
let TheUserName = null;
let UserNames = [null,null];
let PerfectionLevels = [false,false,false,false,false];
let ScoreMatrix = [HighScores,HighPercentage,DifficultyLevels];
let Ans2 = null;
let UserCorrect = [0,0];
let PlayerTurn = 0;

//Need to
//MAKE THINGS NEATER PLEASE
//Get Dennis Nedry cause why not
//Get Images for Mixed and Other

//Bug Fixes

function ButtonPressed(ButtonClicked){
document.getElementById('Notify').innerHTML=null;
if(ButtonClicked==='Start'){
    if(!(TheUserName===null)) {
        if (Initialize === 'program') {
            if (!((AddBadges[2] === 'BadgeGained') && (SubBadges[2] === 'BadgeGained') && (MultBadges[2] === 'BadgeGained') && (DivBadges[2] === 'BadgeGained') && !((OtherBadges[2] === 'BadgeGained') && (OtherBadges[1] === 'BadgeGained') && (OtherBadges[0] === 'BadgeGained')))) {
                Visible('OperationButton', 'visible');
                document.getElementById('StartButton').style.display = 'none';
                document.getElementById('Back').style.visibility = 'visible';
                document.getElementById('Start2Button').style.visibility = 'visible';
                document.getElementById('Start2Button').style.display = 'none';
                NumAsked = 0;
                NumCorrect = 0;
                Path.splice(0, 1, '1Player');
                DisableOperationButtons();
            } else {
                document.getElementById('Path').style.visibility = 'visible';
                document.getElementById('Path').innerHTML = 'Congrats '+TheUserName+'! You Completed The Entire Game! You Cannot Play Anymore.';
            }
        } else if (Initialize === 'game') {
            CreateQuestion(Operations.indexOf(Path[1]));
        }
    }else{
        document.getElementById('SubmissionPart').style.visibility = 'visible';
        document.getElementById('AskAndCheck').innerHTML = 'Whats Your Name?';
        document.getElementById('StartButton').style.display = 'none';
        document.getElementById('Start2Button').style.display = 'none';
        Path.splice(0, 1, '1Player');
    }
} else if(Difficulties.indexOf(ButtonClicked)>=0){
    let y = Difficulties.indexOf(ButtonClicked);
    Path.splice(2,1,Difficulties[y]);
    Visible('OperationButton','hidden');
    Visible('DifficultyButton','hidden');
    document.getElementById('SubmissionPart').style.visibility = 'visible';
    Initialize = 'game';
    CreateQuestion(Operations.indexOf(Path[1]));
    if(Path[0]==='2Player'){
        PlayerTurn = 0;
        document.getElementById('PlayerGo').innerHTML = UserNames[(PlayerTurn%2)] + ' Go.'
        document.getElementById('PlayerGo').style.visibility = 'visible';
        document.getElementById('BothUsersScores').style.visibility = 'visible';
        document.getElementById('Directions').style.visibility = 'visible';
        document.getElementById('User1').innerHTML = UserNames[0];
        document.getElementById('User2').innerHTML = UserNames[1];
    }
} else if(Operations.indexOf(ButtonClicked)>=0){
    let z = Operations.indexOf(ButtonClicked);
    Path.splice(1,1,Operations[z]);
    Visible('OperationButton','hidden');
    Visible('DifficultyButton','visible');
    document.getElementById('Path').style.visibility = 'hidden';
    document.getElementById('Back').style.visibility = 'visible';
} else if(ButtonClicked==="SubmitAndContinue"){
    if(!((Initialize==='Quit?')||((TheUserName===null)&&(Path[0]==='1Player'))||(Path[0]==='2Player'))) {
        SubmitAndContinueFunction();
    } else if(Initialize==='Quit?') {
        let textbox = document.getElementById('TextBox').value;
        document.getElementById('TextBox').value = 'Type Here';
        document.getElementById('Back').style.visibility = 'visible';
        if ((textbox.toLowerCase() === 'y') || (textbox.toLowerCase() === 'yes')) {
            NumAsked = 0;
            NumCorrect = 0;
            DifficultySpike = 1;
            score = 0;
            if(Path[0]==='1Player'){
                Path.splice(2,1,null);
                Visible('DifficultyButton','visible');
                document.getElementById('Back').style.visibility = 'visible';
            }else if(Path[0]==='2Player'){
                Path.splice(2,1,null);
                Path.splice(1,1,null);
                Path.splice(0,1,null);
                document.getElementById('StartButton').style.visibility = 'visible';
                document.getElementById('Start2Button').style.visibility = 'visible';
                document.getElementById('Back').style.visibility = 'hidden';
                document.getElementById('StartButton').style.display = 'inline';
                document.getElementById('Start2Button').style.display = 'inline';
            }
            document.getElementById('SubmissionPart').style.visibility = 'hidden';
            document.getElementById('QuestionsAnswered').innerHTML = null;
            Initialize = 'program';
            document.getElementById('SubmitAndContinue').innerHTML = 'Submit';
            document.getElementById('PlayerGo').style.visibility = 'hidden';
            document.getElementById('BothUsersScores').style.visibility = 'hidden';
            document.getElementById('Directions').style.visibility = 'hidden';
        } else {
            document.getElementById('AskAndCheck').innerHTML = QuestionAsked;
            Initialize ='game';
            if(SubmitButtonStatus==='Continue'){
                if(QuestionAsked==='Correct.'){
                    document.getElementById('AskAndCheck').style.color = 'green';
                }else{
                    document.getElementById('AskAndCheck').style.color = 'red';
                }
            } else if(SubmitButtonStatus==='Submit'){
                document.getElementById('AskAndCheck').style.color = 'Black';
            }
        }
    } else if((TheUserName===null)&&(Path[0]==='1Player')){
        TheUserName = document.getElementById('TextBox').value;
        document.getElementById('SubmissionPart').style.visibility = 'hidden';
        document.getElementById('Path').innerHTML = 'Welcome, ' + TheUserName;
        Visible('OperationButton','visible');
        document.getElementById('Back').style.visibility = 'visible';
    } else if(Path[0]==='2Player'){
        if(UserNames[0]===null){
            UserNames.splice(0,1,document.getElementById('TextBox').value);
            document.getElementById('AskAndCheck').innerHTML = 'Whats Is Player 2s Name?'
            document.getElementById('TextBox').value = 'Type Here';
        }else if(UserNames[1]===null){
            UserNames.splice(1,1,document.getElementById('TextBox').value);
            Visible('OperationButton','visible');
            document.getElementById('SubmissionPart').style.visibility = 'hidden';
            document.getElementById('TextBox').value = 'Type Here';
        }else if(!(CheckArray(UserNames,null))){
            document.getElementById('PlayerGo').innerHTML = UserNames[(PlayerTurn%2)] + ' Go.'
            document.getElementById('PlayerGo').style.visibility = 'visible';
            SubmitAndContinueFunction();
        }
    }
} else if(ButtonClicked==='Back'){
    if(Path.indexOf(null)===2){
        Visible('DifficultyButton','hidden');
        Visible('OperationButton','visible');
        Path.splice(1,1,null);
    } else if(Path.indexOf(null)===1){
        Visible('OperationButton','hidden');
        document.getElementById('StartButton').style.visibility = 'visible';
        document.getElementById('StartButton').style.display = 'inline';
        document.getElementById('Start2Button').style.visibility = 'visible';
        document.getElementById('Start2Button').style.display = 'inline';
        document.getElementById('SubmissionPart').style.visibility = 'hidden';
        document.getElementById('Back').style.visibility = 'hidden';
        UserNames.splice(0,1,null);
        UserNames.splice(1,1,null);
        Path.splice(0,1,null);
    } else if(Path.indexOf(null)===-1){
        document.getElementById('AskAndCheck').innerHTML = 'Are You Sure You Want To Quit? (Y/N)';
        Initialize = 'Quit?';
        document.getElementById('Back').style.visibility ='hidden';
        document.getElementById('AskAndCheck').style.color = 'Black';
    }
} else if(ButtonClicked==='Start2'){
    document.getElementById('SubmissionPart').style.visibility = 'visible';
    document.getElementById('AskAndCheck').innerHTML = 'What Is Player 1s Name?';
    Path.splice(0,1,'2Player');
    document.getElementById('Back').style.visibility = 'visible';
    document.getElementById('Path').style.visibility = 'hidden';
    document.getElementById('StartButton').style.display = 'none';
    document.getElementById('Start2Button').style.display = 'none';
    PlayerTurn = 0;
    DifficultySpike = 1;
    NumAsked = 0;
    UserCorrect.splice(0,1,0);
    UserCorrect.splice(1,1,0);
    DisableOperationButtons();
}
}

function NavButton(NavClicked) {
    if((Initialize==='game')||(TheUserName===null)){
        if(Initialize==='game') {
            document.getElementById('Notify').innerHTML = 'Please Close Out of the Game Before Navigating';
        } else if(TheUserName===null){
            document.getElementById('Notify').innerHTML = 'Please Enter Your Name and Click Start';
        }
    }else if(NavClicked==='Games'){
        document.getElementById('EveryGameComponent').style.display = 'inline';
        document.getElementById('AllBadges').style.display = 'none';
        document.getElementById('HighScores').style.display = 'none';
    }else if(NavClicked==='Badges'){
        document.getElementById('EveryGameComponent').style.display = 'none';
        document.getElementById('AllBadges').style.display = 'inline';
        document.getElementById('HighScores').style.display = 'none';
        document.getElementById('BadgesHeader').innerHTML = TheUserName + 's Badges'
        let GetClass = null;
        if((AddBadges[0]===null)&&(AddBadges[1]===null)&&(AddBadges[2]===null)){
            document.getElementById('AdditionBadgeHeader').style.visibility = 'visible';
        } else {
            document.getElementById('AdditionBadgeHeader').style.visibility = 'hidden';
        }
        if((SubBadges[0]===null)&&(SubBadges[1]===null)&&(SubBadges[2]===null)){
            document.getElementById('SubtractionBadgeHeader').style.visibility = 'visible';
        } else {
            document.getElementById('SubtractionBadgeHeader').style.visibility = 'hidden';
        }
        if((MultBadges[0]===null)&&(MultBadges[1]===null)&&(MultBadges[2]===null)){
            document.getElementById('MultiplicationBadgeHeader').style.visibility = 'visible';
        } else {
            document.getElementById('MultiplicationBadgeHeader').style.visibility = 'hidden';
        }
        if((DivBadges[0]===null)&&(DivBadges[1]===null)&&(DivBadges[2]===null)){
            document.getElementById('DivisionBadgeHeader').style.visibility = 'visible';
        } else {
            document.getElementById('DivisionBadgeHeader').style.visibility = 'hidden';
        }
        if((OtherBadges[0]===null)&&(OtherBadges[1]===null)&&(OtherBadges[2]===null)){
            document.getElementById('OtherBadgeHeader').style.visibility = 'visible';
        } else {
            document.getElementById('OtherBadgeHeader').style.visibility = 'hidden';
        }
        if((MixBadges[0]===null)&&(MixBadges[1]===null)&&(MixBadges[2]===null)){
            document.getElementById('MixedBadgeHeader').style.visibility = 'visible';
        } else {
            document.getElementById('MixedBadgeHeader').style.visibility = 'hidden';
        }
        for(let a = 0; a<3; a++) {
            if (AddBadges[a]==='BadgeGained') {
                GetClass = String('Plus' + String(Number(a+1)));
                Visible(GetClass,'visible');
            }
            if (SubBadges[a]==='BadgeGained') {
                GetClass = String('Minus' + String(Number(a+1)));
                Visible(GetClass,'visible');
            }
            if (MultBadges[a]==='BadgeGained') {
                GetClass = String('Times' + String(Number(a+1)));
                Visible(GetClass,'visible');
            }
            if (DivBadges[a]==='BadgeGained') {
                GetClass = String('Divided' + String(Number(a+1)));
                Visible(GetClass,'visible');
            }
            if (OtherBadges[a]==='BadgeGained') {
                GetClass = String('o' + String(Number(a+1)));
                Visible(GetClass,'visible');
            }
            if (MixBadges[a]==='BadgeGained') {
                GetClass = String('Mixed' + String(Number(a+1)));
                Visible(GetClass,'visible');
            }
        }
    } else if(NavClicked === 'HighScore'){
        document.getElementById('HighScores').style.display = 'inline';
        document.getElementById('AllBadges').style.display = 'none';
        document.getElementById('ScoreHeader').innerHTML = TheUserName + 's Highscores'
        document.getElementById('EveryGameComponent').style.display = 'none';
        let id = null;
        let value = null;
        for(let rr =0; rr<3; rr++){
            for(let tt = 0; tt<5; tt++){
                id = String(Operations[tt])+String(Sorting[rr]);
                value = (ScoreMatrix[rr])[tt];
                document.getElementById(id).innerHTML = value;
            }
        }
    }
}

function Visible(element, visibility){
    Element = document.getElementsByClassName(element);
    for(var j = 0; j<Element.length; j++){
        Element[j].style.visibility = visibility;
    }
}

function CreateQuestion(Operation) {
    if(Operation===0){
        Num1 = Math.floor(1+ Math.random()*10*DifficultySpike*(4**(Difficulties.indexOf(Path[2]))));
        Num2 = Math.floor(1+ Math.random()*10*DifficultySpike*(4**(Difficulties.indexOf(Path[2]))));
        document.getElementById('AskAndCheck').innerHTML = 'What Is ' + Num1 + '+' + Num2 + '?';
        QuestionAsked = 'What Is ' + Num1 + '+' + Num2 + '?';
        Ans = Num1+Num2;
        Ans2 = Num1 + '+' + Num2;
    }else if(Operation===1){
        Num1 = Math.floor(1+ Math.random()*10*DifficultySpike*(4**(Difficulties.indexOf(Path[2]))));
        Num2 = Math.floor(1+ Math.random()*10*DifficultySpike*(4**(Difficulties.indexOf(Path[2]))));
        document.getElementById('AskAndCheck').innerHTML = 'What Is ' + Num1 + '-' + Num2 + '?';
        QuestionAsked = 'What Is ' + Num1 + '-' + Num2 + '?';
        Ans = Num1-Num2;
        Ans2 = Num1 + '-' + Num2;
    }else if(Operation===2){
        Num1 = Math.floor(1+ Math.random()*10*DifficultySpike*(4**(Difficulties.indexOf(Path[2]))));
        Num2 = Math.floor(1+ Math.random()*10*DifficultySpike*(4**(Difficulties.indexOf(Path[2]))));
        document.getElementById('AskAndCheck').innerHTML = 'What Is ' + Num1 + '*' + Num2 + '?';
        QuestionAsked = 'What Is ' + Num1 + '*' + Num2 + '?';
        Ans = Num1*Num2;
        Ans2 = Num1 + '*' + Num2;
    }else if(Operation===3){
        Num1 = Math.floor(1+ Math.random()*50*DifficultySpike*(4**(Difficulties.indexOf(Path[2]))));
        let factors = [];
        let count = 0;
        while(count<=Num1){
            count = count+1;
            if((Num1 % count) === 0){
                factors.push(count);
            }
        }
        let select = Math.floor(Math.random()*factors.length);
        Num2 = factors[select];
        document.getElementById('AskAndCheck').innerHTML = 'What Is ' + Num1 + '/' + Num2 + '?';
        QuestionAsked = 'What Is ' + Num1 + '/' + Num2 + '?';
        Ans = Num1/Num2;
        Ans2 = Num1 + '/' + Num2;
    } else if(Operation===4){
        let MixedLevel = Math.floor(Math.random()*4)
        CreateQuestion(MixedLevel);
        NumAsked = NumAsked - 1;
    }
    if(Path[0]==='1Player'){
        NumAsked = NumAsked + 1;
    } else if(Path[0]==='2Player'){
        if(PlayerTurn%2===0){
            NumAsked = NumAsked + 1;
        }
    }
    document.getElementById('AskAndCheck').style.color ='Black';
    document.getElementById('TextBox').value = 'Type Here';
}

function CheckArray(array,identifier){
    let pass = true
    for (let o = 0; o<array.length; o++){
        if(!(array[o]===identifier)){
            pass = false;
        }
    }
    return(pass);
}

function SubmitAndContinueFunction(){
    if (SubmitButtonStatus === 'Submit') {
        if (!(String(Ans) === String(document.getElementById('TextBox').value))) {
            document.getElementById('AskAndCheck').style.color = 'Red';
            document.getElementById('AskAndCheck').innerHTML = 'Incorrect. The answer to ' + Ans2 + ' is: ' + String(Number(Ans));
            QuestionAsked = 'Incorrect. The answer to ' + Ans2 + ' is: ' + String(Number(Ans));
            if(Path[0]==='1Player') {
                score = score - (Difficulties.indexOf(Path[2]) + 1) * 3;
            } else if(Path[0]==='2Player'){
                let NewScore = UserCorrect[PlayerTurn%2];
                UserCorrect.splice(PlayerTurn%2,1,NewScore);
                let UserId = 'User'+ String(Number((PlayerTurn%2)+1))+'Correct';
                document.getElementById(UserId).innerHTML = NewScore;
                UserId = 'User'+ String(Number((PlayerTurn%2)+1))+'%';
                document.getElementById(UserId).innerHTML = Math.round((NewScore/NumAsked)*100);
            }
        } else if (Ans === Number(document.getElementById('TextBox').value)) {
            document.getElementById('AskAndCheck').style.color = 'Green';
            document.getElementById('AskAndCheck').innerHTML = 'Correct.';
            QuestionAsked = 'Correct.';
            if(Path[0]==='1Player') {
                NumCorrect = NumCorrect + 1;
                score = score + (Difficulties.indexOf(Path[2]) + 1) * 5;
            } else if(Path[0]==='2Player'){
                let NewScore = UserCorrect[PlayerTurn%2] +1;
                UserCorrect.splice(PlayerTurn%2,1,NewScore);
                let UserId = 'User'+ String(Number((PlayerTurn%2)+1))+'Correct';
                document.getElementById(UserId).innerHTML = NewScore;
                UserId = 'User'+ String(Number((PlayerTurn%2)+1))+'%';
                document.getElementById(UserId).innerHTML = Math.round((NewScore/NumAsked)*100);
            }
            if ((NumCorrect % 5 === 0) && (NumCorrect > 0)&&(Path[0]==='1Player')) {
                if ((AddBadges[(NumCorrect / 5) - 1] === null && Path[1] === 'Addition')||(SubBadges[(NumCorrect / 5) - 1] === null && Path[1] === 'Subtraction')||(MultBadges[(NumCorrect / 5) - 1] === null && Path[1] === 'Multiplication')||(DivBadges[(NumCorrect / 5) - 1] === null && Path[1] === 'Division')||(MixBadges[(NumCorrect / 5) - 1] === null && Path[1] === 'Mixed')) {
                    document.getElementById('GameNotify').style.visibility = 'visible';
                    document.getElementById('GameNotify').innerHTML = 'Congrats '+TheUserName+'! You Earned A new Badge!';
                }
                if (Path[1] === 'Addition') {
                    AddBadges.splice((NumCorrect / 5) - 1, 1, 'BadgeGained');
                } else if (Path[1] === 'Subtraction') {
                    SubBadges.splice((NumCorrect / 5) - 1, 1, 'BadgeGained');
                } else if (Path[1] === 'Multiplication') {
                    MultBadges.splice((NumCorrect / 5) - 1, 1, 'BadgeGained');
                } else if (Path[1] === 'Division') {
                    DivBadges.splice((NumCorrect / 5) - 1, 1, 'BadgeGained');
                } else if(Path[1] === 'Mixed'){
                    MixBadges.splice((NumCorrect / 5) - 1, 1, 'BadgeGained');
                }
                DifficultySpike = DifficultySpike + 1;
            }
            CreateBadges();
        }
        if((Path[0]==='2Player')&&((PlayerTurn%2)===0)){
            DifficultySpike = DifficultySpike + 1;
        }
        document.getElementById('SubmitAndContinue').innerHTML = 'Continue';
        SubmitButtonStatus = 'Continue';
        if(Path[0]==='1Player') {
            document.getElementById('QuestionsAnswered').innerHTML = NumCorrect + '/' + NumAsked + '   ' + String(Math.round(100 * (NumCorrect / NumAsked))) + '%';
        } else if(Path[0]==='2Player'){
            PlayerTurn = PlayerTurn + 1;
        }
        if((PlayerTurn%2===0)&&(!(UserCorrect[0]===UserCorrect[1]))){
            if(UserCorrect[0]>UserCorrect[1]){
                document.getElementById('PlayerGo').innerHTML = UserNames[0]+ ' Wins!';
            }else if(UserCorrect[0]<UserCorrect[1]){
                document.getElementById('PlayerGo').innerHTML = UserNames[1]+ ' Wins!';
            }
            document.getElementById('Back').style.visibility='hidden';
        }
    } else if (SubmitButtonStatus === 'Continue') {
        document.getElementById('SubmitAndContinue').innerHTML = 'Submit';
        CreateQuestion(Operations.indexOf(Path[1]));
        document.getElementById('GameNotify').style.visibility = 'hidden';
        document.getElementById('Notify').style.visibility = 'hidden';
        SubmitButtonStatus = 'Submit';
        document.getElementById('Back').style.visibility = 'visible';
        if ((NumCorrect===15)&&(Path[0]==='1Player')) {
            Initialize = 'program';
            let buttonId = String(String(Path[1])+'Button');
            Path.splice(1, 1, null);
            Path.splice(2, 1, null);
            DifficultySpike = 1;
            NumCorrect =0;
            NumAsked =0;
            score = 0;
            let something = false;
            for (let y =0; y<5; y++){
                if(DifficultyLevels[y]==='None Attempted'){
                    something = true
                }
            }
            if(!something){
                Visible('OperationButton','hidden');
                document.getElementById('StartButton').style.visibility = 'visible';
                document.getElementById('Start2Button').style.visibility = 'visible';
                document.getElementById('StartButton').style.display = 'inline';
                document.getElementById('Start2Button').style.display = 'inline';
                document.getElementById('Back').style.visibility = 'hidden';
            }else{
                Visible('OperationButton', 'visible');
                document.getElementById('Back').style.visibility = 'visible';
            }
            Visible('DifficultyButton', 'hidden');
            document.getElementById('SubmissionPart').style.visibility = 'hidden';
            document.getElementById('SubmitAndContinue').innerHTML = 'Submit';
            document.getElementById('Notify1').style.visibility = 'hidden';

            document.getElementById(buttonId).disabled = 'true';
            document.getElementById('QuestionsAnswered').innerHTML = null;
        } else if((PlayerTurn%2===0)&&(!(UserCorrect[0]===UserCorrect[1]))){
            Initialize = 'program';
            Path.splice(1, 1, null);
            Path.splice(2, 1, null);
            Path.splice(0, 1, null);
            UserNames.splice(0,1,null);
            UserNames.splice(1,1,null);
            DifficultySpike = 1;
            NumCorrect =0;
            NumAsked =0;
            score = 0;
            document.getElementById('SubmissionPart').style.visibility = 'hidden';
            document.getElementById('SubmitAndContinue').innerHTML = 'Submit';
            document.getElementById('Notify1').style.visibility = 'hidden';
            document.getElementById('PlayerGo').style.visibility = 'hidden';
            document.getElementById('StartButton').style.display = 'inline';
            document.getElementById('Start2Button').style.display = 'inline';
            document.getElementById('QuestionsAnswered').innerHTML = null;
            document.getElementById('Back').style.visibility = 'hidden';
            document.getElementById('BothUsersScores').style.visibility = 'hidden';
            document.getElementById('Directions').style.visibility = 'hidden';
        }
    }
}

function CreateBadges(){
    if((NumCorrect===15)&&(Path[0]==='1Player')){
        document.getElementById('Back').style.visibility = 'hidden';
        if (Path[1] === 'Addition') {
            AddBadges.splice((NumCorrect / 5) - 1, 1, 'BadgeGained');
        } else if (Path[1] === 'Subtraction') {
            SubBadges.splice((NumCorrect / 5) - 1, 1, 'BadgeGained');
        } else if (Path[1] === 'Multiplication') {
            MultBadges.splice((NumCorrect / 5) - 1, 1, 'BadgeGained');
        } else if (Path[1] === 'Division') {
            DivBadges.splice((NumCorrect / 5) - 1, 1, 'BadgeGained');
        } else if(Path[1] === 'Mixed'){
            MixBadges.splice((NumCorrect / 5) - 1, 1, 'BadgeGained');
        }
        if((Difficulties.indexOf(Path[2]))>(Difficulties.indexOf(DifficultyLevels[Operations.indexOf(Path[1])]))){
            DifficultyLevels.splice(Operations.indexOf(Path[1]),1,Path[2]);
        }
        if(CheckArray(DifficultyLevels,'Hard')){
            OtherBadges.splice(0, 1, 'BadgeGained');
            document.getElementById('GameNotify').style.visibility = 'visible';
        }
        if(score>HighScores[Operations.indexOf(Path[1])]){
            HighScores.splice(Operations.indexOf(Path[1]), 1, score);
        }
        let checkscore = true
        for(let s = 0; s<HighScores.length; s++){
            if(HighScores[s]<100){
                checkscore = false;
            }
        }
        if(checkscore===true){
            OtherBadges.splice(1, 1, 'BadgeGained');
            document.getElementById('GameNotify').style.visibility = 'visible';
        }
        if(Math.round((NumCorrect/NumAsked)*100)>HighPercentage[Operations.indexOf(Path[1])]){
            HighPercentage.splice(Operations.indexOf(Path[1]), 1, Math.round((NumCorrect/NumAsked)*100));
            document.getElementById('Notify1').style.visibility = 'visible';
            document.getElementById('Notify1').innerHTML = 'Congrats '+TheUserName+'! You Got A new Highscore!'
        }
        if(NumAsked===NumCorrect){
            PerfectionLevels.splice(Operations.indexOf(Path[1]),1,true);
        }
        if(CheckArray(PerfectionLevels,true)){
            OtherBadges.splice(2, 1, 'BadgeGained');
            document.getElementById('GameNotify').style.visibility = 'visible';
        }
    }
}

function DisableOperationButtons(){
    if(Path[0]==='1Player'){
        let strings = null;
        for(let bb = 0; bb<5; bb++){
            strings = Operations[bb]+'Button';
            if(DifficultyLevels[bb]==='None Attempted'){
                document.getElementById(strings).disabled = false;
            }else{
                document.getElementById(strings).disabled = true;
            }
        }
    }else if(Path[0]==='2Player'){
        let string = null;
        for(let p = 0; p<5; p++){
            string = Operations[p] + 'Button';
            document.getElementById(string).disabled = false;
        }
    }
}
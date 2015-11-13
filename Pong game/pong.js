
var x;
var my_time;
var y;
var z;
var disp;
var counter = 0;
var paddleImage;
var direction = "downwards"
var ballImage;
var courtImage;
var paddlePos;
var ballInitialPositionX;
var ballInitialPositionY;
var initialStrikes;
var strikes = 0;
var courtWidth;
var courtLeftTarget;
var courtTopTarget;
var labelStrikes = 0;
var labelMaxScore;

var labelSpeedSlow;
var paddleX;
var maxScore;
var paddleY;
var tempMaxScore;
var labelSpeedMedium;
var labelSpeedFast;
dir_h = '';
dir_v = '';
var outCourt=0;

 //Ending Location - left
 //Ending Location - left
var intervalX = 3;
var intervalY = 2;



function movePaddle(e){
    
    
	//Get the top and bottom coodinates of the court
	/*var maxTop = document.getElementById('court');
	maxTop = maxTop.getBoundingClientRect().top;
	var maxBottom = document.getElementById('court');
	maxBottom = maxBottom.getBoundingClientRect().bottom;

	var styleBottom;
	var styleTop;
	var padMovement;
	var padY;
	var maxBottomDispace;
	var maxBottomDispace;
	var pB;
	var pT;
	*/

	paddleY = e.pageY-200;
    paddleX = (paddleImage.getBoundingClientRect().left) - 35;

     if(paddleY>0&& paddleY <400){
     	document.getElementById('paddle').style.top = paddleY + 'px';
     }
    
   
	
}




function initialize(){
    var courtTop1;
    var courtBottom1;
    var courtRight1;
    var courtLeft1;
    var courtWidth1;
    var courtHeigh1t;
    
    var padTop;
    var padBot;
    
    paddleImage = document.getElementById("paddle");
    ballImage = document.getElementById("ball");
    courtImage = document.getElementById("court");
    labelStrikes = document.getElementById("strikes");
    labelMaxScore = document.getElementById("score");
    
    
    
    
    
    courtTop1 = courtImage.getBoundingClientRect().top;
	courtBottom1 = courtImage.getBoundingClientRect().bottom;
    courtRight1 = courtImage.getBoundingClientRect().right;
    courtLeft1 = courtImage.getBoundingClientRect().left;
    courtWidth = courtImage.getBoundingClientRect().width;
    courtHeight1 = courtImage.getBoundingClientRect().height;
    
    strikes = 0;
    maxScore = 0;
    x = 0;
    y = 0;
    ballInitialPositionX = 0;
    ballInitialPositionY =100;
    initialStrikes = 0;
    
    var cd = "Court top coords: " + courtTop1 + ", Court  bottom coords: " + courtBottom1+ ", Court  right coords: " + courtRight1+
        ", Court  left coords: " + courtLeft1+", Court  width coords: " + courtWidth1+ ", Court height coords: " + courtHeight1;
    
	document.getElementById("start").innerHTML = cd;
    //x = ballImage.style.left;
    //y = ballImage.style.top;
	
}



function startGame(){

	var ballTop;
    var ballBottom
    var ballLeft;
    var ballRight;
   // courtLeftTarget = courtImage.getBoundingClientRect().right;
   // courtTopTarget = courtImage.getBoundingClientRect().bottom;
   // labelMaxScore.innerHTML = maxScore;
    var bing = new Audio("http://lambda.uta.edu/cse4392/reflect.wav");
bing.play();
	my_time = setInterval('disp()',10);
}


function disp(){
         
        
     
        if(ballImage.getBoundingClientRect().left <= (courtImage.getBoundingClientRect().width -800)){
            //courtLeftTarget = courtImage.getBoundingClientRect().right;
            //dir_h = 'right';
            //resetGame();
            intervalX = -intervalX
            count = 0;
        }
    
     if(y >= -85 ){
            intervalY = -intervalY
          //  courtTopTarget = courtImage.getBoundingClientRect().bottom;
            dir_v = 'down';
        }
    
        if(y <= 400 ){
            dir_v = 'up';
            intervalY = -intervalY;
        }
    
    
        if(x  >= paddleX )
        {
           // alert('comres');
            if((y >= paddleY-100) && (y <=paddleY+20 )){
               //// dir_h = 'left';
               // alert('hvhgvg');
                strikes++;
                maxScore++;
                //tempMaxScore++;
                labelStrikes.innerHTML = strikes;
                //document.getElementById.('strikes').innerHTML = labelStrikes;
                intervalX = -intervalX
                //courtLeftTarget = courtImage.getBoundingClientRect().left;
            } 
        }
    

        if((ballImage.getBoundingClientRect().left >= courtImage.getBoundingClientRect().width)){
          //  labelMaxScore.innerHTML = strikes;
            //outCourt++;
            if(outCourt==0){
                
                tempMaxScore = strikes;
            }
            
            
            if(outCourt >0){
               if(tempMaxScore > strikes){
                    tempMaxScore = strikes+(tempMaxScore-maxScore);
               
               } 
                
            }
            outCourt++;
            
           // labelStrikes.innerHTML = 0;
            resetGame('calledBYFunction');


        }
        
               
        
       

        y = y + intervalY;
        x = x + intervalX;
 
      
        ballImage.style.left= x + "px"; // horizontal  movment
        ballImage.style.top= y + "px";//vertical
    

}

/*
function timer(){
        disp();
       
        //x=ballImage.getBoundingClientRect().left;
        my_time=setTimeout('timer()',10);
}*/

function resetGame(v){
    
    //document.getElementById.("strikes").value = 0;
   // alert("dkjsjfhb");
    //labelStrikes = 0;
    if(v=="calledBYFunction"){
        if(maxScore <= tempMaxScore){
            maxScore = tempMaxScore;
        
        } else{
            tempMaxScore = maxScore;
        }
        labelMaxScore.innerHTML = maxScore;
        maxScore= 0;
        strikes = 0;
    } else {//""
        maxScore = 0;
        strikes = 0;
        labelMaxScore.innerHTML = maxScore;
        labelStrikes.innerHTML = strikes;
        outCourt=0;
    
    }
    
   // alert(v);
    x = 0;
    y = 0;
    
    ballImage.style.left= 0+"px";
    ballImage.style.top= 0+"px";
    
    
    labelStrikes.innerHTML = strikes;
    clearInterval(my_time);
    

}



function setSpeed(speed){
    if(speed == 0){
        intervalX = 3;
        intervalY =2;
    } else if(speed == 1){
        intervalX = 3+1;
        intervalY = 2+1;
    
    } else{
        intervalX = 4+1;
        intervalY =3+1;
    }


}

/*

function resetGame1(){
	clearTimeout(my_time);
	counter = counter+1;
    var resetTop = Math.floor(Math.random() * (600 - 200 + 1));
    var x = 0;
	document.getElementById('ball').style.left= resetTop+"px";
	labelStrikes = 0;
	ballImage.style.left = this.x + 'px';
    
    

}*/




       /*if(dir_v == 'down'){
            y = y+interval;
        }
    
        else{
            y = y-interval;
        }


    

        if(dir_h == 'right'){
            x = x + interval;
        } else {
            x = x - interval;
        }
    
    */
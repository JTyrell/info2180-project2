"use strict";

var gamePiece;
var notify;
var timer;
var spaceY;
var spaceX;


 window.onload = function ()

{

    var puzzleArea = document.getElementById('puzzlearea');
    gamePiece = puzzleArea.getElementsByTagName('div'); //retrieve element within puzzlearea

        for (var i=0; i<gamePiece.length; i++) //applies features to each puzzle piece

        {

           	gamePiece[i].className = 'puzzlepiece'; //setting up the puzzle piece code
			gamePiece[i].style.left = (i%4*100)+'px'; //calculates the position for puzzle pieces from the left of the screen
        	gamePiece[i].style.top = (parseInt(i/4)*100) + 'px'; //calculatesthe position for puzzle pieces from the top of the screen
        	gamePiece[i].style.backgroundPosition= '-' + gamePiece[i].style.left + ' ' + '-' + gamePiece[i].style.top;



    		gamePiece[i].onmouseover = function()
        	{
           		if (checkMove(parseInt(this.innerHTML))) //a move checker
        		{

            		this.style.border = "3px solid green"; //changes to red when a puzzle piece is near an empty space
            		this.style.color = "#006600"; //text color changes to green when apuzzle piece is near an empty space

            		this.style.textDecoration = "underline"; //underlines the number of the puzzle piece piece

               //
					//this.style.backgroundImage="url('https://www.wonderparkcentre.co.za/images/stores/chicken-licken-(400px-x-400px).png')";



					this.style.backgroundImage="url('https://cdn-images-1.medium.com/max/1200/1*4Wy2W2ID1u2Vh-sX7qh0BA.jpeg')";
               		//sets the image for the puzzle's background

                    //this.style.height = '400px';
                    //this.style.width = '400px';
            		var how_wide = document.getElementById("puzzlepiece").width = "400";
            		var how_high = document.getElementById("puzzlepiece").height = "400";


					var yourImg = document.getElementById('yourImgId'); //to resize any image used  but not working
						if(yourImg && yourImg.style) 
						{
    						yourImg.style.height = '100px';
    						yourImg.style.width = '200px';
						}

                };

        };


    		gamePiece[i].onmouseout = function() //activates whenever mouse moves out of puzzle piece

    		{
        		this.style.border = "2px solid black"; //reverts to its original size border
        		this.style.color = "#000000"; //reverts to original text color
       		 	this.style.textDecoration = "none"; //reverts to original text state
    		};

    		gamePiece[i].onclick = function() //Makes the pieces move, when they can
    		{
        		if (checkMove(parseInt(this.innerHTML)))
        		{
            		spaces(this.innerHTML-1);
            		if (finish())
            		{
                		win();
            		}

            		return;
        		}

                		};

		};

    var shuffle = document.getElementById('shufflebutton');
    	  spaceX = '300px';
          spaceY = '300px';

    
    shuffle.onclick = function()
    {
        for (var i=0; i<300; i++)
       {
            var rand = parseInt(Math.random()* 100) %4; //should make and assign random number to spaces for the shuffle
            if (rand == 0)
           {
                var temp = move_Up(spaceX, spaceY);
                    if ( temp != -1)
                   {
                        spaces(temp);
                   }
            }
       
            if (rand == 1)
           {
                var temp = move_Down(spaceX, spaceY);
               if ( temp != -1)
           		{
                    spaces(temp);
                }
            }
            
            if (rand == 2)
            {
                var temp = move_Left(spaceX, spaceY);
                  	if ( temp != -1)
                   	{
                       	spaces(temp);
                   	}
                      
            }

            if (rand == 3)
            {
                var temp = move_Right(spaceX, spaceY);
                    if (temp != -1)
                    {
                        spaces(temp);
                    }
            }
        }
        
    };

};


function spaces (position) //moves the puzzle piece by switching position with an empty space
{

        var temp = gamePiece[position].style.top;

        gamePiece[position].style.top = spaceY;

        spaceY = temp;

        temp = gamePiece[position].style.left;

        gamePiece[position].style.left = spaceX;

        spaceX = temp;

}       

function checkMove(position) // returns true whenever a piece can be moved into an empty space
{

        if (move_Left(spaceX, spaceY) == (position-1))
        {
            return true;
        }

        if (move_Down(spaceX, spaceY) == (position-1))
        {
            return true;
        }

        if (move_Up(spaceX, spaceY) == (position-1))
        {
            return true;
        }

        if (move_Right(spaceX, spaceY) == (position-1))
        {
            return true;
        }
}

function Notify() //notifies the user

{

    notify --; //decrements the value of

    if (notify == 0) //if the value reaches the end then

    {
        var body = document.getElementsByTagName('body'); //retrieves body element in html
        body[0].style.backgroundImage= "none"; //reverts to original page background

        alert('You Win! ... Shuffle and Play Again'); //tells the user that they have won the game
        var para=document.getElementsByClassName('explanation');
        para[0].style.visibility="visible"; //reverts visiblity to its original state

        return;
    }
  
   else  (notify % 2)
   {
        var body = document.getElementsByTagName('body');
        body[0].style.backgroundImage= "url('https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX28872617.jpg')";
   }

    timer= setTimeout(Notify, 500); //notif for 5 secs
}


function winningz() //notifies user of a win

{
        var body = document.getElementsByTagName('body');

        body[0].style.backgroundImage= "url('https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX28872617.jpg')";

        notify = 10; //initializes notify variable

        timer= setTimeout(Notify, 500);

        var para=document.getElementsByClassName('explanation');
        para[0].style.visibility="hidden";

}


function finish() //checks when the game reaches its end

{
        var flag = true;
        for (var i = 0; i < gamePiece.length; i++) //for each puzzle piece
        {
                var top = parseInt(gamePiece[i].style.top);
                var left = parseInt(gamePiece[i].style.left);

                if (left != (i%4*100) || top != parseInt(i/4)*100) //checks if eachpiece matches its left and top position

                {
                    flag = false;
                    break;
                }
        }
        return flag;
}



function move_Left(x, y) //calculates how far to the left a puzzlepiece should position
{
        var cordX = parseInt(x);
        var cordY = parseInt(y);

        if (cordX > 0)

        {
            for (var i = 0; i < gamePiece.length; i++)
            {

                if (parseInt(gamePiece[i].style.left) + 100 == cordX && parseInt(gamePiece[i].style.top) == cordY)

                {
                    return i;
                }

            }
        }

        else
        {
            return -1;
        }

}



function move_Right (x, y) //calculates how far to the right a puzzlepiece should position
{

        var cordX = parseInt(x);

        var cordY = parseInt(y);

        if (cordX < 300)
        {
            for (var i =0; i<gamePiece.length; i++){
                if (parseInt(gamePiece[i].style.left) - 100 == cordX && parseInt(gamePiece[i].style.top) == cordY)
                    {
                        return i;
                    }
                }

        }

        else
        {
            return -1;
        }
}


function move_Up(x, y) //calculates how far up a puzzlepiece should
{

        var cordX = parseInt(x);
        var cordY = parseInt(y);
        if (cordY > 0)
        {
            for (var i=0; i<gamePiece.length; i++)
            {
                if (parseInt(gamePiece[i].style.top) + 100 == cordY && parseInt(gamePiece[i].style.left) == cordX)
                    {
                        return i;
                    } // end move up if
            }

        }

        else
        {
           return -1;
        }
}



function move_Down (x, y) //calculates how far down a puzzlepiece should position
{

        var cordX = parseInt(x);
        var cordY = parseInt(y);

        if (cordY < 300)
        {
            for (var i=0; i<gamePiece.length; i++)
            {
                if (parseInt(gamePiece[i].style.top) - 100 == cordY && parseInt(gamePiece[i].style.left) == cordX)
                {
                    return i;
                }
            }
        }

        else
        {
           return -1;
        }
}
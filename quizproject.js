let currentQuestion = 0;
let score = 0;
let hints = 0;
let maxHints = 3;
let hintused = false;
let Maxscore = 1000;
let timeleft = 20; // 10 second timer
let downloadTimer;
let questions = [
   {
	"question": "What's this aircraft?",
	"a": "B747",
	"b": "DC10",
	"c": "B787",
	"d": "A380",
	"image":"quizimages/q1.jpeg",
	"hint": "It's aircraft designed in 1960s.",
	"answer": "a"
   },
   
   {
	"question": "What's this aircraft?",
	"a": "B707",
	"b": "CV880",
	"c": "A320",
	"d": "DC8",
	"image":"quizimages/q2.jpg",
	"hint": "It's a very old aircraft, usually used for cargo plane today.",
	"answer": "d"
   },
   
   {
	"question": "What's this aircraft?",
	"a": "DC10",
	"b": "L1011",
	"c": "B727",
	"d": "A300",
	"image":"quizimages/q3.jpg",
	"hint": "It's a aircraft designed in 1960-70s.",
	"answer": "a"
   },
   
   {
	"question": "What's this aircraft?",
	"a": "B2707",
	"b": "Concorde",
	"c": "Tu144",
	"d": "B727",
	"image":"quizimages/q4.jpeg",
	"hint": "It's one of only two supersonic passenger jet.",
	"answer": "b"
   },
   
   {
	"question": "What's this aircraft?",
	"a": "DC10",
	"b": "B737",
	"c": "DC9",
	"d": "A320",
	"image":"quizimages/q5.webp",
	"hint": "It's a small aircraft which designed in 1960s.",
	"answer": "c"
   },
   
   {
	"question": "What's this aircraft?",
	"a": "B747",
	"b": "DC10",
	"c": "A380",
	"d": "B737",
	"image":"quizimages/q6.webp",
	"hint": "It's world's largest airliner.",
	"answer": "c"
   },
   
   {
	"question": "What's this aircraft?",
	"a": "B747",
	"b": "A340",
	"c": "A380",
	"d": "A350",
	"image":"quizimages/q7.jpg",
	"hint": "It's a aircraft designed in 1990s.",
	"answer": "b"
   },
   
   {
	"question": "What's this aircraft?",
	"a": "MD11",
	"b": "DC10",
	"c": "Tu154",
	"d": "L1011",
	"image":"quizimages/q8.webp",
	"hint": "It's the only jet airliner designed by Lockheed.",
	"answer": "d"
   },
   
   {
	"question": "What's this aircraft?",
	"a": "DC10",
	"b": "MD11",
	"c": "L1011",
	"d": "B727",
	"image":"quizimages/q9.jpg",
	"hint": "It's a modern upgrade version of DC10.",
	"answer": "b"
   },
   
   {
	"question": "What's this aircraft?",
	"a": "B727",
	"b": "Tu154",
	"c": "IL62",
	"d": "DC9",
	"image":"quizimages/q10.jpeg",
	"hint": "It's the only three-engine aircraft designed by Boeing.",
	"answer": "a"
   }
 ];
 
 window.onload = function () {
	document.getElementById("hintButton").onclick = getHintF;
	loadQuestion();	
	closeLightBox();
 };
 
 let getHintF = function() {
	 if (hints < maxHints && hintused == false) {
		 
		 let currentHint = questions[currentQuestion].hint;
		 document.getElementById("hint").innerHTML = currentHint;
		 
		 hints++;
		 hintused = true;
	 }
 }
 
 function loadQuestion() {
     
	document.getElementById("countdown").innerHTML = "21 seconds remaining";
	timeleft = 20;
	downloadTimer = setInterval(function(){
	  
		  // update display
		  document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
		  timeleft -= 1;  // decrement time left
		  
		  // if time runs out, end timer
		  if(timeleft <= -1){
			clearInterval(downloadTimer);
			document.getElementById("countdown").innerHTML = "Finished";
			markIt("f");
		}
	}, 1000);
	 
    // load the image
    let img = document.getElementById("image");
    img.src = questions[currentQuestion].image;
    img.style.maxWidth = "70vh";
	img.style.maxHeight = "80vh";
    
    // load the question and answers
    document.getElementById("question").innerHTML = questions[currentQuestion].question;
    document.getElementById("a").innerHTML = "A. " + questions[currentQuestion].a;
    document.getElementById("b").innerHTML = "B. " + questions[currentQuestion].b;
    document.getElementById("c").innerHTML = "C. " + questions[currentQuestion].c;
    document.getElementById("d").innerHTML = "D. " + questions[currentQuestion].d;
	
	document.getElementById("hint").innerHTML = "Hints left: " + (3 - hints);
 } // loadQuestion
 
 
 function markIt(ans) {
     
    let message = "";
    
	if (!(currentQuestion >= questions.length)) {
		if (ans == questions[currentQuestion].answer) {
			
		   // add 1 to score
			score += Maxscore - (20 - timeleft) * 25;
		   
		   // display score 
		   document.getElementById("score").innerHTML = score;
		   
		   message = "Correct! You got " + (Maxscore - (20 - timeleft) * 25) + " points. Your score is " + score;
		} 
		
		else if (ans == "f") {
			message = "Runout of time :< Yor score is " + score;
		}
		
		else {
		   message = "Incorrect :< Your score is " + score; 
		} // else
	}
        
    hintused = false;
	currentQuestion++;
	
    // move to the next question
	
    if (currentQuestion >= questions.length) {
       // create a special message
       if (score == 0) {
		   message = "How do you get this all wrong? You should even get 1 point if you are guessing.";
	   }
	   
	   else if (score > 0 && score < 5000) {
		   message = "You are not good at this.";
	   }
	   
	   else if (score >= 5000 && score <= 7999) {
		   message = "Not bad for you score.";
	   }
	   
	   else if (score > 8000 && score <= 9999) {
		   message = "Nice job! You almost get full mark!";
	   }
	   
	   else if (score == 10000) {
		   message = "How do you answer every question in one second?";
	   }
	   
	   message += "<div id='restart' onclick='restartQuiz()'>Restart Quiz</div>";
    } 
	
	else {
		clearInterval(downloadTimer);
	}
	
    // show the lightbox
    document.getElementById("lightbox").style.display = "block";
    document.getElementById("message").innerHTML = message;
  
 }  // markIt
 
 function restartQuiz() {
	location.reload();
 }
 
 function closeLightBox() {
    document.getElementById("lightbox").style.display = "none";
	
	if (currentQuestion > 0 && currentQuestion < 10) {
		loadQuestion();
	}
 } // closeLightbox
 
  // call the annonymous function every 1000 ms or 1 second
 
if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js');
}
 
 
 
 
   

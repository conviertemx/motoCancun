// -----CANVAS-------//////////

var canvas = document.getElementById('cancun')
var ctx = canvas.getContext('2d')

// -----VARIABLES-------//////////
var question = ''
var index = 0
var iQ=0
var interval
var frames2 = 0
var frames = 0
var audio = {
    cancion: src = './TheCrew.mp3',
    crash: src='./Crash.mp3',
    beach: src='./Beach.mp3'
}
var images = {
    bg: "road.png",
    moto: "motorcycle.png",
    gameOver: "./motoAccidentada.jpeg",
    winner: "./motoEnPlaya.jpg",
    pothole: "pothole.png",
    cover:"Cancun.jpg"
}
var potholes = []
var questions = [
    'Puebla en 3 horas si voy a 60 km/hora y faltan 180 km?',//1
    'Veracruz en 4 horas si voy a 90 km/hora y faltan 300 km?',
    'Tabasco en 3 horas si voy a 120 km/hora y faltan 330 km?',
    'Campeche en 7 horas si voy a 80 km/hora y faltan 560 km?',
    'Yucatan en 5 horas si voy a 110 km/hora y faltan 560 km?',//5
    'Cancun en 6 horas si voy a 100 km/hora y faltan 550 km?',
    'Cárdenas en 8 horas si voy a 60 km/hora y faltan 490 km?',
    'Merida en 9 horas si voy a 90 km/hora y faltan 810 km?',
    'Orizaba en 2 horas si voy a 120 km/hora y faltan 240 km?',
    'La Tinaja en 3 horas si voy a 200 km/hora y faltan 600 km?',//10
    'Minatitlán en 8 horas si voy a 80 km/hora y faltan 190 km?',
    'La Venta en 4 horas si voy a 90 km/hora y faltan 380 km?',
    'El Carmen en 6 horas si voy a 100 km/hora y faltan 600 km?',
    'Frontera en 11 horas si voy a 100 km/hora y faltan 1100 km?',
    'Atasta en 5 horas si voy a 100 km/hora y faltan 800 km?',//15
    'Chenkán en 10 horas si voy a 90 km/hora y faltan 900 km?',
    'Chulbac en 9 horas si voy a 90 km/hora y faltan 810 km?',
    'Kobén en 5 horas si voy a 50 km/hora y faltan 800 km?',
    'Tenabo en 4 horas si voy a 100 km/hora y faltan 400 km?',
    'Pocboc en 7 horas si voy a 70 km/hora y faltan 490 km?'//20
]
var answers = [
    true,//1
    false,
    false,
    true,
    false,//5
    false,
    false,
    true,
    true,
    true,//10
    false,
    false,
    true,
    true,
    false,//15
    true,
    true,
    false,
    true,
    true,
]

var userAnswer
var score = 0
var numAnswers = 0

//---->> Constructor Board--------------------------------------------------------------
function Board(){
  this.x = 0 
  this.y = 0 
  this.width = canvas.width 
  this.height = canvas.height
  //-------- Image constructor
  this.image = new Image()
  this.image.src = images.bg
  //this.image.onload = ()=>this.draw()
  this.draw = function(){
      this.y++
      if(this.y > this.height) this.y = 0 // This makes the background to move
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
      ctx.drawImage(this.image,this.x,this.y - this.height,this.width,this.height)
  }

  /*
  this.drawScore = function(){
      ctx.font = "bold 24px Avenir"
      ctx.fillText("Score: " + Math.floor(frames/60), 50,50)
  }
  */
    this.drawScore = function(){
    ctx.font = "bold 20px Avenir"
    ctx.fillStyle = "red"
    ctx.fillText(score, 3,30)
    }

    this.drawQuestions = function(){
    frames2++
    if (frames2 === 450 || answers[index] === userAnswer){
        generateQuestions()
        frames2 = 0
    }
    ctx.font = "bold 21px Avenir"
    ctx.fillStyle = "white"
    ctx.fillText('¿Llego a: ', 3,60)
    ctx.fillText(questions[index], 3,90)
}
}
 /*
  this.drawQuestions = function(){
      questions = shuffleArray(questions)
    if (frames % 240 === 0 || frames === 0){
        ctx.font = "bold 24px Avenir"
        ctx.fillText(questions[iQ], 200,50)
        iQ++
        if(iQ >= questions.length) i = 0     
    }   
  } 
  */
/*-------------
function generateQuestions() {
    function random(array){
        var randomNumber = [Math.floor(Math.random()* array.length)]
        return randomNumber
    }
    index = random(questions)
    questions[index]
    answers[index]
}
*/



//---->> Constructor Board--------------------------------------------------------------

//---->> Constructor Moto------------------------------------------------------

function Moto(){
  Board.call(this)
  this.x = 300
  this.y = 650
  this.width = 40
  this.height = 80
  this.image.src = images.moto
  //this.image.onload = ()=>this.draw()
  this.draw = function(){
      this.boundaries()
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
  this.boundaries = function(){
      if(this.x > 420) {
          this.x = 420
      } // right boundary
      else if(this.x < 140 ) {
          this.x = 150
      } // left boundary    
  }

  this.isTouching = function(item){
      return (this.x < item.x + item.width) &&
      (this.x + this.width > item.x) &&
      (this.y < item.y + item.height) &&
      (this.y + this.height > item.y);
  }
} 
//---->> Constructor Moto------------------------------------------------------

//---->> Constructor Pothole------------------------------------------------------

function Pothole(x){
  this.x = x
  this.y = 0
  this.width = 25
  this.height = 25
  this.image = new Image()
  this.image.src = images.pothole
  this.draw = function(){
      this.y+=5 //--> the speed in which obstacles appear
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height) 
  }
}
//---->> Constructor Pothole------------------------------------------------------

// -----INSTANCES-------//////////
var bg = new Board()
var moto = new Moto()
var pothole = new Pothole()

// -----MAIN FUNCTIONS-------//////////
function start(){
    potholes = [] 
    frames = 0
    moto = new Moto()
    if(!interval) interval = setInterval(update,800/60) //the speed in which all moves.
    musica = new Audio()
    musica.src = audio.cancion
    musica.play()
}

function update(){
    if (frames % 60 === 0) score++
    frames++
    ctx.clearRect(0,0,canvas.width, canvas.height) //clears the rectangle
    bg.draw()
    moto.draw()
    drawPotholes()
    bg.drawScore()
    checkMotoCollition()
    bg.drawQuestions()
    checkGameTime()
}

function gameOver(){
    clearInterval(interval)
    interval = null
    ctx.fillStyle = "red"
    ctx.font = "bold 60px"
    ctx.fillText("GAME OVER", 10,150)
    ctx.fillStyle = "white"
    ctx.font = "bold 40px"
    ctx.font = "bold 12px"
    ctx.fillText("Tu score fue de: " + score, 10,200)
    //ctx.fillText(score + Math.floor(frames/60), 5,30)
    ctx.fillText("Presiona 'Return' para reiniciar", 10,230)
    musica.src = audio.stop
    crash = new Audio()
    crash.src = audio.crash
    crash.play()
}

var img = new Image()
img.srcset = images.winner

function ganaste(){
    clearInterval(interval)
    interval = null
    //drawCoverWinner()
    ctx.drawImage(img, 0,0,canvas.width,canvas.height)
    ctx.fillStyle = "red"
    ctx.font = "bold 60px"
    ctx.fillText("Ganaste, bienvenido a Cancún", 10,150)
    ctx.fillStyle = "white"
    ctx.font = "bold 40px"
    ctx.fillText("Tu score fue de: " + score, 10,200)
    ctx.fillText("Player 2, presiona 'Return' para reiniciar", 10,230)
    musica.src = audio.stop
    beach = new Audio()
    beach.src = audio.beach
    beach.play()
}

// -----AUX FUNCTIONS-------//////////
function drawCover(){
    var img = new Image()
    img.src = images.cover
    img.onload = function(){
        bg.draw()
        ctx.drawImage(img, 0,0,canvas.width,canvas.height)
        ctx.font = "bold 50px Avenir"
        ctx.fillStyle = "black"
        ctx.fillText("Presiona la tecla", 20,50)
        ctx.fillText("'Return' para comenzar", 20,100)
    }
}

function drawCoverWinner(){
    var img = new Image()
    img.src = images.winner
    img.onload = function(){
        //bg.draw()
        ctx.drawImage(img, 0,0,canvas.width,canvas.height)
    }
}
  /*
    var images = {
        bg: "road.png",
        moto: "motorcycle.png",
        gameOver: "./motoAccidentada.jpeg",
        winner: "./motoEnPlaya.jpg",
        pothole: "pothole.png",
        cover:"Cancun.jpg"
    }*/

function generatePotholes(){
    if(frames%150===0) {
        //var height = Math.floor(Math.random()*200 + 50)
        potholes.push(new Pothole(x))
        var gap = Math.floor(Math.random()*300)
        var x = 450-gap
        //var y = canvas.height - h
        potholes.push(new Pothole(x))
    }  
}

function drawPotholes(){
    generatePotholes()
    potholes.forEach(function(pothole){
        pothole.draw()
    })
}

function checkMotoCollition(){
    for(var pothole of potholes){
        if(moto.isTouching(pothole)){
            gameOver()
        }
    }
}
/* //FUNCION QUE ME DA UN ARRAY RANDOM
function shuffleArray(questions) {   
    for (var i = questions.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = questions[i];
        questions[i] = questions[j];
        questions[j] = temp;
    }
    return questions
}
*/
function generateQuestions() {
    function random(array){
        var randomNumber = [Math.floor(Math.random()* array.length)]
        return randomNumber
    }
    index = random(questions)
    questions[index]
    answers[index]
}

function checkQuestions(){
    if(answers[index] !== userAnswer)  {
        gameOver()
    } else{
        score +=10
    }
}

function checkNumAnswers(){
    if(numAnswers === questions.length-10) {
        ganaste()
    } 
}

function checkGameTime(){
    if(Math.floor(frames/60) >= 50){ganaste()} 
}

/*
this.drawQuestions = function(){
    if (frames % 250 === 0 || frames === 0) return generateQuestions()
    ctx.font = "bold 24px Avenir"
    ctx.fillText(questions[index], 200,50)
  } 
*/

// -----listeners-------//////////

addEventListener('keyup',function(e){
    switch(e.keyCode){
        case 13:
            return start()
            break;
       /* case 81:
            userAnswer = true
            checkQuestions()
            numAnswers++
            checkNumAnswers()
            break;
        case 87:
            userAnswer = false
            checkQuestions()
            numAnswers++
            checkNumAnswers() 
            break;*/
        default:
            return
    }
})

addEventListener('keydown',function(e){
    switch(e.keyCode){
        case 39:
            moto.x +=40
            break;
        case 37:
            moto.x -=40
            break;
            case 81:
            userAnswer = true
            checkQuestions()
            numAnswers++
            checkNumAnswers()
            break;
        case 87:
            userAnswer = false
            checkQuestions()
            numAnswers++
            checkNumAnswers() 
            break;
            default:
            return
              }
            })

drawCover()

// arrow right 39
// arrow left 37
// arrow top 38
// arrow bottom 40
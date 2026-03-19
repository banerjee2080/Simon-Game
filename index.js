function playSound(id){
    switch(id){
        case "red":
            var redSound = new Audio("./sounds/red.mp3");
            redSound.play();
            break;
        case "blue":
            var blueSound = new Audio("./sounds/blue.mp3");
            blueSound.play();
            break;
        case "green":
            var greenSound = new Audio("./sounds/green.mp3");
            greenSound.play();
            break;
        case "yellow":
            var yellowSound = new Audio("./sounds/yellow.mp3");
            yellowSound.play();
            break;
        default:
            console.log("No sound for this id");
    }
}

$(".btn").click(function(){
    var id = $(this).attr("id");
    $( "#" + id ).addClass("pressed");
    playSound(id);
    setTimeout(function(){
        $( "#" + id ).removeClass("pressed");
    }, 100);
});

var btnarr = ["red", "blue", "green", "yellow"];
var game = [];
var user = [];
var started = false;
var level = 1;

$(document).keydown(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        next();
        started = true;
    }
});
$(".btn").click(function(){
    var id = $(this).attr("id");
    user.push(id);
    chk(user.length - 1);
});

function chk(index){
    if(user[index] === game[index]){
        if(user.length === game.length){
            setTimeout(function(){
                next();
            }, 1000);
            level++;
            $("#level-title").text("Level " + level);
        }
    } else if(started) {
        var wrongSound = new Audio("./sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        started = false;
        level = 1;
        game = [];
        user = [];
    }
}

function next(){
    user = [];
    var random = Math.floor(Math.random() * 4);
    var randombtn = btnarr[random];
    game.push(randombtn);
    playSound(randombtn);
    $( "#" + randombtn ).addClass("pressed");
    setTimeout(function(){
        $( "#" + randombtn ).removeClass("pressed");
    }, 100);
}
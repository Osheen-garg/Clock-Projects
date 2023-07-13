const timer=document.querySelector('.timer');
const title=document.querySelector(".status");
const startBtn=document.getElementById("startBtn");
const pauseBtn=document.getElementById("pauseBtn");
const resumeBtn=document.getElementById("resumeBtn");
const resetBtn=document.getElementById("resetBtn");
const pomoCountsDisplay=document.querySelector('.pomoCountsDisplay');

const WORK_TIME=25*60;
const BREAK_TIME=5*60;

let timeID=null;
let oneRoundCompleted=false;
let totalCount=0;
let paused=false;

const updateTitle=(msg)=>{
    title.textContent=msg;
}

const saveLocalCounts=()=>{
    let counts=JSON.parse(localStorage.getItem("pomoCounts"));
    counts!==null?counts++:counts=1;
    localStorage.setItem("pomoCounts",JSON.stringify(counts));
}

const countDown=(time)=>{
    return()=>{
        const mins=Math.floor(time/60).toString().padStart(2,"0");
        const secs=Math.floor(time%60).toString().padStart(2,"0");
        timer.textContent=`${mins}:${secs}`;
        time--; 
        if(time<0){
            stopTimer();
            if(!oneRoundCompleted)
            {
                timeID=startTimer(BREAK_TIME);
                oneRoundCompleted=true;
                updateTitle("It's Break Time!");
            }
            else{
                updateTitle("Complete 1 Round of Pomodoro Technique!");
                setTimeout(()=>updateTitle("Start Timer Again!"),2000);
                totalCount++;
                saveLocalCounts();
                showPomoCounts();
            }
        }
    }
}

const startTimer=(startTime)=>{
    if(timeID!==null){
        stopTimer();
    }
    return setInterval(countDown(startTime),1000);
}

const stopTimer=()=>{
    clearInterval(timeID);
    timeID=null; 
}

const getTimeInSeconds=(timeString)=>{
    const[minutes,seconds]=timeString.split(":");
    return parseInt(minutes*60)+parseInt(seconds);
}

startBtn.addEventListener('click',()=>{
    timeID=startTimer(WORK_TIME);
    updateTitle("It's Work Time!");
});

resetBtn.addEventListener("click",()=>{
    stopTimer();
    timer.textContent="25:00";
    updateTitle("Start Timer!");
});

pauseBtn.addEventListener("click",()=>{
    stopTimer();
    paused=true;
    updateTitle("Timer Paused!");
});

resumeBtn.addEventListener("click",()=>{
    if(paused){
        const currentTime=getTimeInSeconds(timer.textContent);
        timeID=startTimer(currentTime);
        paused=false;
        (!oneRoundCompleted)?updateTitle("It's Work Time"): updateTitle("It's Break Time!");
    }
});

const showPomoCounts=()=>{
    const counts=JSON.parse(localStorage.getItem("pomoCounts"));
    if(counts>0){
        pomoCountsDisplay.style.display="block";
    }
    pomoCountsDisplay.firstElementChild.textContent=counts;
}
showPomoCounts();
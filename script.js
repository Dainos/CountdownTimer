class TimerPart {
    constructor (value, input) {
        this.val = document.querySelector(`#${value}`);
        this.input = document.querySelector(`#${input}`);
        this.isSettedByUser = false;
        // this.currentVal = +this.input.value;        
    }
    setValue () {
        if (!this.isSettedByUser) this.currentVal = +this.input.value;
        
        if (this.currentVal < 10) this.val.textContent = `0${this.currentVal}`;
        else this.val.textContent = this.currentVal;

    } 
}

let seconds = new TimerPart("seconds-value", 'seconds'),
    minutes = new TimerPart("minutes-value", "minutes"),
    hours = new TimerPart("hours-value", "hours");

let run = document.querySelector("#run");


let timerId;


run.addEventListener("click" , () => {    
    setTime();

    seconds.isSettedByUser = true;
    minutes.isSettedByUser = true;
    hours.isSettedByUser = true;


    let currentTime =  countTime();

    timerId = setInterval (() => {
        currentTime--;        
        
        seconds.currentVal = Math.floor(currentTime % 60);
        minutes.currentVal = Math.floor((currentTime/60) % 60);
        hours.currentVal = Math.floor((currentTime/3600) % 60);
        
        setTime();

    }, 1000);



});

const countTime = () => hours.currentVal * 3600 + minutes.currentVal * 60 + seconds.currentVal;
const setTime = () => {
    seconds.setValue();
    minutes.setValue();
    hours.setValue();
};





if (!("Notification" in window)) {
    alert('Обратите внимание! Браузер не поддерживает уведомления.');
}

function notification() {
    Notification.requestPermission( (permission) => {
        setTimeout ( () => {
            if (permission === "granted") console.log("Все ОК");
            let notifi = new Notification("Время вышло!", {
            body: "Время таймера истекло.",
            dir: "auto"
            });
            console.log(notifi);
        }, 3400);        
    });    
}





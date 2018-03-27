class Stopwatch {
    constructor(display, timesList) {
        this.running = false;
        this.display = display;
        this.timesList = timesList;
        this.reset();
        this.print(this.times);
        this.loop = 1;
    }
    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        } else {
            this.printList();
            this.reset();
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
        startButton.className += ' running';
    }
    pause() {
        this.running = false;
        clearInterval(this.watch);
        startButton.classList.remove('running');
    }
    resetButton() {
        this.reset();
        this.clearList();
    }
    reset() {
        if (this.running) this.pause();
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
        this.print(); 
    }
    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }
    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }
    print() {
        this.display.innerText = this.format(this.times);
    }
    printList() {
        let listEl = document.createElement('li');
        listEl.textContent = this.loop + '. ' + this.format(this.times);
        this.timesList.appendChild(listEl);
        this.loop++;
    }
    clearList() {
        let list = document.getElementsByTagName('li');
        while (list[0]) list[0].parentNode.removeChild(list[0]);
        this.loop = 1;
    }
    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'), document.querySelector('.results-list')),
    startButton = document.getElementById('start'),
    pauseButton = document.getElementById('pause'),
    resetButton = document.getElementById('reset');

startButton.addEventListener('click', () => stopwatch.start());
pauseButton.addEventListener('click', () => stopwatch.pause());
resetButton.addEventListener('click', () => stopwatch.resetButton());
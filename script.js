class Stopwatch extends React.Component {
    constructor() {
        super();
        this.state = {
            running: false,
            loop: 1,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
        this.miliseconds;
        this.seconds;
        this.minutes;
    }
    start = () => {
        if (!this.state.running) {
            this.setState({
                running: true
            });
            this.watch = setInterval(() => this.step(), 10);        //zrobione
        } else {
            this.reset();
            this.setState ({
                running: true
            });
            this.watch = setInterval(() => this.step(), 10);
        }
        /* startButton.className += ' running';  */            // to do!!!
    }
    pause = () => {
        this.setState ({
            running: false
        });                     //zrobione
        clearInterval(this.watch);
        /* startButton.classList.remove('running'); */         //to do!!!
    }
    resetButton = () => {
        this.reset();
        this.clearList();                           //zrobione
    }
    reset = () => {
        if (this.state.running) this.pause();
        this.setState ({
            times: {                                //zrobione
            minutes: 0,
            seconds: 0,
            miliseconds: 0
            }
        });
    }
    step = () => {
        if (!this.state.running) return;                //zrobione
        this.calculate();
    }

    calculate = () => {
        let {minutes, seconds, miliseconds} = this.state.times;
        /* this.minutes = this.state.times.minutes;
        this.seconds = this.state.times.seconds;
        this.miliseconds = this.state.times.miliseconds; */
        miliseconds += 1;
        if (miliseconds >= 100) {
            seconds += 1;
            miliseconds = 0;               //zrobione
        }
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }
        this.setState ({
            times: {
                miliseconds,
                seconds,
                minutes
            }
        });
    }
    render = () => {
        return (
            <div className='main'>
                <div className='timer'>
                    <nav className='controls'>
                        <a href='#' className='button' onClick={this.start.bind(this)}>Start</a>
                        <a href='#' className='button' onClick={this.pause.bind(this)}>Pause</a>
                        <a href='#' className='button' onClick={this.resetButton.bind(this)}>Reset</a>
                    </nav>
                    <div className='stopwatch'>{this.format(this.state.times)}</div>
                </div>
                <div className='results'>
                    <h2>Times list</h2>
                    <ul className='results-list'></ul>
                </div>
            </div>
        );
    }
    printList = () => {
        let listEl = document.createElement('li'), 
            list = '';
        listEl.textContent = this.loop + '. ' + this.format(this.times);
        list += listEl;
        this.loop++;
        return list;
    }
    clearList = () => {
        let list = document.getElementsByTagName('li');
        while (list[0]) list[0].parentNode.removeChild(list[0]);            //zrobione
        this.loop = 1;
    }
    format = (times) => {
        return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(Math.floor(times.miliseconds))}`;
    }
    pad0 = (value) => {
        let result = value.toString();                              //zrobione
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    }
}

ReactDOM.render(
    <Stopwatch/>,
    document.getElementById('app')
  );

//stary kod

/* class Stopwatch {
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
} */


/* const stopwatch = new Stopwatch(document.querySelector('.stopwatch'), document.querySelector('.results-list')),
    startButton = document.getElementById('start'),
    pauseButton = document.getElementById('pause'),
    resetButton = document.getElementById('reset'); */

/* startButton.addEventListener('click', () => stopwatch.start());
pauseButton.addEventListener('click', () => stopwatch.pause());
resetButton.addEventListener('click', () => stopwatch.resetButton()); */
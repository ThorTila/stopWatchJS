'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch() {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this));

        _this.start = function () {
            if (!_this.state.running) {
                _this.setState({
                    running: true
                });
            } else {
                _this.reset();
                _this.setState({
                    running: true
                });
            }
            _this.watch = setInterval(function () {
                return _this.calculate();
            }, 10);
        };

        _this.pause = function () {
            _this.setState({
                running: false
            });
            clearInterval(_this.watch);
        };

        _this.resetButton = function () {
            _this.reset();
            _this.clearList(); //todo!!!!
        };

        _this.reset = function () {
            if (_this.state.running) _this.pause();
            _this.setState({
                times: {
                    minutes: 0,
                    seconds: 0,
                    miliseconds: 0
                }
            });
        };

        _this.calculate = function () {
            var _this$state$times = _this.state.times,
                minutes = _this$state$times.minutes,
                seconds = _this$state$times.seconds,
                miliseconds = _this$state$times.miliseconds;

            miliseconds += 1;
            if (miliseconds >= 100) {
                seconds += 1;
                miliseconds = 0;
            }
            if (seconds >= 60) {
                minutes += 1;
                seconds = 0;
            }
            _this.setState({
                times: {
                    minutes: minutes,
                    seconds: seconds,
                    miliseconds: miliseconds
                }
            });
        };

        _this.render = function () {
            return React.createElement(
                'div',
                { className: 'main' },
                React.createElement(
                    'div',
                    { className: 'timer' },
                    React.createElement(
                        'nav',
                        { className: 'controls' },
                        React.createElement(
                            'a',
                            { href: '#', className: 'button ' + (_this.state.running ? 'running' : null), onClick: _this.start.bind(_this) },
                            'Start'
                        ),
                        React.createElement(
                            'a',
                            { href: '#', className: 'button', onClick: _this.pause.bind(_this) },
                            'Pause'
                        ),
                        React.createElement(
                            'a',
                            { href: '#', className: 'button', onClick: _this.resetButton.bind(_this) },
                            'Reset'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'stopwatch' },
                        _this.format(_this.state.times)
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'results' },
                    React.createElement(
                        'h2',
                        null,
                        'Times list'
                    ),
                    React.createElement('ul', { className: 'results-list' })
                )
            );
        };

        _this.printList = function () {
            /* 
            this.setState ({
            loop: + 1
            });
            this.loop++;
            return <li>{this.loop}. {this.format(this.state.times)}</li>    */ //todo!!!
            var listEl = document.createElement('li'),
                list = '';
            listEl.textContent = _this.loop + '. ' + _this.format(_this.times);
            list += listEl;
            _this.state.loop++;
            return list;
        };

        _this.clearList = function () {
            var list = document.getElementsByTagName('li');
            while (list[0]) {
                list[0].parentNode.removeChild(list[0]);
            } //todo!!!
            _this.loop = 0;
        };

        _this.format = function (times) {
            return _this.pad0(times.minutes) + ':' + _this.pad0(times.seconds) + ':' + _this.pad0(Math.floor(times.miliseconds));
        };

        _this.pad0 = function (value) {
            var result = value.toString();
            if (result.length < 2) {
                result = '0' + result;
            }
            return result;
        };

        _this.state = {
            running: false,
            loop: 0,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
        return _this;
    }

    return Stopwatch;
}(React.Component);

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('app'));

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

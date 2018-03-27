'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stopwatch = function () {
    function Stopwatch(display, timesList) {
        _classCallCheck(this, Stopwatch);

        this.running = false;
        this.display = display;
        this.timesList = timesList;
        this.reset();
        this.print(this.times);
        this.loop = 1;
    }

    _createClass(Stopwatch, [{
        key: 'start',
        value: function start() {
            var _this = this;

            if (!this.running) {
                this.running = true;
                this.watch = setInterval(function () {
                    return _this.step();
                }, 10);
            } else {
                this.printList();
                this.reset();
                this.running = true;
                this.watch = setInterval(function () {
                    return _this.step();
                }, 10);
            }
            startButton.className += ' running';
        }
    }, {
        key: 'pause',
        value: function pause() {
            this.running = false;
            clearInterval(this.watch);
            startButton.classList.remove('running');
        }
    }, {
        key: 'resetButton',
        value: function resetButton() {
            this.reset();
            this.clearList();
        }
    }, {
        key: 'reset',
        value: function reset() {
            if (this.running) this.pause();
            this.times = {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            };
            this.print();
        }
    }, {
        key: 'step',
        value: function step() {
            if (!this.running) return;
            this.calculate();
            this.print();
        }
    }, {
        key: 'calculate',
        value: function calculate() {
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
    }, {
        key: 'print',
        value: function print() {
            this.display.innerText = this.format(this.times);
        }
    }, {
        key: 'printList',
        value: function printList() {
            var listEl = document.createElement('li');
            listEl.textContent = this.loop + '. ' + this.format(this.times);
            this.timesList.appendChild(listEl);
            this.loop++;
        }
    }, {
        key: 'clearList',
        value: function clearList() {
            var list = document.getElementsByTagName('li');
            while (list[0]) {
                list[0].parentNode.removeChild(list[0]);
            }this.loop = 1;
        }
    }, {
        key: 'format',
        value: function format(times) {
            return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
        }
    }]);

    return Stopwatch;
}();

function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

var stopwatch = new Stopwatch(document.querySelector('.stopwatch'), document.querySelector('.results-list')),
    startButton = document.getElementById('start'),
    pauseButton = document.getElementById('pause'),
    resetButton = document.getElementById('reset');

startButton.addEventListener('click', function () {
    return stopwatch.start();
});
pauseButton.addEventListener('click', function () {
    return stopwatch.pause();
});
resetButton.addEventListener('click', function () {
    return stopwatch.resetButton();
});

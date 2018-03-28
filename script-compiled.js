'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
                _this.printList();
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
            _this.clearList();
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

        _this.printList = function () {
            var record = {
                id: _this.state.timesList.length,
                time: _this.format(_this.state.times)
            };
            _this.setState({
                timesList: [].concat(_toConsumableArray(_this.state.timesList), [record])
            });
        };

        _this.clearList = function () {
            _this.setState({
                timesList: []
            });
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
                    React.createElement(ResultsList, { list: _this.state.timesList })
                )
            );
        };

        _this.state = {
            running: false,
            loop: 0,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            timesList: []
        };
        return _this;
    }

    return Stopwatch;
}(React.Component);

var ResultsList = function (_React$Component2) {
    _inherits(ResultsList, _React$Component2);

    function ResultsList(props) {
        _classCallCheck(this, ResultsList);

        var _this2 = _possibleConstructorReturn(this, (ResultsList.__proto__ || Object.getPrototypeOf(ResultsList)).call(this, props));

        _this2.render = function () {
            var results = _this2.props.list.map(function (el) {
                return React.createElement(
                    'li',
                    { key: el.id },
                    el.id + 1 + '. ' + el.time
                );
            });
            return React.createElement(
                'ul',
                { className: 'results-list' },
                results
            );
        };

        return _this2;
    }
    /* static propTypes = {
        timesList: React.PropTypes.array.isRequired         //React.PropTypes is undefined...
    } */


    return ResultsList;
}(React.Component);

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('app'));

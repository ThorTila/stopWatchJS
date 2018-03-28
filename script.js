class Stopwatch extends React.Component {
    constructor() {
        super();
        this.state = {
            running: false,
            loop: 0,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            timesList: []
        };
    }
    start = () => {
        if (!this.state.running) {
            this.setState({
                running: true
            });
        } else {
            this.printList();
            this.reset();
            this.setState ({
                running: true
            });
        }
        this.watch = setInterval(() => this.calculate(), 10);
    }
    pause = () => {
        this.setState ({
            running: false
        });
        clearInterval(this.watch);
    }
    resetButton = () => {
        this.reset();
        this.clearList();
    }
    reset = () => {
        if (this.state.running) this.pause();
        this.setState ({
            times: {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
            }
        });
    }
    calculate = () => {
        let {minutes, seconds, miliseconds} = this.state.times;
        miliseconds += 1;
        if (miliseconds >= 100) {
            seconds += 1;
            miliseconds = 0;
        }
        if (seconds >= 60) {
            minutes += 1;
            seconds = 0;
        }
        this.setState ({
            times: {
                minutes,
                seconds,
                miliseconds
            }
        });
    }
    printList = () => {
        let record = {
            id: this.state.timesList.length,
            time: this.format(this.state.times)
        };
        this.setState ({
            timesList: [...this.state.timesList, record]
        });
    }
    clearList = () => {
        this.setState ({
            timesList: []
        })
    }
    format = (times) => {
        return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(Math.floor(times.miliseconds))}`;
    }
    pad0 = (value) => {
        let result = value.toString();
        if (result.length < 2) {
            result = '0' + result;
        }
        return result;
    }
    render = () => {
        return (
            <div className='main'>
                <div className='timer'>
                    <nav className='controls'>
                        <a href='#' className={'button ' + (this.state.running ? 'running': null)} onClick={this.start.bind(this)}>Start</a>
                        <a href='#' className='button' onClick={this.pause.bind(this)}>Pause</a>
                        <a href='#' className='button' onClick={this.resetButton.bind(this)}>Reset</a>
                    </nav>
                    <div className='stopwatch'>{this.format(this.state.times)}</div>
                </div>
                <div className='results'>
                    <h2>Times list</h2>
                    <ResultsList list={this.state.timesList}/>
                </div>
            </div>
        );
    }
}

class ResultsList extends React.Component {
    constructor(props) {
        super(props);
    }
    /* static propTypes = {
        timesList: React.PropTypes.array.isRequired         //React.PropTypes is undefined...
    } */
    render = () => {
        let results = this.props.list.map( el  => {
             return (
                 <li key={el.id}>{(el.id + 1) + '. ' + el.time}</li>
             )
            });
        return (
            <ul className='results-list'>{results}</ul>
        );
    }
}

ReactDOM.render(<Stopwatch/>,document.getElementById('app'));
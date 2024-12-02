import './App.css';
import React from 'react'
const data = {
	'Smooth Piano Kit': [
    {letter: 'Q', id: 'Chord 1', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'},
		{letter: 'W', id: 'Chord 2', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'},
		{letter: 'E', id: 'Chord 3', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'},
		{letter: 'A', id: 'Shaker', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'},
	  {letter: 'S', id: 'Open HH', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'},
		{letter: 'D', id: 'Closed HH', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'},
		{letter: 'Z', id: 'Punchy Kick', sound: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'},
		{letter: 'X', id: 'Side Stick', sound: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'},
		{letter: 'C', id: 'Snare', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'}
  ],
	'Heater Kit': [
		{letter: 'Q', id: 'Heater 1', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'},
		{letter: 'W', id: 'Heater 2', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'},
		{letter: 'E', id: 'Heater 3', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'},
		{letter: 'A', id: 'Heater 4', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'},
		{letter: 'S', id: 'Clap', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'},
		{letter: 'D', id: 'Open HH', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'},
		{letter: 'Z', id: "Kick n' hat", sound: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'},
		{letter: 'X', id: 'Kick', sound: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'},
		{letter: 'C', id: 'Closed HH', sound: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'}		
  ]
};
const letters = data['Smooth Piano Kit'].map(({letter}) => letter);
const Button = ({letter, id, sound, click}) => {
  return (
    <button
      className="drum-pad"
      id={id}
      onClick={click}

    >
    {letter}
    <audio className="clip" id={letter} src={sound}></audio>
    </button>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentkit: 'Smooth Piano Kit',
      soundid: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleKit = this.handleKit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleClick({target}) {
    const currentButton = target;
    const audio = currentButton.firstElementChild;
    if (audio) {
      this.setState({
        soundid: currentButton.id
      });
      audio.play();

    }
  }
  handleKeyPress(event) {
    if (letters.includes(event.key.toUpperCase())) {
      const sound = document.getElementById(`${event.key.toUpperCase()}`);
      this.setState({
        soundid: sound.parentElement.id
      })
      sound.play();
    }
  }
  handleKit() {
    if (this.state.currentkit === 'Smooth Piano Kit')  {
      this.setState({
        currentkit: 'Heater Kit'
      });
      return;
    }
    this.setState({
      currentkit: 'Smooth Piano Kit'
    })
  }
  render() {
    document.addEventListener('keydown', this.handleKeyPress);

    return (
      <div className="App">
        <h1>Drum Machine</h1>
      <div id="drum-machine">
        <p id="display" >{this.state.soundid}</p>
        <div className="buttons">
          {data[this.state.currentkit].map(({letter, id, sound}, index)=> { 
          return (
          <Button
          key={index}
          letter={letter}
          id={id}
          sound={sound}
          click={this.handleClick}
          />
          )})}
          </div>
        <button id="soundkit" onClick={this.handleKit}>{this.state.currentkit}</button>

      </div>
    </div>
  );
  }
}

export default App;

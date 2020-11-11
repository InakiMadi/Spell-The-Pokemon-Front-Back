import React from 'react';
import ReactDOM from 'react-dom';

import { IPokemon } from './components/IPokemon';
import { Header } from './components/Header';
import { Poke } from './components/Poke';
import { Connect } from './components/Connect'

interface IState {
    howManyCorrect: number;
    howManyWrong: number;
    carta: string;
    maxPokemonID: number;
    gameStarted: boolean;
    gameFinished: boolean;
    pokes: Array<IPokemon>;
    ourPoke: IPokemon;
    pickedUp: boolean[];
    addedGallery: boolean[];
    mistakesPokes: number[];
}

const initialMaxPokemonID: number = 151;
let initialPickedUp: boolean[] = new Array(initialMaxPokemonID + 1);
initialPickedUp.fill(false);
initialPickedUp[0] = true;
let initialAddedGallery: boolean[] = new Array(initialMaxPokemonID + 1);
initialAddedGallery.fill(false);
initialAddedGallery[0] = true;
let initialMistakesPokes: number[] = new Array(initialMaxPokemonID + 1);
initialMistakesPokes.fill(0);

class App extends React.Component<{}, IState> {
    state: IState;

    twitter: string = "Niakky_";
    twitch: string = "SpeedrunsEspanol";

    constructor(props: any) {
        super(props);
        this.state = {
            howManyCorrect: 0,
            howManyWrong: 0,
            carta: "",
            maxPokemonID: initialMaxPokemonID,
            gameStarted: false,
            gameFinished: false,
            pokes: [],
            ourPoke: { id: -1, name: "", image: "" },
            pickedUp: initialPickedUp,
            addedGallery: initialAddedGallery,
            mistakesPokes: initialMistakesPokes
        }
    }

    onChangeCorrect() {
        this.setState({
            howManyCorrect: this.state.howManyCorrect + 1
        });
    }

    onChangeWrong() {
        this.setState({
            howManyWrong: this.state.howManyWrong + 1
        });
    }

    onChangeCarta(texto: string) {
        this.setState({
            carta: texto
        });
    }
    onChangeGameFinished(){
        this.setState({
            gameFinished: true
        })
    }
    onChangeGameStarted(){
        this.setState({
            gameStarted: true
        })
    }
    onChangeOurPoke(newPoke: IPokemon){
        this.setState({
            ourPoke: newPoke
        })
    }
    onPickUp(id: number){
        let vect = this.state.pickedUp;
        vect[id] = true;
        this.setState({
            pickedUp: vect
        })
    }

    render() {
        return (
            <div>
                <Header
                    twitterProfile={this.twitter}
                    twitchProfile={this.twitch}
                    howManyCorrect={this.state.howManyCorrect}
                    howManyWrong={this.state.howManyWrong}
                />

                <Poke
                    carta={this.state.carta}
                    maxPokemonID={this.state.maxPokemonID}
                    gameStarted={this.state.gameStarted}
                    gameFinished={this.state.gameFinished}
                    ourPoke={this.state.ourPoke}
                    pickedUp={this.state.pickedUp}
                    changeCarta={this.onChangeCarta.bind(this)}
                    changeGameFinished={this.onChangeGameFinished.bind(this)}
                    changeGameStarted={this.onChangeGameStarted.bind(this)}
                    changeOurPoke={this.onChangeOurPoke.bind(this)}
                    changePickedUp={this.onPickUp.bind(this)}
                />

                <Connect/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));
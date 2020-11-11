import React from 'react';
import { Card } from './Card';
import { IPokemon } from './IPokemon'

/* Random integer in the interval [min,max] */
function randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

interface IProps {
    carta: string;
    maxPokemonID: number;
    gameStarted: boolean;
    gameFinished: boolean;
    ourPoke: IPokemon;
    pickedUp: boolean[];
    changeCarta: Function;
    changeGameStarted: Function;
    changeGameFinished: Function;
    changeOurPoke: Function;
    changePickedUp: Function;
}

interface IState {
    carta: string;
    gameStarted: boolean;
    gameFinished: boolean;
    ourPoke: IPokemon;
    pickedUp: boolean[];
}



export class Poke extends React.Component<IProps, IState> {
    state: IState;

    constructor(props: IProps) {
        super(props);
        this.state = {
            carta: props.carta,
            gameStarted: props.gameStarted,
            gameFinished: props.gameFinished,
            ourPoke: props.ourPoke,
            pickedUp: props.pickedUp
        }
    }


    // onCorrects() {
    //     this.setState({
    //         howManyCorrect: this.state.howManyCorrect + 1
    //     });
    //     this.props.changeCorrect();
    // }
    // onWrongs() {
    //     this.setState({
    //         howManyCorrect: this.state.howManyWrong + 1
    //     });
    //     this.props.changeWrong();
    // }
    onCarta(texto: string) {
        this.setState({
            carta: texto
        });
        this.props.changeCarta(this.state.carta);
    }
    onGameFinished(){
        this.state.gameFinished = true;
        this.props.changeGameFinished(this.state.gameFinished);
    }
    onGameStarted(){
        this.state.gameStarted = true;
        this.props.changeGameStarted(this.state.gameStarted);
    }
    onChangeOurPoke(newPoke: IPokemon){
        this.setState({
            ourPoke: newPoke
        });
        this.props.changeOurPoke(this.state.ourPoke);
    }
    onChangePickedUp(id: number){
        this.state.pickedUp[id] = true;
        this.props.changePickedUp(id);
    }


    showPokemon = (pokemon: IPokemon): void => {
        let output: string = `
              <div class="card">
                  <span class="card--id">#${pokemon.id}</span>
                  <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
              </div>
          `;
        this.onCarta(output);
    }

    getPokemon = async (id: number): Promise<void> => {
        let output: string = `
              <div class="loading_text"><h2><i>Loading Pokémon...</i></h2></div>
          `;
        this.onCarta(output);

        const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokemon: any = await data.json()

        let poke: IPokemon = { id: pokemon.id, name: pokemon.name, image: `${pokemon.sprites.front_default}` };
        this.onChangeOurPoke(poke);

        this.showPokemon(poke)
    }

    newPokemon = function (): void {
        if (!this.state.pickedUp.every(function (e: boolean) { return e; })) {
            let randID: number = randomIntFromInterval(0, this.props.maxPokemonID);
            while (this.state.pickedUp[randID] == true) {
                randID = randomIntFromInterval(0, this.props.maxPokemonID);
            }
            this.onChangePickedUp(randID);
            this.state.pickedUp[randID] = true;
            this.getPokemon(randID);
        }
        else {
            this.onGameFinished();
            let output: string = `
              <div class="correct">
                <i>F I N I S H E D !</i>
              </div>
          `;
            this.onCarta(output);
        }
    }


    onStartButton = async (): Promise<void> => {
        await this.newPokemon();
        this.onGameStarted();
    }


    render() {
        return (
            <div>
                {this.state.gameStarted
                    ?
                    <Card
                        pkmn_id={this.state.ourPoke.id}
                        pkmn_img={this.state.ourPoke.image}
                    />
                    :
                    <div className="center">
                        <button onClick={this.onStartButton.bind(this)}>START!</button>
                    </div>
                }
                <button onClick={this.newPokemon.bind(this)}>Another one!</button>
            </div>
        );
    }
}
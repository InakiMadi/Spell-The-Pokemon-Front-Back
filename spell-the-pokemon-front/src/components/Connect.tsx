import React from "react";
const axios = require('axios');

interface IState {
    nick: string;
    password: string;
    done: string;
}

export class Connect extends React.Component<{},IState> {
    state: IState;

    constructor() {
        super({});
        this.state = {
          nick: "",
          password: "",
          done: ""
        };
    }

    async Boton(): Promise<void> {
        let params = {
            nick: this.state.nick,
            password: this.state.password
        };
        axios.post('http://localhost:4000/register', null,  { params }).then((response: any) => {
        })
        this.setState({
            done: "Registered as " + this.state.nick + "."
        });
    }

    onHandleChangeNick(event: any) {
        this.setState({
            nick: event.target.value
        });
    }
    onHandleChangePassw(event: any) {
        this.setState({
            password: event.target.value
        });
    }

    render(){
        return (
            <div>
                <button onClick={this.Boton.bind(this)}>Register</button>
                <input type="text" value={this.state.nick}
                        onChange={(event) => this.onHandleChangeNick(event)} />
                <input type="text" value={this.state.password}
                        onChange={(event) => this.onHandleChangePassw(event)} />
                {this.state.done}
            </div>
        );
    }
};
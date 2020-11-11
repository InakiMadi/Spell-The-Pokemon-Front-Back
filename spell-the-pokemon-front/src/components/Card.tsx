import React from "react";

export const Card = (
    props: {
        pkmn_id: number, pkmn_img: string, pkmn_name?: string
    }
) => {
    if (props.pkmn_name == undefined) {
        return (
            <div className="center">
                <div className="card">
                    <span className="card--id">#{props.pkmn_id}</span>
                    <img className="card--image" src={props.pkmn_img} />
                </div>
            </div>
        );
    }
    else{
        return (
                <div className="card">
                    <span className="card--id">#{props.pkmn_id}</span>
                    <img className="card--image" src={props.pkmn_img} />
                    <div className="card--name">{props.pkmn_name}</div>
                </div>
        );
    }
};
import React from "react";

export const Header = (
    props: {
        twitterProfile: String, twitchProfile: String,
        howManyCorrect: number, howManyWrong: number
    }
) => {
    return (
        <div>
            <div className="cent_imgs">
                <a href={"http://www.twitter.com/" + props.twitterProfile}>
                    <img src="https://cdn.discordapp.com/attachments/459106062906163206/767847345168842762/Twitter.png" width="47" height="47" />
                </a>
                <a href={"http://www.twitch.tv/" + props.twitchProfile}>
                    <img src="https://cdn.discordapp.com/attachments/459106062906163206/767847335295451156/Twitch.png" width="50" height="50" />
                </a>
            </div>

            <div className="correctWrong">
                <div className="correct">
                    <span id="howManyCorrect">Correct: {props.howManyCorrect}</span>
                </div>
                <div className="false">
                    <span id="howManyWrong">Mistakes: {props.howManyWrong}</span>
                </div>
            </div>

            <div className="center">
                <h1>Say, who is this Pokémon?</h1>
            </div>
        </div>
    );
};
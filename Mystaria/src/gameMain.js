import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { CharacterCreationMenu } from './ui/CharacterCreationMenu';
import { AUTO, DOM, Game, Physics } from 'phaser';
import { LoadSaveMenu } from './ui/loadSaveMenu';
import { PauseMenu } from './ui/pauseMenu';
import { InputManager } from './utils/inputManager';

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    pixelArt: true,
    dom:
    {
        createContainer: true
    },
    scale: 
    {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        PauseMenu,
        MainGame,
        GameOver,
        CharacterCreationMenu,
        LoadSaveMenu,
        InputManager

    ],
    physics: {
        default: 'arcade',
        arcade: 
        {
            gravity: { y: 0 },
            debug: false
        }
    },
};

const StartGame = (parent) => {

    return new Game({ ...config, parent });
}

export default StartGame;

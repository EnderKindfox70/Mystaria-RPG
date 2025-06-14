import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { CharacterCreationMenu } from './ui/CharacterCreationMenu';
import { AUTO, Game, Physics } from 'phaser';
import { LoadSaveMenu } from './ui/loadSaveMenu';

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        MainGame,
        GameOver,
        CharacterCreationMenu,
        LoadSaveMenu
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true // Pour voir les collisions
        }
    },
};

const StartGame = (parent) => {

    return new Game({ ...config, parent });
}

export default StartGame;

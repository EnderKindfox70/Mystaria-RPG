import { Scene } from 'phaser';
import Player from '../entities/Player.js';
import { GameSession } from '../utils/gameSession.js';

export class BaseGameScene extends Scene 
{
    constructor(key) 
    {
        super(key);
        this.currentSaveId = null;
    }

    preload() 
    {
        this.load.image('player_static', '../src/assets/sprites/player.png');
        this.load.spritesheet('player', '../src/assets/sprites/player_walk.png', {frameWidth: 32,frameHeight: 32});
    }

    create() 
    {
        this.anims.create({
        key: 'walk-down',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
        frameRate: 8,
        repeat: -1
        });

        this.anims.create({
        key: 'walk-left',
        frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
        frameRate: 8,
        repeat: -1
        });

        this.anims.create({
        key: 'walk-right',
        frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
        frameRate: 8,
        repeat: -1
        });

        this.anims.create({
        key: 'walk-up',
        frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
        frameRate: 8,
        repeat: -1
        });

        this.player = new Player(this, 346.9194173824158, 201.41941738241596, 'player');
        console.log(`Player position: x = ${this.player.x}, y = ${this.player.y}`);

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(3);
        this.cameras.main.roundPixels = true;

        const saveData = this.scene.settings.data?.saveData;
        if(saveData) 
        {
            this.loadFromSave(saveData);
        }
        console.log(`Player position: x = ${this.player.x}, y = ${this.player.y}`);

    }

    update(time, delta) 
    {
        if (this.player && this.player.update) 
        {
            this.player.update();
            GameSession.currentSaveId = this.currentSaveId
            GameSession.gameData.position = 
            {
                x: this.player.x,
                y: this.player.y,
                scene: this.scene.key
            }
            GameSession.gameData.playerData = this.player.playerData;
        }

    }

    async loadFromSave(saveData) 
    {
        if (!saveData) return;
        this.currentSaveId = saveData.id || null;
        GameSession.currentSaveId = this.currentSaveId;

        console.log('Loading from save:', this.player);
        if (saveData.gameData && saveData.gameData.position) 
        {
            this.player.x = saveData.gameData.position.x;
            this.player.y = saveData.gameData.position.y;
            this.player.name = saveData.gameData.name;
            this.player.playerData = saveData.gameData.playerData;

            GameSession.gameData.position = { ...saveData.gameData.position };
            GameSession.gameData.playerData = { ...saveData.gameData.playerData };
        }
    }
}

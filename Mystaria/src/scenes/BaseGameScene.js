import { Scene } from 'phaser';
import Player from '../entities/Player.js';

export class BaseGameScene extends Scene 
{
    constructor(key) 
    {
        super(key);
        this.currentSaveId = null;
    }

    preload() 
    {
    }

    create() 
    {

        this.player = new Player(this, 0, 0, 'player');

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(3);
        this.cameras.main.roundPixels = true;

        const saveData = this.scene.settings.data?.saveData;
        if(saveData) 
        {
            this.loadFromSave(saveData);
        }
    }

    update(time, delta) 
    {
        if (this.player && this.player.update) 
        {
            this.player.update();
        }
    }

    async loadFromSave(saveData) 
    {
        if (!saveData) return;
        this.currentSaveId = saveData.id || null;
        console.log('Loading from save:', this.player);
        if (saveData.character && saveData.character.position) 
        {
            this.player.x = saveData.character.position.x;
            this.player.y = saveData.character.position.y;
        }
    }
}

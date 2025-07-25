import { BaseGameScene } from './BaseGameScene.js';
import Player from '../entities/Player.js';
import Enemy from '../entities/Enemy.js';
import { GameSession } from '../utils/gameSession.js';

export class Game extends BaseGameScene
{
    constructor ()
    {
        super('Game');
    }

    preload()
    {
        super.preload();
        this.load.tilemapTiledJSON('tilemap', '../src/maps/tilemap.json');
        this.load.image('tileset', '../src/assets/tileset/tileset.png');
        this.load.spritesheet('enemy','../src/assets/sprites/enemy/Enemy.png',{frameWidth: 32,frameHeight: 32});
    }

    create()
    {
        super.create(); 
        const map = this.make.tilemap({ key: 'tilemap' });
        const tileset = map.addTilesetImage('test', 'tileset', 16, 16, 0, 0);

        const offsetX = (this.cameras.main.width - map.widthInPixels) / 2;
        const offsetY = (this.cameras.main.height - map.heightInPixels) / 2;

        const groundLayer = map.createLayer('floor', tileset, offsetX, offsetY);
        const collisionLayer = map.createLayer('wall', tileset, offsetX, offsetY);
        const decorationLayer = map.createLayer('decoration', tileset, offsetX, offsetY);
        decorationLayer.setDepth(2); // Mettre la couche de décoration au-dessus des autres

        collisionLayer.setCollisionByExclusion([-1]); // Exclut les tuiles vides de la collision




        this.cameras.main.setBounds(offsetX, offsetY, map.widthInPixels, map.heightInPixels);
        this.physics.world.bounds.setTo(offsetX, offsetY, map.widthInPixels, map.heightInPixels);
        this.physics.add.collider(this.player, collisionLayer);

        this.exitZone = this.add.zone(500,620,600,10);
        this.physics.world.enable(this.exitZone);
        this.physics.add.overlap(this.player,this.exitZone, () =>
        {
            GameSession.gameData.position.x = 505;
            GameSession.gameData.position.y = 175;
            // Préserve l'instance PlayerData lors du changement de scène
            const saveData = GameSession.getSaveData();
            saveData.gameData.playerData = GameSession.gameData.playerData;
            this.scene.start('Forest', { saveData });
        });
    }

    update (time, delta)
    {
        super.update(time, delta);
        // ...ajoute ici du code spécifique à la scène Game si besoin...
    }

    // Si tu veux restaurer des propriétés spécifiques à Game, surcharge loadFromSave
    async loadFromSave(saveData) 
    {
        await super.loadFromSave(saveData);
        // ...restaure ici d'autres propriétés spécifiques à Game si besoin...
    }
}

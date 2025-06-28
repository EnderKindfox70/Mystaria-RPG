import { BaseGameScene } from './BaseGameScene.js';
import Player from '../entities/Player.js';

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
    }

    create()
    {
        super.create(); // Appelle la logique de la classe mère (chargement map, player, saveData...)
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
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, collisionLayer);






        
        // Afficher les propriétés de collision dans la console
        collisionLayer.forEachTile(tile => {
            if (tile.properties.collision) {
                console.log(`Tile at ${tile.x},${tile.y} has collision`);
            }
        });

        console.log(this.scene.get('Game').player);
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

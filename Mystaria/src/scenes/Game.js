import { Scene } from 'phaser';
import Player from '../entities/Player.js';
export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    preload()
    {
        this.load.image('player', '../src/assets/sprites/player.png');
        this.load.tilemapTiledJSON('tilemap', '../src/maps/tilemap.json');
        this.load.image('tileset', '../src/assets/tileset/tileset.png');
    }

    create()
    {
        const map = this.make.tilemap({ key: 'tilemap' });
        const tileset = map.addTilesetImage('test', 'tileset', 16, 16, 0, 0);

        const offsetX = (this.cameras.main.width - map.widthInPixels) / 2;
        const offsetY = (this.cameras.main.height - map.heightInPixels) / 2;

        const groundLayer = map.createLayer('floor', tileset, offsetX, offsetY);
        const collisionLayer = map.createLayer('wall', tileset, offsetX, offsetY);
        const decorationLayer = map.createLayer('decoration', tileset, offsetX, offsetY);
        decorationLayer.setDepth(2); // Mettre la couche de décoration au-dessus des autres

        collisionLayer.setCollisionByExclusion([-1]); // Exclut les tuiles vides de la collision
        console.log('Collision Layer:', collisionLayer.layer.properties);

        this.player = new Player(this, (map.widthInPixels / 2), (map.heightInPixels / 2), 'player');
        this.player.setDepth(1);
        
        this.physics.world.bounds.setTo(offsetX, offsetY, map.widthInPixels, map.heightInPixels);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.5);
        this.physics.add.collider(this.player, collisionLayer);


        this.cameras.main.setBounds(offsetX, offsetY, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(3);
        this.cameras.main.roundPixels = true;


        
        // Afficher les propriétés de collision dans la console
        collisionLayer.forEachTile(tile => {
            if (tile.properties.collision) {
                console.log(`Tile at ${tile.x},${tile.y} has collision`);
            }
        });
    }

    update (time, delta)
    {
        this.player.update();
    }

    
}

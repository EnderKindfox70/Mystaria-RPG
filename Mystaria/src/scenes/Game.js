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

        collisionLayer.setCollisionByProperty({ collision: true });

        this.player = new Player(this, (map.widthInPixels / 2), (map.heightInPixels / 2), 'player');
        
        this.physics.world.bounds.setTo(offsetX, offsetY, map.widthInPixels, map.heightInPixels);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, collisionLayer);

        this.cameras.main.setBounds(offsetX, offsetY, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;

        // Debug visuel des collisions
        if (this.physics.config.debug) {
            const debugGraphics = this.add.graphics().setAlpha(0.75);
            collisionLayer.renderDebug(debugGraphics, {
                tileColor: null,
                collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
                faceColor: new Phaser.Display.Color(40, 39, 37, 255)
            });
        }
    }

    update (time, delta)
    {
        this.player.update();
    }

    
}

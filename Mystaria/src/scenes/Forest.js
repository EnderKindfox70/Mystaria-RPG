import Player from "../entities/Player";
import { GameSession } from "../utils/gameSession";
import { BaseGameScene } from "./BaseGameScene";
import Enemy from "../entities/Enemy";

export class Forest extends BaseGameScene
{
    constructor()
    {
        super('Forest');
    }

    init(data) 
    {
    if (data && data.saveData) 
    {
        this.saveData = data.saveData;
    }
}
    preload()
    {
        super.preload();
        this.load.tilemapTiledJSON('forestmap', '../src/maps/forest.json');
        this.load.image('tileset', '../src/assets/tileset/tileset.png');
        this.load.spritesheet('enemy','../src/assets/sprites/enemy/Enemy.png',{frameWidth: 32,frameHeight: 32});
    }

    async create()
    {
        super.create();


        console.log(this.player);
        const map = this.make.tilemap({key:'forestmap'});
        const tileset = map.addTilesetImage('test', 'tileset', 16, 16, 0, 0);

        const offsetX = (this.cameras.main.width - map.widthInPixels) / 2;
        const offsetY = (this.cameras.main.height - map.heightInPixels) / 2;

        const groundLayer = map.createLayer('floor', tileset, offsetX, offsetY);
        const collisionLayer = map.createLayer('wall', tileset, offsetX, offsetY);
        const decorationLayer = map.createLayer('decoration', tileset, offsetX, offsetY);
        const itemLayer = map.createLayer('item',tileset,offsetX,offsetY);
        console.log(itemLayer);
        this.enemy = new Enemy(this, 346.9194173824158, 201.41941738241596, 'enemy',null,'enemy',null);
        this.enemy1 = new Enemy(this, 500.9194173824158, 301.41941738241596, 'enemy',null,'enemy',null);
        this.enemy2 = new Enemy(this, 400.9194173824158, 501.41941738241596, 'enemy',null,'enemy',null);

        decorationLayer.setDepth(2);
        collisionLayer.setDepth(2);
        collisionLayer.setCollisionByExclusion([-1]); // All tiles except -1 (empty) will collide

        this.cameras.main.setBounds(offsetX, offsetY, map.widthInPixels, map.heightInPixels);
        this.physics.world.bounds.setTo(offsetX, offsetY, map.widthInPixels, map.heightInPixels);
        this.physics.add.collider(this.player, collisionLayer);

       
        this.exitZone = this.add.zone(505,153,600,10);
        this.physics.world.enable(this.exitZone);
        this.physics.add.overlap(this.player,this.exitZone, () =>
        {
            GameSession.saveData.position.x = 500;
            GameSession.saveData.position.y = 605;
            this.scene.start('Game',{saveData: GameSession.getSaveData()});
        })
        console.log(this.scene.settings.data.saveData);
    }

    update(time,delta)
    {
        super.update(time,delta);

    }

    async loadFromSave(saveData)
    {
        await super.loadFromSave(saveData);
    }
}
import Phaser from 'phaser';

export default class Entity extends Phaser.Physics.Arcade.Sprite 
{
    constructor(scene, x, y, texture, frame) 
    {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        
    }

    update() 
    {
        // Update logic for the entity
    }

    destroy() 
    {
        super.destroy();
    }
}
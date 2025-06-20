import Entity from "./Entity";

export default class Player extends Entity 
{
    constructor(scene, x, y, texture = 'player', frame) 
    {
        super(scene, x, y, texture, frame);

        this.setOrigin(0.5, 0.5);
        this.setScale(0.5);
        this.setDepth(1);


        this.body.setSize(16, 24);
        this.body.setOffset(5, 0);

        this.sneakSpeed = 50;
        this.walkSpeed = 75;
        this.runSpeed = 100; 
        this.speed = this.walkSpeed;

        this.cursors = scene.input.keyboard.createCursorKeys(); 
        this.cursors.shift = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.cursors.ctrl = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);

        this.keys = 
        {
            w: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
            a: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            s: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            d: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            shift: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT),
            space: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
        };
    }

    update() 
    {
        if (!this.body) return;

        // Définir la vitesse en fonction des touches
        if (this.cursors.shift.isDown) 
        {
            this.speed = this.sneakSpeed;
        } 
        else if (this.cursors.ctrl.isDown) 
        {
            this.speed = this.runSpeed;
        } 
        else 
        {
            this.speed = this.walkSpeed;
        }

        this.body.setVelocity(0);

        if (this.cursors.left.isDown || this.keys.a.isDown) 
        {
            this.body.setVelocityX(-this.speed);
        } 
        else if (this.cursors.right.isDown || this.keys.d.isDown) 
        {
            this.body.setVelocityX(this.speed);
        }

        if (this.cursors.up.isDown || this.keys.w.isDown) 
        {
            this.body.setVelocityY(-this.speed);
        } 
        else if (this.cursors.down.isDown || this.keys.s.isDown) 
        {
            this.body.setVelocityY(this.speed);
        }

        this.body.velocity.normalize().scale(this.speed);

    }
}
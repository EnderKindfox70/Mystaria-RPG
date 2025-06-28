import Entity from "./Entity";

export default class Player extends Entity {
    constructor(scene, x, y, texture = 'player', frame, name, playerData) {
        super(scene, x, y, texture, frame);
        this.name = name;

        this.setOrigin(0.5, 0.5);
        this.setScale(0.5);
        this.setDepth(1);

        this.body.setSize(16, 24);
        this.body.setOffset(5, 0);

        this.sneakSpeed = 50;
        this.walkSpeed = 75;
        this.runSpeed = 100; 
        this.speed = this.walkSpeed;

        this.lastDirection = 'down';

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

        if (this.cursors.shift.isDown) 
        {
            this.speed = this.sneakSpeed;
        } 
        else if (this.cursors.ctrl.isDown) 
        {
            this.speed = this.runSpeed;
        } else 
        {
            this.speed = this.walkSpeed;
        }

        let velocityX = 0;
        let velocityY = 0;
        let animKey = null;

        // Déplacement horizontal
        if (this.cursors.left.isDown || this.keys.a.isDown) {
            velocityX = -this.speed;
            animKey = 'walk-left';
        } else if (this.cursors.right.isDown || this.keys.d.isDown) {
            velocityX = this.speed;
            animKey = 'walk-right';
        }

        // Déplacement vertical
        if (this.cursors.up.isDown || this.keys.w.isDown) 
        {
            velocityY = -this.speed;
            if (!animKey) animKey = 'walk-up';
        } 
        else if (this.cursors.down.isDown || this.keys.s.isDown) 
        {
            velocityY = this.speed;
            if (!animKey) animKey = 'walk-down';
        }

        // Appliquer la vitesse
        this.body.setVelocity(velocityX, velocityY);
        this.body.velocity.normalize().scale(this.speed);

        // Animation en mouvement
        if (velocityX !== 0 || velocityY !== 0) 
        {
            if (this.anims.currentAnim?.key !== animKey) {
                this.anims.play(animKey, true);
            }
            this.lastDirection = animKey; // Mémorise la dernière direction pour l'idle
        } else {
            // Animation d'attente (idle)
            const idleFrames = {
                'walk-down': 0,
                'walk-left': 4,
                'walk-right': 8,
                'walk-up': 12
            };
            const frame = idleFrames[this.lastDirection] ?? 0;
            this.anims.stop();
            this.setFrame(frame);
        }
    }
}

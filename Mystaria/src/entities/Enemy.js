import Entity from "./Entity";

export default class Enemy extends Entity
{
    constructor(scene, x, y, texture, frame, name, enemyData)
    {
        super(scene,x,y,texture,frame);
        this.name = name;
        this.enemyData = enemyData; 
        this.setOrigin(0.5, 0.5);
        this.setScale(0.5);
        this.setDepth(1);

        this.body.setSize(16, 24);
        this.body.setOffset(5, 0);
        console.log(`Enemy created at (${this.x}, ${this.y})`);
        console.log(`Enemy body:`+this.body);  
    }

    update()
    {
        this.body.setVelocity(0, 0);
        this.body.velocity.normalize().scale(this.speed);

        // Animation en mouvement
       if (velocityX !== 0 || velocityY !== 0) 
        {
            if (this.anims.currentAnim?.key !== animKey) {
                this.anims.play(animKey, true);
            }
            this.lastDirection = animKey; // Mémorise la dernière direction pour l'idle
        } 
        else 
        {
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
import Entity from "./Entity";

export default class Enemy extends Entity {
    constructor(scene, x, y, texture, frame, name, battleScene,enemyData, groupId) {
        super(scene, x, y, texture, frame);
        this.name = name;
        this.enemyData = enemyData;
        this.battleScene = battleScene; // Scène de combat associée
        this.groupId = groupId; // Identifiant du groupe d'ennemis
        this.flee_stun = false; // Indicateur de fuite
        this.currents_stats = structuredClone(enemyData.stats); // Copie des stats actuelles
        this.setOrigin(0.5, 0.5);
        this.setScale(0.5);
        this.setDepth(1);   

        this.body.setSize(16, 24);
        this.body.setOffset(5, 0);
        console.log(`Enemy created at (${this.x}, ${this.y})`);
        console.log(`Enemy body:` + this.body);

        this.scene.physics.add.overlap(
            this,
            this.scene.player, // Assurez-vous que le joueur est accessible via `this.scene.player`
            this.triggerBattle,
            null,
            this
        );
    }

    applyStun(duration = 3000)
    {
        this.flee_stun = true;
        this.setTint(0x888888); 

        const blinkInterval = setInterval(() => 
        {
            if (this.tintTopLeft === 0x888888) 
            {
                this.clearTint();
            } 
            else
            {
                this.setTint(0x888888);
            }
        }, 200);

        this.scene.time.delayedCall(duration, () => {
            clearInterval(blinkInterval);
            this.flee_stun = false;
            this.clearTint();
        });
    }
    triggerBattle(enemy, player) 
    {
        if (this.flee_stun) return;

        let enemyInstances = [];

        if (this.groupId !== null) 
        {
            const groupEnemies = this.scene.enemies.filter(e => e.groupId === this.groupId);
            enemyInstances = groupEnemies;
            console.log(`Group enemies: ${groupEnemies.length}`);
        } 
        else 
        {
            enemyInstances = [this];
        }

        console.log(this.scene.scene.key);

        // On passe directement les instances
        this.scene.scene.pause(this.scene.key);
        this.scene.scene.launch(this.battleScene, {
            enemies: enemyInstances,
            previousSceneKey: this.scene.scene.key
        });
    }

    update() 
    {
        this.body.setVelocity(0, 0);
        this.body.velocity.normalize().scale(this.speed);

        // Animation en mouvement
        if (velocityX !== 0 || velocityY !== 0) {
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
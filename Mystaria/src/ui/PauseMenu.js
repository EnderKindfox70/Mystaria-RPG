import { Scene } from "phaser";
import { SaveSystem } from "../utils/SaveSystem";
import Player from "../entities/Player";

export class PauseMenu extends Scene 
{
    constructor() 
    {
        super('pauseMenu');
    }
        
    init(data) 
    {
        this.parentSceneKey = data?.parentSceneKey || 'Game';
    }

    create() 
    {
        console.log('PauseMenu create');
        this.scene.bringToTop('pauseMenu');
        this.add.rectangle(512, 384, 1024, 768, 0x222244, 0.7).setOrigin(0.5);
        this.add.text(512, 300, 'Pause', { fontSize: '48px', color: '#fff' }).setOrigin(0.5);
        this.add.text(512, 400, 'Appuie sur ECHAP pour reprendre', { fontSize: '24px', color: '#fff' }).setOrigin(0.5);

        const resumeButton = this.add.text(512, 500, 'Reprendre', { 
            fontSize: '32px', 
            color: '#fff', 
            backgroundColor: '#444488', 
            padding: { x: 20, y: 10 } 
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => 
        {
            this.scene.stop('pauseMenu');
            this.scene.resume(this.parentSceneKey);
        })
        .on('pointerover', () => resumeButton.setStyle({ backgroundColor: '#6666aa' }))
        .on('pointerout', () => resumeButton.setStyle({ backgroundColor: '#444488' }));
        
        const SaveButton = this.add.text(512, 600, 'Sauvegarder', { 
            fontSize: '32px', 
            color: '#fff', 
            backgroundColor: '#444488', 
            padding: { x: 20, y: 10 } 
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', async () => 
        {
            const allScenes = this.scene.manager.getScenes(false); 
            const gameScene = allScenes.find(scene => scene.scene.key === this.scene.settings.data.parentSceneKey);

            if (!gameScene || !gameScene.player) {
                console.warn('Aucune scène de jeu active trouvée pour la sauvegarde.');
                return;
            }
            
            const player = gameScene.player;
            const saveId = gameScene.currentSaveId || null;
            console.log('save id: '+ saveId);
            const saveData = 
            {
                id: saveId,
                character: 
                {
                    position: { x: player.x, y: player.y, scene: this.parentSceneKey},
                    playerData: player.playerData
                }
            };
            await SaveSystem.saveGame(saveData);
            this.scene.stop('pauseMenu');
            this.scene.resume(this.parentSceneKey);
        })
        .on('pointerover', () => SaveButton.setStyle({ backgroundColor: '#6666aa' }))
        .on('pointerout', () => SaveButton.setStyle({ backgroundColor: '#444488' }));
    
        const QuitButton = this.add.text(512, 700, 'Quitter', { 
            fontSize: '32px', 
            color: '#fff', 
            backgroundColor: '#444488', 
            padding: { x: 20, y: 10 } 
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => 
        {
            this.scene.stop('pauseMenu');
            this.scene.stop(this.parentSceneKey); 
            this.scene.start('MainMenu'); 
        })
        .on('pointerover', () => QuitButton.setStyle({ backgroundColor: '#6666aa' }))
        .on('pointerout', () => QuitButton.setStyle({ backgroundColor: '#444488' }));
    }

    

    
}
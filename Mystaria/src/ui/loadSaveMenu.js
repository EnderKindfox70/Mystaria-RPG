import { Scene } from "phaser";
import { SaveSystem } from "../utils/SaveSystem";

export class LoadSaveMenu extends Scene
{
    constructor()
    {
        super('LoadSaveMenu');
    }

    async create ()
    {
        // Fond semi-transparent
        this.add.rectangle(0, 0, 1024, 768, 0x000000, 0.7)
           .setOrigin(0)
            .setInteractive();

        const popup = this.add.container(512, 384);
        
        popup.add(
            this.add.rectangle(0, 0, 600, 400, 0x333333)
                .setStrokeStyle(2, 0xffffff)
        );

        const saves = await SaveSystem.getAllSaves();
        saves.forEach((saveFile, index) => {
            this.add.text(400, 350 + (index * 40), saveFile.id, {
                fontFamily: 'Arial',
                fontSize: 24,
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 2
            }).setOrigin(0.5).setInteractive({ useHandCursor: true })
            .on('pointerdown', async () => {
                try 
                {
                    const saveData = await SaveSystem.loadGame(saveFile.id);
                    console.log('Loaded save:', saveData);
                    this.scene.stop('MainMenu');
                    this.scene.start('Game', { saveData });
                } 
                catch (error) 
                {
                    console.error('Failed to load game:', error);
                }
            });
        });

        // Bouton fermer
        const closeButton = this.add.text(250, -180, 'X', {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#ffffff'
        })
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.scene.resume('MainMenu');
            this.scene.stop();
        });

        popup.add(closeButton);
    }

    
}
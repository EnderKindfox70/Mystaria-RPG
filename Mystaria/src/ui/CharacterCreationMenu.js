import { Scene } from "phaser";
import { SaveSystem } from '../utils/SaveSystem';

export class CharacterCreationMenu extends Scene {
    constructor() {
        super('CharacterCreationMenu');
    }

    async create() {
        this.cameras.main.setBackgroundColor(0x000000);

        this.add.text(400, 300, 'Character Creation', {
            fontFamily: 'Arial Black', fontSize: 48, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);

        this.add.rectangle(400, 400, 300, 200, 0x333333, 0.8)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', async () => {
                try {
                    // Sauvegarde et récupération de l'ID
                    const saveId = await SaveSystem.saveGame({
                        character: {
                            name: 'Hero',
                            level: 1,
                            position: {x:100, y: 100, scene: 'Game'},

                        }
                    });

                    const saveData = await SaveSystem.loadGame(saveId);
                    console.log('Loaded save:', saveData);

                    // Pour voir toutes les sauvegardes
                    const allSaves = await SaveSystem.getAllSaves();
                    console.log('All saves:', allSaves);

                    this.scene.start('Game', { saveData });
                } catch (error) {
                    console.error('Failed to save/load game:', error);
                }
            });
    }
}
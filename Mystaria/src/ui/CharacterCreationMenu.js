import { Scene } from "phaser";
import { SaveSystem } from '../utils/SaveSystem';

export class CharacterCreationMenu extends Scene {
    constructor() 
    {
        super('CharacterCreationMenu');
    }

    async create() {
        this.cameras.main.setBackgroundColor(0x000000);

        this.add.text(400, 100, 'Création de personnage', {
            fontFamily: 'Arial Black', fontSize: 48, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);

        // Zone de fond
        this.add.rectangle(400, 300, 400, 350, 0x333333, 0.85).setOrigin(0.5);

        // Label pour le nom
        this.add.text(300, 200, 'Nom :', {
            fontFamily: 'Arial', fontSize: 28, color: '#ffffff',
        }).setOrigin(1, 0.5);

        // Champ texte pour le nom (utilisation de l'élément DOM)
        const nameInput = this.add.dom(420, 200, 'input', {
            type: 'text',
            name: 'name',
            required: true, // Ajout de l'attribut required
            fontSize: '24px',
            width: '200px',
            background: '#222',
            color: '#fff',
            border: '2px solid #888',
            borderRadius: '8px',
            padding: '8px',
            outline: 'none',
            placeholder: 'Nom du héros...'
        });

        // Message d'erreur caché par défaut
        const errorText = this.add.text(420, 240, '', {
            fontFamily: 'Arial', fontSize: 20, color: '#ff5555',
        }).setOrigin(0.5);

        // Bouton Valider
        const validateBtn = this.add.rectangle(400, 320, 180, 50, 0x4caf50, 1)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });
        this.add.text(400, 320, 'Valider', {
            fontFamily: 'Arial Black', fontSize: 28, color: '#fff',
        }).setOrigin(0.5);

        validateBtn.on('pointerdown', async () => {
            const name = nameInput.node.value.trim();
            if (!name) {
                errorText.setText('Le nom est requis !');
                return;
            } else {
                errorText.setText('');
            }
            try {
                const saveId = await SaveSystem.saveGame({
                    character: {
                        name: name,
                        level: 1,
                        position: {x:100, y: 100, scene: 'Game'},
                        // Ajoute ici d'autres attributs (classe, genre, etc.)
                    }
                });
                const saveData = await SaveSystem.loadGame(saveId);
                this.scene.start('Game', { saveData });
            } catch (error) {
                console.error('Erreur lors de la sauvegarde/chargement :', error);
            }
        });
    }
}
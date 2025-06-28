import { Scene } from "phaser";
import { SaveSystem } from '../utils/SaveSystem';
import PlayerData from "../systems/PlayerData";
import ElementalMagic from "../systems/magic/ElementalMagic"

export class CharacterCreationMenu extends Scene 
{
    constructor() 
    {
        super('CharacterCreationMenu');
    }

    async create() 
    {
        let playerData = new PlayerData();
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

        const genderSelect = this.add.dom(420, 250, 'select', {
            fontSize: '20px',
            width: '200px',
            background: '#222',
            color: '#fff',
            border: '2px solid #888',
            borderRadius: '8px',
            padding: '8px',
            outline: 'none'
        });

        genderSelect.node.innerHTML = `
            <option value="">Genre...</option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
        `;

        const backgroundSelect =this.add.dom(420, 300, 'select', {
            fontSize: '20px',
            width: '200px',
            background: '#222',
            color: '#fff',
            border: '2px solid #888',
            borderRadius: '8px',
            padding: '8px',
            outline: 'none'});


            let attributes_point_available = 20;
            const attributes = [
                { key: 'force', label: 'Force' },
                { key: 'constitution', label: 'Constitution' },
                { key: 'dexterite', label: 'Dextérité' },
                { key: 'sagesse', label: 'Sagesse' },
                { key: 'intelligence', label: 'Intelligence' },
                { key: 'charisme', label: 'Charisme' }
            ];
            const baseY = 370;
            const attrValues = {};
            const attrTexts = {};

            attributes.forEach((attr, i) => {
                const y = baseY + i * 40;
                this.add.text(180, y, attr.label + ' :', {
                    fontFamily: 'Arial', fontSize: 22, color: '#fff',
                }).setOrigin(1, 0.5);

                // Valeur de base
                attrValues[attr.key] = 8;

                // Bouton -
                const minusBtn = this.add.text(200, y, '◀', {
                    fontFamily: 'Arial Black', fontSize: 28, color: '#fff', backgroundColor: '#444'
                }).setOrigin(0.5).setInteractive({ useHandCursor: true });
                minusBtn.on('pointerdown', () => {
                    if (attrValues[attr.key] > 3) {
                        attrValues[attr.key]--;
                        attributes_point_available++;
                        attrTexts[attr.key].setText(attrValues[attr.key]);
                    }
                });

                // Affichage valeur
                attrTexts[attr.key] = this.add.text(230, y, attrValues[attr.key], {
                    fontFamily: 'Arial Black', fontSize: 28, color: '#fff', backgroundColor: '#222', align: 'center', fixedWidth: 40
                }).setOrigin(0.5);

                // Bouton +
                const plusBtn = this.add.text(260, y, '▶', {
                    fontFamily: 'Arial Black', fontSize: 28, color: '#fff', backgroundColor: '#444'
                }).setOrigin(0.5).setInteractive({ useHandCursor: true });
                plusBtn.on('pointerdown', () => {
                    if (attrValues[attr.key] < 15 && attributes_point_available >0) {
                        attrValues[attr.key]++;
                        attributes_point_available--;
                        attrTexts[attr.key].setText(attrValues[attr.key]);
                    }
                });
            });;
                    // Message d'erreur caché par défaut
        const errorText = this.add.text(420, 240, '', 
        {
            fontFamily: 'Arial', fontSize: 20, color: '#ff5555',
        }).setOrigin(0.5);

        // Bouton Valider
        const validateBtn = this.add.rectangle(400, 320, 180, 50, 0x4caf50, 1)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });
        this.add.text(400, 320, 'Valider', 
        {
            fontFamily: 'Arial Black', fontSize: 28, color: '#fff',
        }).setOrigin(0.5);

        validateBtn.on('pointerdown', async () => 
        {
            const name = nameInput.node.value.trim();
            if (!name) 
            {
                errorText.setText('Le nom est requis !');
                return;
            } 
            else 
            {
                errorText.setText('');
            }
            try 
            {
                playerData.gender = genderSelect.node.value;
                playerData.attributes = attrValues;
                const weights = [0.5, 4, 1, 0.5];
                const total = weights.reduce((a, b) => a + b, 0);
                let r = Math.random() * total;
                let number_of_magic = 0;
                for (let i = 0; i < weights.length; i++) {
                    if (r < weights[i]) {
                        number_of_magic = i;
                        break;
                    }
                    r -= weights[i];
                }

                for(let i = 0; i< number_of_magic; i++)
                {
                    const index = Math.floor(Math.random() * ElementalMagic.list.length);
                    const magic = ElementalMagic.list[index];
                    if(!playerData.magic.includes(magic))
                    {
                        playerData.magic.push({magic: magic, discovered:false})
                    }
                }
                const saveId = await SaveSystem.saveGame({
                    character: {
                        name: name,
                        level: 1,
                        position: {x:100, y: 100, scene: 'Game'},
                        playerData: playerData
                        // Ajoute ici d'autres attributs (classe, genre, etc.)
                    }
                });
                const saveData = await SaveSystem.loadGame(saveId);
                this.scene.start('Game', { saveData });
            } 
            catch (error) 
            {
                console.error('Erreur lors de la sauvegarde/chargement :', error);
            }
        });
    }
}
import { Scene } from "phaser";
import { SaveSystem } from '../utils/SaveSystem';
import PlayerData from "../systems/PlayerData";
import ElementalMagic from "../systems/magic/ElementalMagic"
import NonPolarisedMagic from "../systems/magic/NonPolarisedMagic"
import Background from "../systems/Background";
import PlayerClass from "../systems/playerClass";
import Race from "../systems/Race"

export class CharacterCreationMenu extends Scene 
{
    constructor() 
    {
        super('CharacterCreationMenu');
    }

    async create() 
    {
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

        const ClassSelect =this.add.dom(420, 350, 'select', {
            fontSize: '20px',
            width: '200px',
            background: '#222',
            color: '#fff',
            border: '2px solid #888',
            borderRadius: '8px',
            padding: '8px',
            outline: 'none'});
        
        let class_tab = PlayerClass.list;
        for(let option of class_tab)
        {
            ClassSelect.node.innerHTML += "<option value='"+option.id+"'>"+option.name+"</option>"
        }

        const backgroundSelect = this.add.dom(420, 300, 'select', {
            fontSize: '20px',
            width: '200px',
            background: '#222',
            color: '#fff',
            border: '2px solid #888',
            borderRadius: '8px',
            padding: '8px',
            outline: 'none'});
        
        let background_tab = Background.list;
        for(let option of background_tab)
        {
            backgroundSelect.node.innerHTML += "<option value='"+option.id+"'>"+option.name+"</option>"
        }

        const raceSelect = this.add.dom(420, 400, 'select', {
            fontSize: '20px',
            width: '200px',
            background: '#222',
            color: '#fff',
            border: '2px solid #888',
            borderRadius: '8px',
            padding: '8px',
            outline: 'none'
        });
        raceSelect.node.innerHTML = `<option value="">Race...</option>`;
        for (let race of Race.list) {
            raceSelect.node.innerHTML += `<option value="${race.id}">${race.name}</option>`;
        }     
        
        // Sous-race (cachée par défaut)
        const subRaceSelect = this.add.dom(420, 440, 'select', {
            fontSize: '20px',
            width: '200px',
            background: '#222',
            color: '#fff',
            border: '2px solid #888',
            borderRadius: '8px',
            padding: '8px',
            outline: 'none',
            display: 'none'
        });
        subRaceSelect.node.innerHTML = `<option value="">Sous-race...</option>`;
        subRaceSelect.setVisible(false);

        // Quand on change la race principale
        raceSelect.node.innerHTML = `<option value="">Race...</option>`;
        for (let race of Race.list) {
            if (!race.parentRace) { // ou race.parentRace == null
                raceSelect.node.innerHTML += `<option value="${race.id}">${race.name}</option>`;
            }
        }

        // Sous-race (cachée par défaut)
        subRaceSelect.node.innerHTML = `<option value="">Sous-race...</option>`;
        subRaceSelect.setVisible(false);

        // Quand on change la race principale
        raceSelect.node.addEventListener('change', function() {
            const selectedRaceId = parseInt(raceSelect.node.value);
            // Cherche les sous-races dont le parentRace est l'id sélectionné
            const children = Race.list.filter(r => r.parentRace && r.parentRace.id === selectedRaceId);
            console.log(children);
            if (children.length > 0) 
            {
                subRaceSelect.node.innerHTML = `<option value="">Sous-race...</option>`;
                for (let child of children)
                {
                    subRaceSelect.node.innerHTML += `<option value="${child.id}">${child.name}</option>`;
                }
                subRaceSelect.setVisible(true);
            } 
            else 
            {
                subRaceSelect.setVisible(false);
            }
        });

        let attributes_point_available = 20;
        const attributes = [
            { key: 'strength', label: 'Force' },
            { key: 'constitution', label: 'Constitution' },
            { key: 'dexterity', label: 'Dextérité' },
            { key: 'wisdom', label: 'Sagesse' },
            { key: 'intelligence', label: 'Intelligence' },
            { key: 'charisma', label: 'Charisme' }
        ];
        const baseY = 370;
        const attrValues = {};
        const attrTexts = {};
        const pointsText = this.add.text(100, 340, `Points restants: ${attributes_point_available}`, {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#ffff00',
        }).setOrigin(0.5);

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
                    pointsText.setText(`Points restants: ${attributes_point_available}`); 
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
            plusBtn.on('pointerdown', () => 
            {
                if (attrValues[attr.key] < 15 && attributes_point_available > 0) 
                {
                    attrValues[attr.key]++;
                    attributes_point_available--;
                    attrTexts[attr.key].setText(attrValues[attr.key]);
                    pointsText.setText(`Points restants: ${attributes_point_available}`);  // Ajout de cette ligne
                }
            });
        });;
                // Message d'erreur caché par défaut
    const errorText = this.add.text(420, 240, '', 
    {
        fontFamily: 'Arial', fontSize: 20, color: '#ff5555',
    }).setOrigin(0.5);

    // Bouton Valider
    const validateBtn = this.add.rectangle(400,420 , 180, 50, 0x4caf50, 1)
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });
    this.add.text(400, 420, 'Valider', 
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
            const profileData = 
            {
                name: nameInput.node.value.trim(),
                gender: genderSelect.node.value,
                background: Background.list.find(bgnd => bgnd.id === parseInt(backgroundSelect.node.value)),
                playerClass: PlayerClass.list.find(clss => clss.id === parseInt(ClassSelect.node.value)),
                race: subRaceSelect.visible && subRaceSelect.node.value? Race.list.find(r => r.id === parseInt(subRaceSelect.node.value)): Race.list.find(r => r.id === parseInt(raceSelect.node.value)),
                attributes: attrValues,
                stats:{},
                experience:0,
                weight: 10,
                currents_stats: {hp:0,mana:0,experience:0,weight:0},
                magic:[],
                inventory: [],
                skills: 
                [
                    {id: 1 ,name: "Athletism", score: 0},
                    {id:2,name: "Acrobatic", score:0},
                    {id:3 ,name: "Stealth", score:0},
                    {id:4,name: "Sleight of hand", score:0},
                    {id:5,name: "Arcana",score:0},
                    {id:6,name: "History",score:0},
                    {id:7,name: "Investigation",score:0}, 
                    {id:8,name: "Nature",score:0},
                    {id:9,name: "Religion",score:0},
                    {id:10,name: "Animal handling",score:0},
                    {id:11,name:"intuition", score:0}, 
                    {id:12,name: "medecine",score:0},
                    {id:13,name: "Perception",score:0},
                    {id:14,name: "Survival",score:0},
                    {id:15 ,name: "Intimidation",score:0},
                    {id:16,name: "Persuasion",score:0},
                    {id:17,name: "Representation",score:0},
                    {id:18,name: "Deception",score:0}
                ]
            }
            const playerData = PlayerData.init(profileData);
            playerData.updateAttributesModifier();
            playerData.updateStatsAttribute();
            playerData.currents_stats.hp = playerData.stats.hp;
            playerData.currents_stats.mana = playerData.stats.mana;




            const saveId = await SaveSystem.saveGame({
                gameData: 
                {   
                    position: {x:500, y: 400, scene: 'Game'},
                    playerData: playerData
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
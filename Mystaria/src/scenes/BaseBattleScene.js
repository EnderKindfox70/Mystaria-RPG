import { Game, Scene } from "phaser";
import { GameSession } from "../utils/gameSession";
import PlayerData from "../systems/PlayerData";
import { SaveSystem } from "../utils/SaveSystem";

export default class BaseBattleScene extends Scene
{
    constructor(key)
    {
        super(key);
    }

    init(data)
    {
        const player = GameSession.gameData.playerData;
        console.log("Player Data:", player);
        const partyMembers = GameSession.gameData.partyMembers.filter(member => member !== undefined && member !== null);

        this.playerParty = [player, ...partyMembers];        
        this.enemies = data.enemies || [];
        this.backgroundKey = data.backgroundKey || 'defaultBackground';
        this.previousSceneKey = data.previousSceneKey || null;


    }

    async create()    
    {
        this.add.image(0, 0, this.backgroundKey).setOrigin(0, 0);
        this.cameras.main.setViewport(0, 0, this.game.config.width, this.game.config.height);
        this.cameras.main.setBackgroundColor('#000');

        console.log("Player Party:", this.playerParty);
        console.log("Enemies:", this.enemies);

        for(const enemy of this.enemies)
        {
            console.log(enemy.currents_stats);
        }

        await this.determineTurnOrder();
        this.startBattleLoop();


    }

    startBattleLoop() 
    {
        this.turnIndex = 0;
        this.playNextTurn();
    }

    playNextTurn() 
    {
        // Vérifie si combat terminé
        if (this.enemies.length === 0) 
        {
            console.log('Victoire !');

            this.scene.stop(this.key);
            this.scene.resume(this.previousSceneKey);
            return;
        }

        if (this.playerParty.length === 0) 
        {
            console.log('Défaite...');
            this.scene.stop(this.key);

            // Charge la dernière sauvegarde
            SaveSystem.loadGame().then(saveData => {
                if (saveData) {
                    GameSession.loadSaveData(saveData);
                    this.scene.start(saveData.gameData.position.scene || 'Game', { saveData });
                } else {
                    // Si pas de sauvegarde, retour au menu principal
                    this.scene.start('MainMenu');
                }
            });
            
            return;
        }



        // Si on a fait tous les tours, recommencer un cycle
        if (this.turnIndex >= this.turnOrder.length) 
        {
            this.turnIndex = 0;
        }

        const current = this.turnOrder[this.turnIndex];
        if(current.entity.currents_stats.hp <= 0)
        {
            console.log(`${current.entity.name} est hors de combat !`);
            this.playerParty = this.playerParty.filter(member => member.currents_stats.hp > 0);
            this.turnIndex++;
            this.playNextTurn();
            return
        }
        if (current.type === 'player') 
        {

            console.log("current:", current.entity);
            if(!(current.entity instanceof PlayerData))
            {
                current.entity = PlayerData.fromJSON(current.entity);
                console.log("c'est un joueur");
                console.log(current.entity);
            }

            this.createUI((selectedAction) => {
                console.log(current);
                this.executePlayerAction(current.entity, selectedAction, () => {
                    this.turnIndex++;
                    this.playNextTurn(); // Recommence le tour suivant
                });
            });
        } 
        else 
        {
            const target = this.playerParty[0]; 
            current.entity.enemyData.attack(target, current.entity.currents_stats); // Ajoute si besoin un target
            this.turnIndex++;
            this.time.delayedCall(1000, () => this.playNextTurn());
        }
    }
    createUI(onActionSelected) 
    {
        if (this.currentButtons) 
        {
            this.currentButtons.forEach(button => button.destroy());
        }

        this.currentButtons = [];

        const buttonX = 20;
        let buttonY = 400;
        const buttonSpacing = 50;

        const actions = [
            { label: 'Attaque', value: 'attack' },
            { label: 'Garde', value: 'guard' },
            { label: 'Sac', value: 'bag' },
            { label: 'Compétence', value: 'skill' },
            { label: 'Fuite', value: 'flee' }
        ];

        actions.forEach(action => {
            const button = this.add.text(buttonX, buttonY, action.label, {
                fontSize: '20px',
                fill: '#fff',
                backgroundColor: '#000',
                padding: { left: 10, right: 10, top: 5, bottom: 5 }
            })
            .setInteractive()
            .on('pointerdown', () => {
                // Détruit l'UI quand une action est choisie
                this.currentButtons.forEach(btn => btn.destroy());
                this.currentButtons = [];
                onActionSelected(action.value); // ⬅️ Appelle le callback avec la valeur choisie
            })
            .on('pointerover', () => button.setStyle({ fill: '#ff0' }))
            .on('pointerout', () => button.setStyle({ fill: '#fff' }));

            this.currentButtons.push(button);
            buttonY += buttonSpacing;
        });
    }

    executePlayerAction(player, action, onComplete) 
    {
        switch(action) 
        {
            case 'attack':
                // Simule une attaque sur le premier ennemi
                const target = this.enemies[0];
                console.log(this.enemies);
                console.log(`Target: ${target}`);
                console.log(`${player.name} attaque ${target.name}`);
                player.attack(target);

                if (target.currents_stats.hp <= 0)
                {
                    console.log(`${target.enemyData.name} est vaincu !`);
                    player.expGain(target.enemyData.exp);
                    const previousScene = this.scene.get(this.previousSceneKey);
                    console.log(previousScene);
                    if (previousScene) 
                    {
                        for (const defeated of this.enemies.filter(e => e.currents_stats.hp <= 0)) 
                        {
                            const index = previousScene.enemies.indexOf(defeated);
                            if (index !== -1) 
                            {
                                previousScene.enemies.splice(index, 1); // Retire de la liste
                                defeated.destroy(); // Détruit le GameObject
                            }
                        }
                    }
                    this.enemies = this.enemies.filter(enemy => enemy.currents_stats.hp > 0);
                    console.log(player);
                }
                onComplete();
                break;
            case 'flee':
                this.handleFlee();
                break;
            default:
                onComplete();
                break;
        }
    }

    determineTurnOrder() 
    {
        const participants = [
            ...this.playerParty.map(member => ({ type: 'player', entity: member })),
            ...this.enemies.map(enemy => ({ type: 'enemy', entity: enemy }))
        ];
        console.log('Participants:', participants);

        participants.sort((a, b) => 
        {
            const speedA = a.type === 'player' 
                ? a.entity?.stats?.speed || 0 
                : a.entity?.currents_stats?.speed || 0;

            const speedB = b.type === 'player' 
                ? b.entity?.stats?.speed || 0 
                : b.entity?.currents_stats?.speed || 0;

            return speedB - speedA;
        });
        this.turnOrder = participants;

        console.log('Ordre des tours:', this.turnOrder);
    }

    handleAttack() {
        console.log('Attaque sélectionnée');
        // Ajoute ici la logique pour attaquer un ennemi
    }

    handleGuard() {
        console.log('Garde sélectionnée');
        // Ajoute ici la logique pour activer la garde
    }

    handleBag() {
        console.log('Sac sélectionné');
        // Ajoute ici la logique pour ouvrir l'inventaire
    }

    handleSkill() {
        console.log('Compétence sélectionnée');
        // Ajoute ici la logique pour utiliser une compétence
    }

    handleFlee() 
    {
        const player = GameSession.gameData.playerData;
        let roll_flee = Math.floor(Math.random() * 20) + 1;
        roll_flee += Math.floor(player.stats.speed/10);
        let fleeSuccess = true; 

        console.log(`💨 ${player.name} tente de fuir, roll: ${roll_flee}`);
        for (const enemy of this.enemies) 
        {
            let roll_enemy = Math.floor(Math.random() * 20) + 1;
            roll_enemy += Math.floor(enemy.currents_stats.speed / 10);

            console.log(`👾 ${enemy.enemyData.name} roll : ${roll_enemy}`);

            if (roll_flee <= roll_enemy) 
            {
                fleeSuccess = false;
                console.log(`❌ Le joueur n'a pas battu ${enemy.enemyData.name}`);
                break; 
            }
        }

        if(fleeSuccess)
        {
            this.scene.stop(this.key);
            this.scene.resume(this.previousSceneKey);
            console.log(this.enemies);
            const previousScene = this.scene.get(this.previousSceneKey);
            for (const fleeingEnemy of this.enemies) 
            {
                const enemy = previousScene.enemies.find(e => e.name === fleeingEnemy.name);
                    if (enemy) {
                        enemy.applyStun?.();
                        console.log(`Stun appliqué à ${enemy.name}`);
                    }
            }
        }
        else
        {
            console.log('Échec de la fuite !');
            this.turnIndex++;
            this.playNextTurn();
        }
    }

}
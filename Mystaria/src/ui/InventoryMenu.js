import { Scene } from "phaser";

export class InventoryMenu extends Scene
{
    constructor ()
    {
        super('InventoryMenu');
    }

    create()
    {
        // Onglets
        this.tabs = [
            { key: 'items', label: 'Objets' },
            { key: 'equipment', label: 'Équipement' },
            { key: 'potions', label: 'Potions' },
            { key: 'quests', label: 'Quêtes' }
        ];
        this.selectedTab = 'items';
        this.tabButtons = [];

        // Fond du menu
        this.add.rectangle(512, 384, 700, 500, 0x222244, 0.95).setOrigin(0.5);

        // Création des boutons d'onglets
        this.tabs.forEach((tab, i) => {
            const btn = this.add.text(256 + i * 180, 170, tab.label, {
                fontSize: '30px',
                color: '#fff',
                backgroundColor: (tab.key === this.selectedTab) ? '#444488' : '#222244',
                padding: { x: 48, y: 18 },
                borderRadius: 12
            })
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.selectTab(tab.key));
            this.tabButtons.push(btn);
        });

        // Bouton X pour fermer
        const closeButton = this.add.text(840, 155, 'X', {
            fontSize: '32px',
            color: '#fff',
            backgroundColor: '#aa2222',
            padding: { x: 12, y: 4 },
            borderRadius: 8
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
            this.scene.stop();
            // Reprendre la scène principale si elle existe
            const UNPAUSABLE_SCENES = ['MainMenu', 'Preloader', 'Boot', 'GameOver', 'CharacterCreationMenu', 'LoadSaveMenu', 'pauseMenu', 'InputManager', 'InventoryMenu'];
            const pausedScenes = this.scene.manager.getScenes(false);
            const pausedScene = pausedScenes.find(s => !UNPAUSABLE_SCENES.includes(s.scene.key));
            if(pausedScene) 
            {
                this.scene.resume(pausedScene.scene.key);
            }
        });

        // Conteneur pour le contenu de l'onglet
        this.tabContent = this.add.container(512, 384);
        this.updateTabContent();
    }

    selectTab(tabKey) {
        this.selectedTab = tabKey;
        // Met à jour le style des boutons
        this.tabButtons.forEach((btn, i) => {
            btn.setStyle({
                backgroundColor: (this.tabs[i].key === tabKey) ? '#444488' : '#222244'
            });
        });
        this.updateTabContent();
    }

    updateTabContent() {
        this.tabContent.removeAll(true);
        let text = '';
        switch (this.selectedTab) {
            case 'items':
                text = 'Liste des objets ici';
                break;
            case 'equipment':
                text = 'Équipement du joueur ici';
                break;
            case 'potions':
                text = 'Potions disponibles ici';
                break;
            case 'quests':
                text = 'Objets de quête ici';
                break;
        }
        const contentText = this.add.text(0, 0, text, {
            fontSize: '26px',
            color: '#fff',
            wordWrap: { width: 600 }
        }).setOrigin(0.5);
        this.tabContent.add(contentText);
    }
}
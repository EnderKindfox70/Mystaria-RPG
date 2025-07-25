import { Scene } from "phaser";

// Nouvelle version : InventoryMenu utilisant le DOM (HTML/CSS) pour l'UI
export class InventoryMenu extends Scene {
    constructor() {
        super('InventoryMenu');
    }

    init(data) 
    {
        this.parentSceneKey = data?.parentSceneKey || 'Game';
    }
    create() 
    {
        const pauseMenuScene = this.scene.get('pauseMenu');
        if (pauseMenuScene && pauseMenuScene.scene.isActive()) 
        {
            console.warn('Impossible d’ouvrir l’inventaire : le menu pause est actif.');
            this.scene.stop(); // Arrête l'interface d'inventaire si elle a été lancée par erreur
            return;
        }
        // Crée l'UI seulement si elle n'existe pas déjà
        const player = this.scene.get(this.parentSceneKey).player;
        console.log('Player in InventoryMenu:', player);
        const playerData = player ? player.playerData :null;

        if (!document.getElementById('inventory-modal')) {
            const modal = document.createElement('div');
            modal.id = 'inventory-modal';
            modal.className = 'inventory-modal';
            modal.innerHTML = `
                <div class="inventory-header">
                    <button class="inventory-tab" data-tab="profile">profil</button>
                    <button class="inventory-tab" data-tab="bag">Sac</button>
                    <button class="inventory-tab" data-tab="skills">Compétences</button>
                    <button class="inventory-tab" data-tab="craft">Artisanat</button>
                    <button class="inventory-tab" data-tab="magic">Magie</button>
                    <button class="inventory-close">X</button>
                </div>
                <div class="inventory-content" id="inventory-content"></div>
            `;
            document.body.appendChild(modal);
        }

        // Ajoute le CSS si pas déjà présent
        if (!document.getElementById('inventory-style')) 
        {
            const style = document.createElement('style');
            style.id = 'inventory-style';
            style.textContent = `
                .inventory-modal { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 50vw;height:50vh; max-width: 95vw; background: #222244; color: #fff; border-radius: 16px; box-shadow: 0 8px 32px #000a; z-index: 1000; display: flex; flex-direction: column; }
                .inventory-header { display: flex; justify-content: space-between; align-items: center; padding: 12px 24px; background: #1a1a33; border-radius: 16px 16px 0 0; }
                .inventory-tab { background: #222244; color: #fff; border: none; padding: 12px 32px; margin-right: 8px; border-radius: 8px 8px 0 0; font-size: 1.1em; cursor: pointer; transition: background 0.2s; }
                .inventory-tab.active, .inventory-tab:hover { background: #444488; }
                .inventory-close { background: #aa2222; color: #fff; border: none; border-radius: 8px; font-size: 1.2em; padding: 8px 16px; cursor: pointer; }
                .inventory-content { padding: 32px; min-height: 200px; font-size: 1.1em; }
                .inventory-modal.hidden { display: none; }
                h1 {text-align: center;}
            `;
            document.head.appendChild(style);
        }

        // Logique JS pour l'inventaire
        this.inventoryModal = document.getElementById('inventory-modal');
        this.inventoryTabs = this.inventoryModal.querySelectorAll('.inventory-tab');
        this.inventoryContent = document.getElementById('inventory-content');
        this.inventoryClose = this.inventoryModal.querySelector('.inventory-close');

        this.tabContents = 
        {
            profile:
             '<h1>'+playerData.name+'</h1>\nRace:'+playerData.race.name+'\nBackground:'+playerData.background.name+'',
            bag: 'Liste des objets ici',
            skills: "Équipement du joueur ici",
            craft: "Craft disponibles ici",
            magic: "Vous n'avez pas encore eveillé vos pouvoirs arcanique..."
        };

        this.selectTab = this.selectTab.bind(this);
        this.hideInventory = this.hideInventory.bind(this);

        this.inventoryTabs.forEach(btn => {
            btn.addEventListener('click', () => this.selectTab(btn.dataset.tab));
        });
        this.inventoryClose.addEventListener('click', this.hideInventory);

        // Affiche l'inventaire
        this.inventoryModal.classList.remove('hidden');
        this.selectTab('profile');

        // Fermer avec Echap
        this._keydownHandler = (e) => {
            if (e.key === 'Escape') this.hideInventory();
        };
        document.addEventListener('keydown', this._keydownHandler);
    }

    selectTab(tab) {
        this.inventoryTabs.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
        this.inventoryContent.innerHTML = this.tabContents[tab] || '';
    }

    hideInventory() 
    {
        console.log(this.parentSceneKey);
        this.inventoryModal.classList.add('hidden');
        document.removeEventListener('keydown', this._keydownHandler);
        this.scene.stop();
        this.scene.resume(this.parentSceneKey);
    }
}
import { Scene } from "phaser";
import BaseBattleScene from "../scenes/BaseBattleScene";

const UNPAUSABLE_SCENES = ['MainMenu', 'Preloader', 'Boot', 'GameOver', 'CharacterCreationMenu','ForestBattleScene','InventoryMenu' ,'LoadSaveMenu', 'pauseMenu', 'InputManager'];

export class InputManager extends Scene 
{
    constructor() 
    {
        super({ key: 'InputManager', active: true });
    }

    create() 
    {
        this.input.keyboard.on('keydown-ESC', () => 
        {
            const scenes = this.scene.manager.getScenes(true);
            const mainScene = scenes.find(s => !UNPAUSABLE_SCENES.includes(s.scene.key));

            if(mainScene && !this.scene.isActive('pauseMenu')) 
            {
                this.scene.launch('pauseMenu', { parentSceneKey: mainScene.scene.key });
                this.scene.pause(mainScene.scene.key);
            } 
            else if (this.scene.isActive('pauseMenu')) 
            {
                const pauseMenu = this.scene.get('pauseMenu');
                const keyToResume = pauseMenu.parentSceneKey;
                this.scene.stop('pauseMenu');
                if(keyToResume) 
                {
                    this.scene.resume(keyToResume);
                }
            }
        });

        this.input.keyboard.on('keydown-I', () => {
            const scenes = this.scene.manager.getScenes(true);
            const mainScene = scenes.find(s => !UNPAUSABLE_SCENES.includes(s.scene.key));

            if(mainScene && !this.scene.isActive('InventoryMenu')) 
            {
                this.scene.launch('InventoryMenu',{ parentSceneKey: mainScene.scene.key });
                this.scene.pause(mainScene.scene.key);
            } 
            else if (this.scene.isActive('InventoryMenu')) 
            {
                console.log('Hiding Inventory');
                this.scene.get('InventoryMenu').hideInventory();
                const pauseMenu = this.scene.get('pauseMenu');
                const keyToResume = pauseMenu.parentSceneKey;
                if(keyToResume) 
                {   
                    this.scene.resume(keyToResume);
                }
            }
        });
    }
}
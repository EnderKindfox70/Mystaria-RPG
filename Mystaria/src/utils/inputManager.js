import { Scene } from "phaser";

const UNPAUSABLE_SCENES = ['MainMenu', 'Preloader', 'Boot', 'GameOver', 'CharacterCreationMenu', 'LoadSaveMenu', 'pauseMenu', 'InputManager'];

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
                this.scene.launch('pauseMenu');
                this.scene.pause(mainScene.scene.key);
            } 
            else if (this.scene.isActive('pauseMenu')) 
            {
                this.scene.stop('pauseMenu');
                const pausedScenes = this.scene.manager.getScenes(false);
                const pausedScene = pausedScenes.find(s => !UNPAUSABLE_SCENES.includes(s.scene.key));
                
                if(pausedScene) 
                {
                    this.scene.resume(pausedScene.scene.key);
                }
            }
        });
    }
}
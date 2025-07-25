import { Scene } from 'phaser';
import Spell from '../systems/Spells';
import MagicManager from '../utils/MagicManager';
import Background from '../systems/Background';
import Race from '../systems/Race';
import PlayerClass from '../systems/PlayerClass';
import ItemManager from '../utils/ItemManager';
import PhysicalDamage from '../systems/damage/PhysicalDamage';
import MagicalDamage from '../systems/damage/MagicalDamage';
import EnemyType from '../systems/EnemyType';
import EnemyData from '../systems/EnemyData';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        this.add.image(512, 384, 'background');
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);
        this.load.on('progress', (progress) => 
        {
            bar.width = 4 + (460 * progress);
        });
    }

    preload ()
    {
        this.load.setPath('assets');
        console.log('Loading assets...');
    }

    async create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        await PhysicalDamage.init();
        await MagicalDamage.init();
        await ItemManager.init();
        await MagicManager.init();
        await Spell.init();
        await Background.init();
        await Race.init();
        await PlayerClass.init();
        await EnemyType.init();
        await EnemyData.init();
        this.scene.start('MainMenu');
    }
}

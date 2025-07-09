import { FileDataLoader } from '../utils/fileDataLoader';
import ArmorCategory from '../systems/items/ArmorCategory'
import WeaponCategory from '../systems/items/WeaponCategory'
export default class PlayerClass
{
    static list = [];

    constructor(id, name, accuracy, favored_weapon, favored_armor, stats, start_skill, start_spell, skills, starting_kit, parent_class = null)
    {
        this.id = id;
        this.name = name;
        this.accuracy = accuracy; 
        this.favored_weapon = favored_weapon; 
        this.favored_armor = favored_armor; 
        this.stats = stats; 
        this.start_skill = start_skill; 
        this.start_spell = start_spell; 
        this.skills = skills; 
        this.starting_kit = starting_kit; 
        this.parent_class = parent_class; 
        PlayerClass.list.push(this);
    }

    static async init()
    {
        const class_data = await FileDataLoader.loadData('classes');
        for (const pclass of class_data)
        {
            console.log(pclass.favored_armor);
            const favored_armor= [];
            for(let armor of pclass.favored_armor)
            {
                favored_armor.push(ArmorCategory.list.find(arm => arm.id === armor));
            }

            const favored_weapon = []
            for(let weapon of pclass.favored_weapon)
            {
                if(weapon === 0)
                {
                    favored_weapon.push(null);
                    break;
                }
                favored_weapon.push(WeaponCategory.list.find(wp => wp.id === weapon));
            }
            new PlayerClass(pclass.id, pclass.name, pclass.accuracy,favored_weapon,favored_armor,pclass.stats,pclass.start_skill, pclass.start_spell, pclass.skills,pclass.starting_kit,pclass.parent_class);
        }
        console.log(PlayerClass.list);
    }
    
}
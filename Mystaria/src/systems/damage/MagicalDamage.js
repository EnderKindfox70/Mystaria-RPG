import { FileDataLoader } from '../../utils/fileDataLoader.js';
import Damage from './Damage.js';
export default class MagicalDamage extends Damage
{
    static list = []
    constructor(id,name)
    {
        super(id,name);
        MagicalDamage.list.push(this);
    }

    static async init()
    {
        const magical_dmg_data = await FileDataLoader.loadData('magical_damage');
        for(const dmg of magical_dmg_data)
        {
            new MagicalDamage(dmg.id,dmg.name);
        }
        console.log(MagicalDamage.list);        
    }
}
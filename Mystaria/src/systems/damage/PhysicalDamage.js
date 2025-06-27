import { FileDataLoader } from '../../utils/fileDataLoader.js';
import Damage from './Damage.js';
export default class PhysicalDamage extends Damage
{
    static list = []
    constructor(id,name)
    {
        super(id,name);
        PhysicalDamage.list.push(this);
    }

    static async init()
    {
        const physical_dmg_data = await FileDataLoader.loadData('physical_damage');
        for(const dmg of physical_dmg_data)
        {
            new PhysicalDamage(dmg.id,dmg.name);
        }
        console.log(PhysicalDamage.list);
    }
}
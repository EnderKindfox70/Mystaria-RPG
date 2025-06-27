import ElementalMagic from './ElementalMagic.js';
import NonPolarisedMagic from './NonPolarisedMagic.js';
import SoulMagic from './SoulMagic.js';
import { FileDataLoader } from '../../utils/fileDataLoader.js';

export default class MagicManager 
{
    static async init() 
    {
        const ElementalMagicData = await FileDataLoader.loadData('elemental_magic');
        const NonPolarisedMagicData = await FileDataLoader.loadData('non_polarised_magic');
        const SoulMagicData = await FileDataLoader.loadData('soul_magic');
        for(const magicData of ElementalMagicData) 
        {
            new ElementalMagic(magicData.id, magicData.name);
        }
        for(const magicData of NonPolarisedMagicData) 
        {
            new NonPolarisedMagic(magicData.id, magicData.name);
        }
        for(const magicData of SoulMagicData) 
        {
            new SoulMagic(magicData.id, magicData.name);
        }
    }
}

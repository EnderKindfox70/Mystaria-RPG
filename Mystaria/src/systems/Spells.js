import { FileDataLoader } from '../utils/fileDataLoader';
import ElementalMagic from './magic/ElementalMagic.js';
import NonPolarisedMagic from './magic/NonPolarisedMagic.js';
import SoulMagic from './magic/SoulMagic.js';
import TargetType from './enum/targetType.js';
import Range from './enum/range.js';
export default class Spell 
{
    static list = [];
    constructor(id, name, description, magic, cost, sideEffect, rangeStr, targetTypeStr, effects) 
    {
        this.id = id; 
        this.name = name; 
        this.magic = magic;
        this.description = description; 
        this.cost = cost; 
        this.sideEffect = sideEffect;
        this.range = rangeStr; // nom de l'enum uniquement
        this.targetType = targetTypeStr; // nom de l'enum uniquement
        this.effects = effects; 
        Spell.list.push(this);
    }

    static async init() 
    {
        const spell_data = await FileDataLoader.loadData('spells');
        const allMagic = 
        [
            ...ElementalMagic.list,
            ...NonPolarisedMagic.list,
            ...SoulMagic.list
        ];
        // Inverse les enums pour retrouver le nom à partir de la valeur
        const targetTypeReverse = Object.entries(TargetType).reduce((acc, [k, v]) => { acc[v] = k; return acc; }, {});
        const rangeReverse = Object.entries(Range).reduce((acc, [k, v]) => { acc[v] = k; return acc; }, {});
        for (const spell of spell_data) 
        {
            const magicObjects = spell.magic.map(id => allMagic.find(m => m.id === id));
            // targetType
            let targetTypeStr = undefined;
            if (typeof spell.target === 'number' && targetTypeReverse[spell.target]) 
            {
                targetTypeStr = targetTypeReverse[spell.target];
            } 
            else if(typeof spell.target === 'string' && TargetType[spell.target.toUpperCase()] !== undefined) {
                targetTypeStr = spell.target.toUpperCase();
            }

            // range
            let rangeStr = undefined;
            if (typeof spell.range === 'number' && rangeReverse[spell.range]) 
            {
                rangeStr = rangeReverse[spell.range];
            } 
            else if (typeof spell.range === 'string' && Range[spell.range.toUpperCase()] !== undefined) 
            {
                rangeStr = spell.range.toUpperCase();
            }
            new Spell(
                spell.id,
                spell.name,
                spell.description,
                magicObjects,
                spell.cost,
                spell.side_effects,
                rangeStr,
                targetTypeStr,
                spell.effects
            );
        }
        console.log(Spell.list);
    }
}
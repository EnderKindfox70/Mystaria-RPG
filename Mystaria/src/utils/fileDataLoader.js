// Imports statiques des fichiers JSON
import spells from '../data/spells.json';
import classes from '../data/classes.json';
import backgrounds from '../data/backgrounds.json';

import PhysicalDamage from '../data/damages/physicalDamage.json';
import MagicalDamage from '../data/damages/magicalDamage.json';


import Elementalmagic from '../data/magic/elementalMagic.json';
import NonPolarisedMagic from '../data/magic/nonPolarisedMagic.json';
import SoulMagic from '../data/magic/soulMagic';

import items from '../data/items.json';
import playerData from '../data/playerData.json';
import race from '../data/races.json';

import weapon_category from '../data/items/weaponCategory.json';
import weapon_material from '../data/items/weaponMaterial.json';
import weapons from '../data/items/weapons.json';

import armor_category from '../data/items/armorCategory.json';
import armor_material from '../data/items/armorMaterial.json';
import armors from '../data/items/armors.json';

import shield_category from '../data/items/shieldCategory.json';
import shield_material from '../data/items/shieldMaterial.json';
import shields from '../data/items/shields.json';

import potions from '../data/items/potions.json';

import enemyData from '../data/enemy.json';
import enemyType from '../data/enemyType.json';

export class FileDataLoader 
{
    static async loadData(file_name) 
    {
        switch(file_name) 
        {
            case 'spells':
                return spells;
            case 'classes':
                return classes;
            case 'backgrounds':
                return backgrounds;
            case 'elemental_magic':
                return Elementalmagic;
            case 'non_polarised_magic':
                return NonPolarisedMagic;
            case 'soul_magic':
                return SoulMagic;
            case 'items':
                return items;
            case 'enemies':
                return enemyData;
            case 'enemy_types':
                return enemyType;
            case 'playerData':
                return playerData;
            case 'races':
                return race;
            case 'weapon_category':
                return weapon_category;
            case 'weapon_material':
                return weapon_material;
            case 'weapons':
                return weapons;
            case 'armor_category':
                return armor_category;
            case 'armor_material':
                return armor_material;
            case 'armors':
                return armors;
            case 'shield_category':
                return shield_category;
            case 'shield_material':
                return shield_material;
            case 'shields':
                return shields;
            case 'potions':
                return potions;
            case 'magical_damage':
                return MagicalDamage;
            case 'physical_damage':
                return PhysicalDamage;
            default:
                throw new Error(`Fichier de données inconnu: ${file_name}`);
        }
    }
}





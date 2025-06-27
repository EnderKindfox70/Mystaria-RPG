import { FileDataLoader } from './fileDataLoader.js';
import WeaponCategory from '../systems/items/WeaponCategory.js';
import WeaponMaterial from '../systems/items/WeaponMaterial.js';
import Weapon from '../systems/items/Weapon.js';

import ArmorCategory from '../systems/items/ArmorCategory.js';
import ArmorMaterial from '../systems/items/ArmorMaterial.js'; 
import Armor from '../systems/items/Armor.js';

import ShieldCategory from '../systems/items/ShieldCategory.js';
import ShieldMaterial from '../systems/items/ShieldMaterial.js';
import Shield from '../systems/items/Shield.js';

import Potion from '../systems/items/Potion.js';
import PhysicalDamage from '../systems/damage/PhysicalDamage.js';


export default class ItemManager 
{
    static async init() 
    {
        const weapon_category = await FileDataLoader.loadData('weapon_category');
        const weapon_material = await FileDataLoader.loadData('weapon_material');
        const weapon  = await FileDataLoader.loadData('weapons');

        const armor_category = await FileDataLoader.loadData('armor_category');
        const armor_material = await FileDataLoader.loadData('armor_material');
        const armor = await FileDataLoader.loadData('armors');

        const shield_category = await FileDataLoader.loadData('shield_category');
        const shield_material = await FileDataLoader.loadData('shield_material');
        const shield = await FileDataLoader.loadData('shields');

        const potion = await FileDataLoader.loadData('potions');
        
        
        
        for(const item_data of weapon_category) 
        {
            let weapon_damage = PhysicalDamage.list.find(dmg => dmg.id === item_data.damage_type)
            new WeaponCategory(item_data.id, item_data.name, item_data.damage_type, item_data.range, item_data.handling, item_data.specialization_attribute, item_data.damage_attribute);
        }
        for(const item_data of weapon_material) 
        {
            new WeaponMaterial(item_data.id, item_data.name,item_data.stats_modifier)
        }
        for(const item_data of weapon) 
        {
            let weapon_material = WeaponMaterial.list.find(mat => mat.id === item_data.weapon_material);
            let weapon_category = WeaponCategory.list.find(cat => cat.id === item_data.weapon_category);
            new Weapon(item_data.id,item_data.name,item_data.description,null,false,weapon_category,weapon_material,item_data.min_dmg,item_data.max_dmg)
        }
        for(const item_data of armor_category) 
        {
            new ArmorCategory(item_data.id, item_data.name,item_data.proficiency_penalty);
        }
        for(const item_data of armor_material) 
        {
            new ArmorMaterial(item_data.id, item_data.name, item_data.defense_modifier, item_data.magic_def_modifier)
        }
        for(const item_data of armor) 
        {
            let armor_material = ArmorMaterial.list.find(mat => mat.id === item_data.armor_material);
            let armor_category = ArmorCategory.list.find(cat => cat.id === item_data.armor_category);
            new Armor(item_data.id,item_data.name,item_data.description,null,false,0,item_data.physical_defense,item_data.magic_defense,armor_category,armor_material,item_data.slot);
        }
        for(const item_data of shield_category) 
        {
            new ShieldCategory(item_data.id,item_data.scale_attribute,item_data.base_weight,item_data.guard_bonus)
        }
        for(const item_data of shield_material) 
        {
            new ShieldMaterial(item_data.id, item_data.name,item_data.magical_res_modifier,item_data.physical_res_modifier,item_data.weight_modifier);
        }
        for(const item_data of shield) 
        {
            let shield_material = ShieldMaterial.list.find(mat => mat.id === item_data.shield_material);
            let shield_category = ShieldCategory.list.find(cat => cat.id === item_data.shield_category);
            new Shield(item_data.id, item_data.name, null,false,shield_category,shield_material)
        }
        for(const item_data of potion) 
        {
            new Potion(item_data.id, item_data.name,null,null,false,null,item_data.success,item_data.duration,item_data.weight)
        }

        console.log(WeaponCategory.list);
        console.log(WeaponMaterial.list);
        console.log(Weapon.list);

        console.log(ArmorCategory.list);
        console.log(ArmorMaterial.list);    
        console.log(Armor.list);  
        
        console.log(ShieldCategory.list);
        console.log(ShieldMaterial.list);
        console.log(Shield.list);

        console.log(Potion.list);
    }
}

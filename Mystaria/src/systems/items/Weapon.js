import Item from './Item.js';
export default class Weapon extends Item 
{
    static list = [];
    constructor(id, name, description, icon, stackable = false, weaponCategory, weaponMaterial,damage_min, damage_max, weight)
    {
        super(id, name, description, icon, stackable,weight);
        this.weaponCategory = weaponCategory;
        this.weaponMaterial = weaponMaterial;
        this.damage_min = damage_min;
        this.damage_max = damage_max;
        Weapon.list.push(this);
    }
}
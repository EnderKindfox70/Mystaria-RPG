import Item from "./Item";

export default class Armor extends Item 
{
    static list = [];
    constructor(id, name, description, icon, stackable = false, weight,physical_defense,magical_resistance,armorCategory,armorMaterial, body_part)
    {
        super(id, name, description, icon, stackable,weight);
        this.physical_defense = physical_defense || 0; 
        this.magical_resistance = magical_resistance || 0; 
        this.body_part = body_part;
        this.armorCategory =armorCategory;
        this.armorMaterial = armorMaterial;
        Armor.list.push(this);
    }
} 
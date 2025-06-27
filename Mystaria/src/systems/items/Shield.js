import Item from "./Item";
export default class Shield extends Item
{
    static list = [];
    constructor(id, name, description, icon, stackable = false, physical_defense, magical_resistance,category, material, weight)
    {
        super(id, name, description, icon, stackable, weight);
        this.physical_defense = physical_defense || 0; 
        this.magical_resistance = magical_resistance || 0; 
        this.category = category;
        this.material = material;
        Shield.list.push(this);
    }
}
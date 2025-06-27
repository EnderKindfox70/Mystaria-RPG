export default class WeaponCategory 
{
    static list = []
    constructor( id, name, damage_type, range, handling, specialization_attribute, damage_attribute ) 
     {
        this.id = id;
        this.name = name;
        this.damage_type = damage_type;
        this.range = range;
        this.handling = handling;
        this.specialization_attribute = specialization_attribute;
        this.damage_attribute = damage_attribute;
        WeaponCategory.list.push(this);
    }
}

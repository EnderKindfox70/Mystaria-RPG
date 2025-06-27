export default class WeaponMaterial
{ 
    static list = [];
    constructor( id, name, stats_modifier ) 
     {
        this.id = id;
        this.name = name;
        this.stats_modifier = stats_modifier;
        WeaponMaterial.list.push(this);
    }
}

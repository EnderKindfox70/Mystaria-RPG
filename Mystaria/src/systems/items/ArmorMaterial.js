export default class ArmorMaterial
{ 
    static list = [];
    constructor( id, name,defense_modifier, magic_def_modifier ) 
     {
        this.id = id;
        this.name = name;
        this.defense_modifier = defense_modifier;
        this.magic_def_modifier = magic_def_modifier;
        ArmorMaterial.list.push(this);
    }
}

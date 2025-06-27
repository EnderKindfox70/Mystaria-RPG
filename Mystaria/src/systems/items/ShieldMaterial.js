export default class ShieldMaterial
{ 
    static list = [];
    constructor({ id, name,physical_res_modifier, magical_res_modifier,weight_modifier }) 
     {
        this.id = id;
        this.name = name;
        this.physical_res_modifier = physical_res_modifier;
        this.magical_res_modifier = magical_res_modifier;
        this.weight_modifier = weight_modifier;
        ShieldMaterial.list.push(this);

    }

}

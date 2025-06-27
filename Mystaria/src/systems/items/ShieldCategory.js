export default class ShieldCategory
{
    static list = [];
    constructor(id,name,scale_attribute,base_weight,guard_bonus)
    {
        this.id = id;
        this.name = name;
        this.scale_attribute = scale_attribute;
        this.base_weight = base_weight;
        this.guard_bonus = guard_bonus;
        ShieldCategory.list.push(this);
    }
}

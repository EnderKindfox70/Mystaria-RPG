export default class ArmorCategory
{
    static list = [];
    constructor(id, name, proficiency_penalty)
    {
        this.id = id;
        this.name = name;
        this.proficiency_penalty = proficiency_penalty;
        ArmorCategory.list.push(this);
    }
}
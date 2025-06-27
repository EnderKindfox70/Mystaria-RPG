import Item from "./Item";

export default class Potion extends Item
{
    static list = [];
    constructor(id, name, description, icon, stackable = false, effect,success, duration,weight = 0.1)
    {
        super(id, name, description, icon, stackable,weight);
        this.effect = effect || null;
        this.duration = duration || 0;
        Potion.list.push(this);
    }
}
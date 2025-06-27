import Magic from './Magic.js';

export default class ElementalMagic extends Magic
{
    static list = []
    constructor(id,name)
    {
        super(id, name);
        ElementalMagic.list.push(this);

    }
}
import Magic from './Magic.js';

export default class SoulMagic extends Magic
{
    static list = []
    constructor(id,name)
    {
        super(id, name);
        SoulMagic.list.push(this);
    }
}
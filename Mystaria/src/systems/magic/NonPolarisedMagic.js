import Magic from './Magic.js';

export default class NonPolarisedMagic extends Magic
{
    static list = []
    constructor(id,name)
    {
        super(id, name);
        NonPolarisedMagic.list.push(this);
    }

    static getlist()
    {
        return NonPolarisedMagic.list;
    }
}
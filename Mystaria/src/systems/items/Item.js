import {FileDataLoader} from '../../utils/fileDataLoader.js';
export default class Item 
{
    constructor(id, name, description, icon, stackable= false, weight = 0)
    {
        this.id = id; 
        this.name = name; 
        this.description = description; 
        this.icon = icon; 
        this.stackable = stackable;
        this.weight = weight;
    }

        static async init() 
        {
            const item_data = await FileDataLoader.loadData('items');
            console.log(item_data);
        }
}
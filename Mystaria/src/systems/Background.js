import { FileDataLoader } from '../utils/fileDataLoader';
export default class Background
{
    static list = [];

    constructor(id, name, gold, skills, equipment)
    {
        this.id = id;
        this.name = name;
        this.gold = gold;
        this.skills = skills;
        this.equipment = equipment;
        Background.list.push(this);
    }

    static async init()
    {
        const background_data = await FileDataLoader.loadData('backgrounds');
        for (const bg of background_data)
        {
            new Background(bg.id, bg.name, bg.gold, bg.skills, bg.equipment);
        }
        console.log(Background.list);
    }
    

}
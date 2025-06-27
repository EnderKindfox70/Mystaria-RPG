import { FileDataLoader } from '../utils/fileDataLoader';
export default class Race 
{
    static list = [];
    
    constructor(id, name, description, attributes, parentRace = null) 
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.attributes = attributes;
        this.parentRace= parentRace;
        Race.list.push(this);
    }

    static async init() 
    {
        const races_data = await FileDataLoader.loadData('races');
        for (const race of races_data)
        {
            let object_race = new Race(race.id, race.name, race.description, race.attributes, race.parentRace);

            if(race.sub_races.length > 0)
            {
                let i = 0;
                for(const sub_race of race.sub_races)
                {
                    new Race(parseInt(race.id+''+i), sub_race.name, sub_race.description, race.attributes, object_race);
                    i++
                }
            }
        }
        console.log(Race.list);
    }
} 
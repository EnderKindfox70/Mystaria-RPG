import { FileDataLoader } from '../utils/fileDataLoader';
export default class EnemyType 
{
    static list = [];
    constructor(id, name, weakness, resistance)
    {
        this.id =id;
        this.name = name;
        this.weakness = weakness;
        this.resistance = resistance;
        EnemyType.list.push(this);
    }

    static async init()
    {
        const enemyType_data = await FileDataLoader.loadData('enemy_types');

        for(const enemyType of enemyType_data)
        {
            new EnemyType(enemyType.id, enemyType.name, enemyType.weakness, enemyType.resistance);
        }
        console.log(EnemyType.list);

    }
}
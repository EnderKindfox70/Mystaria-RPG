import { FileDataLoader } from "../utils/fileDataLoader";
import PhysicalDamage from "./damage/PhysicalDamage.js";
import MagicalDamage from "./damage/MagicalDamage.js";

export default class EnemyData 
{
    static list = [];
    constructor(id, name, description,enemy_type,damage_type,stats,skills,exp,loot)
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.enemy_type = enemy_type; 
        this.damage_type = damage_type; 
        this.stats = stats;
        this.skills = skills;
        this.exp = exp; 
        this.loot = loot
        EnemyData.list.push(this);
    }

    attack(target,currents_stats)
    {
        const damage = 
        {
            type: this.damage_type,
            value: currents_stats.atk
        };
        console.log(`${this.name} attaque ${target.name} et inflige ${damage.value} de dégâts ${damage.type.name} ! Il reste ${target.currents_stats.hp} points de vie à ${target.name}.`);
        target.takeDamage(damage);
    }

    takeDamage(damage,currents_stats)
    {
        if(damage.type instanceof PhysicalDamage) 
        {
            currents_stats.hp -= damage.value - currents_stats.phy_def;
        }
        else if(damage.type instanceof MagicalDamage) 
        {
            currents_stats.hp -= damage.value - currents_stats.mag_def;
        }
        else 
        {
            console.error('Unknown damage type:', damage.type);
        }
    }

    isAlive()
    {
        return this.currents_stats.hp > 0;
    }

    static async init() 
    {

        const enemy_data = await FileDataLoader.loadData('enemies');
        for(const enemy of enemy_data)
        {
            // Recherche dans les deux listes de dégâts
            let damage_type = null;
            
            // Vérifie d'abord dans la liste des dégâts physiques
            if (enemy.damage_type) {
                damage_type = PhysicalDamage.list.find(d => d.id === enemy.damage_type);
                if (!damage_type) {
                    // Si pas trouvé dans les dégâts physiques, cherche dans les dégâts magiques
                    damage_type = MagicalDamage.list.find(d => d.id === enemy.damage_type);
                }
            }
            
            if (!damage_type) {
                console.warn(`Damage type not found for enemy ${enemy.name}, defaulting to physical`);
                damage_type = PhysicalDamage.list[0]; // Type par défaut
            }

            new EnemyData(
                enemy.id,
                enemy.name,
                enemy.description,
                enemy.enemy_type,
                damage_type,
                enemy.stats,
                enemy.skills,
                enemy.exp,
                enemy.loot
            );
        }
        console.log("Enemy list:", EnemyData.list);
    }
}
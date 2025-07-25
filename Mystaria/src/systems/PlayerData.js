import ElementalMagic from "./magic/ElementalMagic";
import NonPolarisedMagic from "./magic/NonPolarisedMagic";
import PhysicalDamage from "./damage/PhysicalDamage";
import MagicalDamage from "./damage/MagicalDamage";

export default class PlayerData
{
    constructor(name,gender,playerClass,race,background,magic = [],stats,currents_stats={hp:0,mana:0,experience:0}, attributes, attributes_modifier = {strength:0,constitution:0 ,dexterity:0,intelligence:0,wisdom:0,charisma:0} ,skills, spells, inventory, quests, achievements,level, experience, gold,weight)
    {
        this.name = name;
        this.gender = gender;
        this.playerClass = playerClass; // Player class object
        this.race = race;
        this.magic = magic; // Magic object
        this.background = background; // Background object
        this.stats = stats; // Stats object
        this.currents_stats = currents_stats;
        this.attributes = attributes; // Attributes object
        this.attributes_modifier = attributes_modifier
        this.skills = skills; // Skills object
        this.spells = spells; // Spells object
        this.inventory = inventory; // Inventory object
        this.quests = quests; // Quests object
        this.achievements = achievements;
        this.level = level; // Player level
        this.experience = experience; // Player experience points
        this.gold = gold; // Player gold
        this.weight = weight;
    }

    static getModifier(value) 
    {
        if (value >= 1 && value <= 3) return -4;
        if (value >= 4 && value <= 5) return -3;
        if (value >= 6 && value <= 7) return -2;
        if (value >= 8 && value <= 9) return -1;
        if (value >= 10 && value <= 11) return 0;
        if (value >= 12 && value <= 13) return 1;
        if (value >= 14 && value <= 15) return 2;
        if (value >= 16 && value <= 17) return 3;
        if (value >= 18 && value <= 20) return 4;
        return 0;
    }

    attack(target)
    {
        const weapon = this.inventory.equipment.right_hand;
        if(weapon !== null)
        {

        }
        else 
        {
            let roll_accuracy = Math.floor(Math.random() * 20) + 1;
            roll_accuracy += this.attributes_modifier.dexterity;

            console.log(`Roll d20: ${roll_accuracy}`);
            console.log(`Player Accuracy: ${this.playerClass.accuracy}`);
            if(roll_accuracy >= this.playerClass.accuracy)
            {
                const damage= {type: PhysicalDamage.list[1] , value: this.stats.phy_atk}
                target.enemyData.takeDamage(damage,target.currents_stats);
                console.log(`${this.name} attaque ${target.enemyData.name} avec ses poings et inflige ${damage.value} de dégats ${damage.type.name} ! Il reste ${target.currents_stats.hp} points de vie à ${target.enemyData.name}.`);
            }
            else
            {
                console.log(`${this.name} rate son attaque contre ${target.enemyData.name}.`);
            }

        }
    }

    takeDamage(damage)
    {
        console.log(damage);
        if(damage.type instanceof PhysicalDamage)
        {
            this.currents_stats.hp -= damage.value - this.stats.phy_def;
        }
        else if(damage.type instanceof MagicalDamage)
        {
            this.currents_stats.hp -= damage.value - this.stats.mag_def;
        }
        else 
        {
            console.error('Unknown damage type:', damage.type);
        }
    }

    expGain(experience)
    {
        this.currents_stats.experience += experience;
        if(this.currents_stats.experience >= this.experience)
        {
            this.levelUp();
        }
        
    }

    levelUp()
    {
        const previousLevel = this.level;
        this.level++;
        
        this.experience += Math.floor(this.experience * 0.1); // Augmente l'expérience requise pour le prochain niveau
        this.currents_stats.experience = this.currents_stats.experience - this.experience;
        console.log(`${this.name} a atteint le niveau ${this.level} !`);
        console.log(`stats avant la mise à niveau:`, this.stats);
        for (const stat in this.stats) 
        {
            if (stat === 'phy_def' || stat === 'mag_def') {
                continue; // Conserve les valeurs existantes pour phy_def et mag_def
            }
            this.stats[stat] -= this.playerClass.stats[previousLevel - 1][stat];
            this.stats[stat] += this.playerClass.stats[this.level - 1][stat];
        }
        console.log(`Nouveaux stats:`, this.stats);
        console.log(`Nouveaux stats courants:`, this.currents_stats);
        this.totalWeightUpdate();
    }

    updateStatsAttribute()
    {
        
        const statAdjustments = 
        {
            hp: this.attributes.constitution,
            phy_atk: this.attributes_modifier.strength ? this.attributes_modifier.strength * 2 : 0, 
            mag_atk: this.attributes_modifier.intelligence ?this.attributes_modifier.intelligence * 2:0,
            mana: this.attributes_modifier.wisdom ? this.attributes_modifier.wisdom * 5 : 0,
            speed: this.attributes_modifier.dexterity ? this.attributes_modifier.dexterity * 2 : 0
        };
        console.log("Stat Adjustments:", statAdjustments);

        for (const [stat, adjustment] of Object.entries(statAdjustments)) 
        {

            this.stats[stat] += adjustment;
            if(this.stats[stat] <= 0)
            {
                this.stats[stat] = 1;
            }
        }

    }

    updateAttributesModifier() 
    {
        for (const key in this.attributes_modifier) 
        {
            if (this.attributes.hasOwnProperty(key)) {
                this.attributes_modifier[key] = PlayerData.getModifier(this.attributes[key]);
            }
        }
        this.totalWeightUpdate();

    }

    totalWeightUpdate()
    {
        this.weight = Math.max(1, 10 + (this.attributes_modifier.strength ? this.attributes_modifier.strength * 2 : 0));
    }

    weightUpdate()
    {

    }

     toJSON() 
     {
        return {
            name: this.name,
            gender: this.gender,
            playerClass: this.playerClass,
            race: this.race,
            background: this.background,
            magic: [...this.magic],
            stats: {...this.stats},
            currents_stats: {...this.currents_stats},
            attributes: {...this.attributes},
            attributes_modifier: {...this.attributes_modifier},
            skills: [...this.skills],
            spells: [...this.spells],
            inventory: {
                equipment: {...this.inventory.equipment},
                bag: [...this.inventory.bag]
            },
            quests: [...this.quests],
            achievements: [...this.achievements],
            level: this.level,
            experience: this.experience,
            gold: this.gold,
            weight: this.weight
        };
    }

    static fromJSON(data) 
    {
        return new PlayerData(
            data.name,
            data.gender,
            data.playerClass,
            data.race,
            data.background,
            data.magic || [],
            data.stats,
            data.currents_stats || {hp: 0, mana: 0, experience: 0},
            data.attributes,
            data.attributes_modifier || {strength: 0, constitution: 0, dexterity: 0, intelligence: 0, wisdom: 0, charisma: 0},
            data.skills || [],
            data.spells || [],
            data.inventory || {equipment: {head: null, torso: null, legs: null, feet: null, right_hand: null, left_hand: null}, bag: []},
            data.quests || [],
            data.achievements || [],
            data.level,
            data.experience,
            data.gold,
            data.weight
        );
    }

    static init(playerData)
    {

        // -------------- inventory set --------------
        playerData.inventory = {equipment:{head:null,torso:null,legs:null,feet:null,right_hand:null,left_hand:null}, bag:[]}
        //-------------- Attribute set --------------
        let parent_strength = 0;
        let parent_constitution = 0;
        let parent_dexterity = 0;
        let parent_intelligence = 0;
        let parent_wisdom = 0;
        let parent_charisma = 0;
        if(playerData.race.parentRace !== null)
        {
            parent_strength = playerData.race.parentRace.attributes.strength
            parent_constitution = playerData.race.parentRace.attributes.constitution; 
            parent_dexterity = playerData.race.parentRace.attributes.dexterity;
            parent_intelligence =  playerData.race.parentRace.attributes.intelligence;
            parent_wisdom = playerData.race.parentRace.attributes.wisdom;
            parent_charisma =  playerData.race.parentRace.attributes.charisma;
        }

        playerData.attributes.strength += playerData.race.attributes.strength + parent_strength ;
        playerData.attributes.constitution += playerData.race.attributes.constitution + parent_constitution;
        playerData.attributes.dexterity += playerData.race.attributes.dexterity + parent_dexterity;
        playerData.attributes.intelligence += playerData.race.attributes.intelligence + parent_intelligence;
        playerData.attributes.wisdom += playerData.race.attributes.wisdom + parent_wisdom;
        playerData.attributes.charisma += playerData.race.attributes.charisma + parent_charisma;

        //-------------- Skill attribution -------------------

        for(const background_skill of playerData.background.skills)
        {
            let skill = playerData.skills.find(skill => skill.id === background_skill);
            skill.score++;
        }


        // -------------- Experience & level set -------------

        playerData.level = 1;
        playerData.experience = 10;
        playerData.currents_stats.experience = 0;

        // -------------- stats attribution -------------
        playerData.stats = {hp:0,phy_atk:0,mag_atk:0,phy_def:0,mag_def:0,mana:0,speed:0};

        playerData.stats.hp += playerData.playerClass.stats[0].hp;
        playerData.stats.phy_atk += playerData.playerClass.stats[0].phy_atk;
        playerData.stats.mag_atk += playerData.playerClass.stats[0].mag_atk;
        playerData.stats.mana += playerData.playerClass.stats[0].mana;
        playerData.stats.speed += playerData.playerClass.stats[0].speed;



        //-------------- Money attribution --------------
        let money = Math.floor(Math.random()*100 - 0) + playerData.background.gold;
        playerData.gold = money;
        // -------------- magic attribution --------------
        const weights = [0.5, 4, 1, 0.5];
        const total = weights.reduce((a, b) => a + b, 0);
        let r = Math.random() * total;
        let number_of_magic = 0;
        for (let i = 0; i < weights.length; i++) 
        {
            if (r < weights[i]) 
            {
                number_of_magic = i;
                break;
            }
            r -= weights[i];
        }

        for(let i = 0; i< number_of_magic; i++)
        {
            let magic;
            let duplicate;
            do 
            {
                const index = Math.floor(Math.random() * ElementalMagic.list.length);
                magic = ElementalMagic.list[index];
                duplicate = playerData.magic.some(m => m.magic.id === magic.id);
            } 
            while (duplicate);
            if (!duplicate) 
            {
                playerData.magic.push({ magic: magic, discovered: false });
            }
        }

        if(number_of_magic !== 0)
        {
            playerData.magic.push({magic:NonPolarisedMagic.list[0],discovered: false},{magic: NonPolarisedMagic.list[1],discovered:false})
        }
        return new PlayerData(
            playerData.name,
            playerData.gender,
            playerData.playerClass,
            playerData.race,
            playerData.background,
            playerData.magic,
            playerData.stats,
            playerData.currents_stats,
            playerData.attributes,
            {strength:0, constitution:0, dexterity:0, intelligence:0, wisdom:0, charisma:0},
            playerData.skills,
            playerData.spells,
            playerData.inventory,
            playerData.quests,
            playerData.achievements,
            playerData.level,
            playerData.experience,
            playerData.gold,
            playerData.weight
        )
    }
}


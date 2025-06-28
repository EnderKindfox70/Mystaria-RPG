export default class PlayerData
{
    constructor(gender,playerClass,race,background,magic = [],stats, attributes, skills, spells, inventory, equipment, quests, achievements,level, experience, gold)
    {
        this.gender = gender;
        this.playerClass = playerClass; // Player class object
        this.race = race;
        this.magic = magic; // Magic object
        this.background = background; // Background object
        this.stats = stats; // Stats object
        this.attributes = attributes; // Attributes object
        this.skills = skills; // Skills object
        this.spells = spells; // Spells object
        this.inventory = inventory; // Inventory object
        this.equipment = equipment; // Equipment object
        this.quests = quests; // Quests object
        this.achievements = achievements;
        this.level = level; // Player level
        this.experience = experience; // Player experience points
        this.gold = gold; // Player gold
    }
}
export default class Party {
    constructor(player, members = []) {
        this.player = player; // Instance du joueur
        this.members = members; // Liste des membres de l'équipe (instances d'entités)
    }

    addMember(member) {
        if (this.members.length >= 4) {
            console.warn("L'équipe est déjà complète !");
            return;
        }
        this.members.push(member);
        console.log(`${member.name} a rejoint l'équipe !`);
    }

    removeMember(memberName) {
        this.members = this.members.filter(member => member.name !== memberName);
        console.log(`${memberName} a quitté l'équipe.`);
    }

    getAllMembers() {
        return [this.player, ...this.members];
    }

    getMemberByName(name) 
    {
        return this.getAllMembers().find(member => member.name === name);
    }

    update() {
        // Met à jour le joueur et les membres de l'équipe
        this.player.update();
        this.members.forEach(member => member.update());
    }

    isAlive() {
        // Vérifie si au moins un membre de l'équipe est encore en vie
        return this.getAllMembers().some(member => member.playerData.hp > 0);
    }
}
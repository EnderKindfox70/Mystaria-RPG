import Entity from "./Entity";

export default class PartyMember extends Entity 
{
    constructor(scene, x, y, texture, frame, name, playerData)
    {
        super(scene, x, y, texture, frame);
        this.name = name;
        this.playerData = playerData || {};
        this.setOrigin(0.5, 0.5);
        this.setScale(0.5);
        this.setDepth(1);
    }
}
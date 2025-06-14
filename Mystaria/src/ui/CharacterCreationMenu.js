import { Scene } from "phaser";

export class CharacterCreationMenu extends Scene
{
    constructor ()
    {
        super('CharacterCreationMenu');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x000000);

        this.add.text(400, 300, 'Character Creation', {
            fontFamily: 'Arial Black', fontSize: 48, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);

    }

    
}
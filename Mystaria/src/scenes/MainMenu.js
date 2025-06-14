import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.scale.startFullscreen();

        this.add.image(512, 384, 'background');
        this.add.text(512, 300, 'MYSTARIA RPG', {
            fontFamily: 'Arial Black', fontSize: 50, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const playButton = this.add.text(512, 520, 'Nouvelle Partie', {
            fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5).setInteractive({useHandCursor: true});
    
        playButton.on('pointerdown', () => {
            this.scene.start('Game');
        });
        playButton.on('pointerout', () => 
        {
            playButton.setStyle({ fill: '#ffffff' });
            this.tweens.add({
            targets: playButton,
            duration: 500,
            ease: 'Sine.easeInOut',
            scale: 1
        });
        });
        playButton.on('pointerover', () => 
        {
            playButton.setStyle({ fill: '#ff0' });
            this.tweens.add({
                targets: playButton,
                duration: 500,
                ease: 'Sine.easeInOut',
                scale: 1.1
            });
           
        });

        const optionsButton = this.add.text(512, 560, 'Options', {
            fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5).setInteractive({useHandCursor: true}).on('pointerdown', () => {
            this.scene.start('Options');
        });
        optionsButton.on('pointerout', () => {
            optionsButton.setStyle({ fill: '#ffffff' });
        });
        optionsButton.on('pointerover', () => {
            optionsButton.setStyle({ fill: '#ff0' });
        });



    }
}

import { Scene } from 'phaser';
import { SaveSystem } from '../utils/SaveSystem';

export class MainMenu extends Scene
{
    constructor ()
    {
        super({ key: 'MainMenu', active: true });
    }

    async create ()
    {

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
            this.scene.start('CharacterCreationMenu');
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
        try 
        {
            const saves = await SaveSystem.getAllSaves();
            console.log('Available saves:', saves);

            if (saves && saves.length > 0) 
            {
                this.loadButton = this.add.text(512, 560, 'Charger Partie', {
                    fontFamily: 'Arial Black', 
                    fontSize: 24, 
                    color: '#ffffff',
                    stroke: '#000000', 
                    strokeThickness: 4,
                    align: 'center'
                }).setOrigin(0.5)
                  .setInteractive({useHandCursor: true})
                  .on('pointerover', () => 
                    {
                    this.loadButton.setStyle({ fill: '#ff0' });
                    this.tweens.add(
                        {
                            targets: this.loadButton,
                            duration: 500,
                            ease: 'Sine.easeInOut',
                            scale: 1.1
                        });
                    })
                  .on('pointerout', () => {
                    this.loadButton.setStyle({ fill: '#ffffff' });
                    this.tweens.add({
                        targets: this.loadButton,
                        duration: 500,
                        ease: 'Sine.easeInOut',
                        scale: 1
                    });
                  })
                  .on('pointerdown', async () => {
                    try 
                    {
                        this.scene.launch('LoadSaveMenu');
                        this.scene.pause('MainMenu');
                    } 
                    catch (error) 
                    {
                        console.error('Failed to load game:', error);
                    }
                });

                optionsButton.setY(600);
            }
        } 
        catch (error) 
        {
            console.error('Failed to check saves:', error);
        }
    }
}

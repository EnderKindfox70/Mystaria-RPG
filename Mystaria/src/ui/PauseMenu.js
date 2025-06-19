import { Scene } from "phaser";

export class PauseMenu extends Scene 
{
    constructor() 
    {
        super('pauseMenu');
    }

    create() 
    {
        console.log('PauseMenu create');
        this.scene.bringToTop('pauseMenu');
        this.add.rectangle(512, 384, 1024, 768, 0x222244, 0.7).setOrigin(0.5);
        this.add.text(512, 300, 'Pause', { fontSize: '48px', color: '#fff' }).setOrigin(0.5);
        this.add.text(512, 400, 'Appuie sur ECHAP pour reprendre', { fontSize: '24px', color: '#fff' }).setOrigin(0.5);

        const resumeButton = this.add.text(512, 500, 'Reprendre', { 
            fontSize: '32px', 
            color: '#fff', 
            backgroundColor: '#444488', 
            padding: { x: 20, y: 10 } 
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => 
        {
            this.scene.stop('pauseMenu');
            this.scene.resume('Game');
        })
        .on('pointerover', () => resumeButton.setStyle({ backgroundColor: '#6666aa' }))
        .on('pointerout', () => resumeButton.setStyle({ backgroundColor: '#444488' }));
        
        const SaveButton = this.add.text(512, 600, 'Sauvegarder', { 
            fontSize: '32px', 
            color: '#fff', 
            backgroundColor: '#444488', 
            padding: { x: 20, y: 10 } 
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => 
        {
            this.scene.stop('pauseMenu');
            this.scene.stop('Game'); 
            this.scene.start('MainMenu'); 
        })
        .on('pointerover', () => SaveButton.setStyle({ backgroundColor: '#6666aa' }))
        .on('pointerout', () => SaveButton.setStyle({ backgroundColor: '#444488' }));
    
        const QuitButton = this.add.text(512, 700, 'Quitter', { 
            fontSize: '32px', 
            color: '#fff', 
            backgroundColor: '#444488', 
            padding: { x: 20, y: 10 } 
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => 
        {
            this.scene.stop('pauseMenu');
            this.scene.stop('Game'); 
            this.scene.start('MainMenu'); 
        })
        .on('pointerover', () => QuitButton.setStyle({ backgroundColor: '#6666aa' }))
        .on('pointerout', () => QuitButton.setStyle({ backgroundColor: '#444488' }));
    }

    

    
}
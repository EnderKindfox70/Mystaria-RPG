import BaseBattleScene from "./BaseBattleScene";

export default class ForestBattleScene extends BaseBattleScene
{
    constructor()
    {
        super('ForestBattleScene');
    }

    preload()
    {
        this.load.image('forestBattleBackground', './assets/forestBackground.png');
    }

    create()
    {
        super.create();
        this.add.image(512, 384, 'forestBattleBackground').setAlpha(0.5);
    }
}
import PlayerData from "../systems/PlayerData";

export const GameSession = 
{
    currentSaveId: null,
    isSaving: false,
    gameData: 
    {
        position: { x: 0, y: 0,scene:''},
        playerData: null,
        partyMembers: [],   

    },


    getSaveData() 
    {
        const saveData = {
            id: this.currentSaveId,
            gameData: 
            {
                position: { ...this.gameData.position },
                playerData: this.gameData.playerData,
                partyMembers: [...(this.gameData.partyMembers || [])]
            },
        };
        // Ne convertir en JSON que si on sauvegarde réellement le jeu
        if (this.isSaving) {
            saveData.gameData.playerData = this.gameData.playerData.toJSON();
        }
        return saveData;
    },

    loadSaveData(save) 
    {
        this.currentSaveId = save.id || null;
        this.gameData = 
        {
            position: { ...(save.gameData?.position || { x: 0, y: 0, scene: '' }) },
            partyMembers : []
        };
        this.gameData.playerData = PlayerData.fromJSON(save.gameData.playerData);

    }
}


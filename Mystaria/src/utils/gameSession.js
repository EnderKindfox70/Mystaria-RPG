export const GameSession = 
{
    currentSaveId: null,
    saveData: 
    {
        position: { x: 0, y: 0,scene:''},
        playerData: {}
    },

    getSaveData() 
    {
        return {
            id: this.currentSaveId,
            character: 
            {
                position: this.saveData.position,
                playerData: this.saveData.playerData
            }
        }
    },

    loadSaveData(newSave) 
    {
        this._currentSaveId = newSave.id || null;
        this._saveData = {
            position: { ...(newSave.character?.position || { x: 0, y: 0, scene: '' }) },
            playerData: { ...(newSave.character?.playerData || {}) }
        };
    }
}


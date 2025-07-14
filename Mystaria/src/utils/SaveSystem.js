export class SaveSystem {
    static dbName = 'MystariaRPG';
    static storeName = 'gameData';
    static version = 1;
    static db = null;

    static async initialize() {
        if (this.db) return this.db;
        
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onerror = () => {
                console.error("Database error:", request.error);
                reject(request.error);
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                // Create the object store if it doesn't exist
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: 'id' });
                    console.log('Object store created successfully');
                }
            };
        });
    }
    static async deleteSave(saveId) {
        try {
            const db = await this.initialize();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([this.storeName], 'readwrite');
                const store = transaction.objectStore(this.storeName);
                const request = store.delete(saveId);

                request.onsuccess = () => {
                    console.log(`Save with id ${saveId} deleted successfully`);
                    resolve(true);
                };
                request.onerror = () => {
                    console.error(`Failed to delete save with id ${saveId}:`, request.error);
                    reject(request.error);
                };
            });
        } catch (error) {
            console.error('Delete failed:', error);
            throw error;
        }
    }
    static async saveGame(saveData) 
    {
        try 
        {
            const db = await this.initialize();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([this.storeName], 'readwrite');
                const store = transaction.objectStore(this.storeName);

                // Si saveData contient un id, on l'utilise pour écraser la sauvegarde existante
                const save = 
                {
                    ...saveData,
                    id: saveData.id || `save_${Date.now()}`,
                    created: saveData.created || Date.now(),
                    lastModified: Date.now()
                };

                console.log(save);
                const request = store.put(save);
                request.onsuccess = () => {
                    console.log('Save created or updated:', save.id);
                    resolve(save.id);
                };
                request.onerror = () => reject(request.error);
            });
        } 
        catch(error) 
        {
            console.error('Save failed:', error);
            throw error;
        }
    }

    static async loadGame(saveId) {
        try 
        {
            const db = await this.initialize();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([this.storeName], 'readonly');
                const store = transaction.objectStore(this.storeName);
                
                // Si aucun saveId n'est fourni, on prend la dernière sauvegarde
                const request = saveId 
                    ? store.get(saveId)  // Charge une sauvegarde spécifique
                    : store.getAll().onsuccess = (event) => {
                        // Trie par date et prend la plus récente
                        const saves = event.target.result;
                        resolve(saves.sort((a, b) => b.created - a.created)[0]);
                    };

                if(saveId) 
                {
                    request.onsuccess = () => {
                        const save = request.result;
                        if (!save) {
                            console.warn(`Save with id ${saveId} not found`);
                        }
                        resolve(save);
                    };
                    request.onerror = () => reject(request.error);
                }
            });
        } catch (error) {
            console.error('Load failed:', error);
            return null;
        }
    }

    static async getAllSaves() {
        try {
            const db = await this.initialize();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([this.storeName], 'readonly');
                const store = transaction.objectStore(this.storeName);
                const request = store.getAll();

                request.onsuccess = () => {
                    const saves = request.result;
                    console.log(`Found ${saves.length} saves`);
                    resolve(saves);
                };
                request.onerror = () => reject(request.error);
            });
        } catch (error) {
            console.error('Failed to get saves:', error);
            return [];
        }
    }
}
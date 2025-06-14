import Player from "../entities/Player";

/**
 * Lit et normalise les entrées clavier pour le jeu.
 * @param {KeyboardEvent} event - L'événement clavier.
 * @returns {string|null} - La commande normalisée ou null si non reconnue.
 */
export function lireInput(event) {
    switch (event.key.toLowerCase()) {
        case 'z':
        case 'arrowup':
            return 'up';
        case 's':
        case 'arrowdown':
            return 'down';
        case 'q':
        case 'arrowleft':
            return 'left';
        case 'd':
        case 'arrowright':
            return 'right';
        case ' ':
            return 'action';
        case 'enter':
            return 'enter';
        case 'escape':
            return 'pause';
        default:
            return null;
    }
}
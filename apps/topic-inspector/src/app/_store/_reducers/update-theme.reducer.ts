import { PayloadAction } from '@reduxjs/toolkit';
import { StoreAction } from '../../_enums/store-action';
import { ThemeMode } from '../../_enums/theme-mode';

export type setThemeModeReducerPayload = PayloadAction<ThemeMode>;

const DEFAULT_STATE = ThemeMode.dark;
/**
 * Sets the current theme mode
 *
 * @param state the current store state
 * @param action the action to execute
 * @returns {object} the updated state
 */
export function updateThemeReducer(
    state = DEFAULT_STATE,
    action: setThemeModeReducerPayload
) {
    if (action.type === StoreAction.SET_THEME_MODE) {
        return action.payload;
    }

    return state;
}

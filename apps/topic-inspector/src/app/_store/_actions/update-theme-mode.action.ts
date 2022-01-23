import { StoreAction } from '../../_enums/store-action';
import { GlobalStore } from '../store';
import { setThemeModeReducerPayload } from '../_reducers/update-theme.reducer';

/**
 * Sets the current theme mode
 *
 * @param themeMode the themeMode to set
 * @returns {void}
 */
export function setThemeMode(
    themeMode: setThemeModeReducerPayload['payload']
): void {
    GlobalStore.dispatch<setThemeModeReducerPayload>({
        type: StoreAction.SET_THEME_MODE,
        payload: themeMode
    });
}

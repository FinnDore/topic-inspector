import { Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import InspectTopics from './features/inspect-topics/inspect-topics';
import { RootState } from './_store/store';
import classes from './app.module.scss';

export function App() {
    const selectKafkaLogDirs = useSelector(
        (state: RootState) => {
            return state.updateKafkaLogDirsReducer ?? null;
        },
        (a, b) => a === b
    );

    return (
        <>
            <header className={classes['header']}>
                <Paper variant="outlined" square>
                    Topic Inspector
                </Paper>
            </header>
            <Route
                path="/"
                exact
                render={() => (
                    <div>
                        <InspectTopics></InspectTopics>
                        {JSON.stringify(selectKafkaLogDirs, null, 2)}
                    </div>
                )}
            />
        </>
    );
}

export default App;

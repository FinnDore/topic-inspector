import { Button, IconButton, MenuItem, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import InspectTopics from './features/inspect-topics/inspect-topics';
import { RootState } from './_store/store';
import classes from './app.module.scss';
import GITHUB_MARK_DARK from '../assets/github-mark-dark.png';
const GITHUB_LINK = 'https://github.com/FinnDore/topic-inspector';

function Header() {
    return (
        <header className={classes['header']}>
            <h2>Topic Inspector</h2>
            <div className={classes['button-row']}>
                <Link to="/">
                    <Button>Inspect Topic</Button>
                </Link>
                <Link to="/help">
                    <Button>Help</Button>
                </Link>
                <Link to="/about">
                    <Button>About</Button>
                </Link>
                <Button
                    className={classes['icon-button']}
                    color="primary"
                    aria-label="Goto topic inspectors github"
                >
                    <a href={GITHUB_LINK}>
                        <img src={GITHUB_MARK_DARK} alt="Github mark"></img>
                    </a>
                </Button>
            </div>
        </header>
    );
}

export function App() {
    const selectKafkaLogDirs = useSelector(
        (state: RootState) => {
            return state.updateKafkaLogDirsReducer ?? null;
        },
        (a, b) => a === b
    );

    return (
        <>
            <Header></Header>
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
            <Route path="/about" exact render={() => <div>about</div>} />
            <Route path="/help" exact render={() => <div>help</div>} />
        </>
    );
}

export default App;

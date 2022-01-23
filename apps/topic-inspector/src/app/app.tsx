import { Route } from 'react-router-dom';
import InspectTopics from './features/inspect-topics/inspect-topics';
import { Header } from './header/header';
import classes from './app.module.scss';
/**
 * The app component
 *
 * @returns {object} the component
 */
export function App() {
    return (
        <div className={classes['container']}>
            <Header></Header>
            <Route
                path="/"
                exact
                render={() => <InspectTopics></InspectTopics>}
            />
            <Route path="/about" exact render={() => <div>about</div>} />
            <Route path="/help" exact render={() => <div>help</div>} />
        </div>
    );
}

export default App;

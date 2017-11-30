import {connect} from 'react-redux';
import {} from '../actions/index';

import App from './App';

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
    }
};

const mapDispatchToProps = (dispatch) => {
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer;

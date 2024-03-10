import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// TRAFFIC OFFICER
function* rootSaga() {

    yield takeEvery('FETCH_GIFS', fetchGifsSaga);
    yield takeEvery('FETCH_FAVORITES', fetchFavoritesSaga);
    yield takeEvery('FETCH_CATEGORIES', fetchCategoriesSaga);
    yield takeEvery('EDIT_CATEGORY', editCategorySaga);
    yield takeEvery('REMOVE_CATEGORY', removeCategorySaga);
    yield takeEvery('REMOVE_FROM_FAVORITES', removeFromFavoritesSaga);
    yield takeEvery('CREATE_CATEGORY', createCategorySaga);
    yield takeEvery('ADD_TO_FAVORITES', addToFavoritesSaga);
}



// SAGAS

function* createCategorySaga(action) {
    yield axios.post(`/api/categories/`, {name: action.payload});
    yield put({ type: 'FETCH_CATEGORIES' });
}

function* removeCategorySaga(action) {
    yield axios.delete(`/api/categories/${action.payload}`);
    yield put({ type: 'FETCH_CATEGORIES' });
}

function* editCategorySaga(action) {
    yield axios.put(`/api/categories/${action.payload[1]}`, {name: action.payload[0]});
    yield put({ type: 'FETCH_CATEGORIES' });
}

function* fetchGifsSaga(action) {
    const response = yield axios.get(`/api/giphy/${action.payload}`).catch((error) => {
        console.log(error);
    })
    yield put({ type: 'SET_GIFS', payload: response.data.data })
}

function* fetchFavoritesSaga(action) {
    const response = yield axios.get('/api/favorites', action.payload);
    yield put({ type: 'SET_FAVORITES', payload: response.data })

}

function* fetchCategoriesSaga(action) {
    const response = yield axios.get('/api/categories', action.payload);
    yield put({ type: 'SET_CATEGORIES', payload: response.data })
}

function* addToFavoritesSaga(action) {
    try {
        yield axios.post('/api/favorites', action.payload);
        yield put({type: 'FETCH_FAVORITES'})
    } catch(error) {
        console.log('Error adding to fave', error);
    }
}

function* removeFromFavoritesSaga(action) {
    try {
        yield axios.delete(`/api/favorites/${action.payload}`);
        yield put({type: "FETCH_FAVORITES"});
    } catch (error) {
        console.error("ERROR in store DELETE:", error);
    }
}

const sagaMiddleware = createSagaMiddleware();

// REDUCERS

const gifReducer = (state = [], action) => {
    if (action.type === 'SET_GIFS') {
        return action.payload;
    }
    return state;
}

const favoritesReducer = (state = [], action) => {
    if (action.type === 'SET_FAVORITES') {
        return action.payload;
    } 
    return state;
}

const categoriesReducer = (state = [], action) => {
    if (action.type === 'SET_CATEGORIES') {
        return action.payload;
    }
    return state;
}

// WALMART
const store = createStore(
    combineReducers({
        gifList: gifReducer,
        favoritesList: favoritesReducer,
        categoriesList: categoriesReducer
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);


export default store;
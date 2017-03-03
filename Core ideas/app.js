/*------------------------------------*\
  Action/Reducer
\*------------------------------------*/
var reducer = function (state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        case 'PLUS':
            return state + action.payload;
        case 'MINUS':
            return state + action.payload;
        default:
            return state;
    }
};
var incrementAction = {
    type: 'PLUS',
    payload: 7
};
var decrementAction = {
    type: 'MINUS',
    payload: 7
};
console.log('value from reducer', reducer(99, incrementAction)); //106
/*------------------------------------*\
  Storing our state
\*------------------------------------*/
//store - running the reducer and keeping the new state
var Store = (function () {
    // each store is tied to specific reducer
    function Store(reducer, intialState) {
        this.reducer = reducer;
        this._listeners = [];
        this._state = intialState;
    }
    Store.prototype.getState = function () {
        return this._state;
    };
    //dispatch takes an action, sends it to the reducer 
    //and updates value of _state with the return value
    Store.prototype.dispatch = function (action) {
        this._state = this.reducer(this._state, action);
        this._listeners.forEach(function (listener) { return listener(); });
    };
    Store.prototype.subscribe = function (listener) {
        var _this = this;
        this._listeners.push(listener);
        return function () {
            _this._listeners = _this._listeners.filter(function (l) { return l !== listener; });
        };
    };
    return Store;
}());
var store = new Store(reducer, 0);
console.log('initial state', store.getState());
store.dispatch(incrementAction);
var unsubscribe = store.subscribe(function () {
    console.log('subscribed', store.getState());
});
store.dispatch(incrementAction);
store.dispatch(decrementAction);

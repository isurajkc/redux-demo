/*------------------------------------*\
  Action/Reducer
\*------------------------------------*/

// Action defines what to do (with optional arguments)
interface Action {
    type: string,
    payload?: any
}



//  Reducer takes old state and an action and returns new state. 
// It is a pure function
interface Reducer<T> {
    (state: T, action: Action): T
}


let reducer: Reducer<number> = (state: number, action: Action) => {

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

}

let incrementAction: Action = {
    type: 'PLUS',
    payload: 7
}

let decrementAction: Action = {
    type: 'MINUS',
    payload: 7
}

console.log('value from reducer',reducer(99, incrementAction)); //106


//Being notified with subscribe
interface ListenerCallback {
    (): void;
}

interface UnsubscribeCallback {
    (): void;
}


/*------------------------------------*\
  Storing our state
\*------------------------------------*/

//store - running the reducer and keeping the new state
class Store<T>{

    private _state: T;
    private _listeners: ListenerCallback[] = [];

    // each store is tied to specific reducer
    constructor(private reducer: Reducer<T>, intialState: T) {
        this._state = intialState;
    }

    getState(): T {
        return this._state;
    }

    //dispatch takes an action, sends it to the reducer 
    //and updates value of _state with the return value
    dispatch(action: Action): void {
        this._state = this.reducer(this._state, action);
        this._listeners.forEach((listener: ListenerCallback) => listener());
    }

    subscribe(listener: ListenerCallback): UnsubscribeCallback {
        this._listeners.push(listener);

        return () => { //returns ubsubscribe function
            this._listeners = this._listeners.filter(l => l !== listener);
        }
    }

}

let store = new Store<number>(reducer, 0);
console.log('initial state',store.getState());

store.dispatch(incrementAction);

let unsubscribe = store.subscribe(() => {
    console.log('subscribed', store.getState());
})

store.dispatch(incrementAction);
store.dispatch(decrementAction);



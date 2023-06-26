import { createStore, applyMiddleware } from "redux";
import { Reducer } from "./reduce";
import thunk from "redux-thunk";

export let store = createStore(Reducer, applyMiddleware(thunk));

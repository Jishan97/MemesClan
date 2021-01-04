import React, { useReducer } from "react";
import axios from "axios";
import MemeContext from "./MemeContext";
import MemeReducer from "./MemeReducer";
import { AsyncStorage } from "react-native";
// set token as header
import setAuthToken from "../utils/setAuthToken";

axios.defaults.baseURL = "http://192.168.0.24:4000";
// axios.defaults.baseURL = "https://quiet-journey-66288.herokuapp.com"

import {
  GET_ALLMEMES,
  GET_ADULTMEMES,
  GET_INDIANMEMES,
  GET_FUNNYMEMES,
  GET_DANKMEMES,
  SET_LOADING,
  GET_MEMESTAG,
  GET_MEMESTREND,
  GET_TREND_MEMEARRAY,
  GET_TREND_MEMESINGLE,
  GET_USER_MEMES,
  GET_ALL_USERS,
  GET_SINGLE_USER,
  GET_MAIN_SCREEN_OVERLAY_POSTER,
  ERORR
} from "./Types";
import memeContext from "./MemeContext";

const MemeState = props => {
  const initialState = {
    //set loading
    loading: false,
    error: null,
    //All memes
    allMemes: [],
    //Memes by category
    indianMemes: [],
    dankMemes: [],
    funnyMemes: [],
    adultMemes: [],

    //************* meme upload form || meme tags || meme trending topics *************///
    memesTag: [],
    memesTrend: [],
    //******************************************* **************************************/

    //All trending memes
    trendMemeArray: [],

    //meme of the day
    trendMemeSingle: [],

    //user memes
    userMemes: [],
    allUsers: [],

    //get all user
    singleUser: [],

    //AD
    mainScreenOverlay: {}
  };

  const [state, dispatch] = useReducer(MemeReducer, initialState);

  const getAllMemes = async () => {
    setLoading();
    if ((AsyncStorage.token)) {
      setAuthToken(AsyncStorage.token);
    }

    // const userToken = await AsyncStorage.getItem("userToken");
    try {
      const res = await axios.get("/api/getAllmemes");
      dispatch({
        type: GET_ALLMEMES,
        payload: res.data
      });
    } catch (e) {
      dispatch({
        type: ERORR,
        payload: e
      });
    }
  };

 
  const GetmemeTags = async () => {
    setLoading();
    const res = await axios.get("/memeTags");

    dispatch({
      type: GET_MEMESTAG,
      payload: res.data
    });
  };


  

  const GetmemeTrend = async () => {
    setLoading();
    const res = await axios.get("/memeTrends");

    dispatch({
      type: GET_MEMESTREND,
      payload: res.data
    });
  };

  
  const GetTrendMemeArray = async () => {
    setLoading();
    const res = await axios.get("/getTrendingMemesArray");

    dispatch({
      type: GET_TREND_MEMEARRAY,
      payload: res.data
    });
  };

  const GetTrendSingle = async () => {
    setLoading();
    const res = await axios.get("/getTrendingMemesSingle");

    dispatch({
      type: GET_TREND_MEMESINGLE,
      payload: res.data
    });
  };

  const GetUserMemes = async () => {
    setLoading();
    const email = await AsyncStorage.getItem("userToken");
    const dataJson = {
      email: email
    };

    const res = await axios.post("/userMemes", dataJson);
    dispatch({
      type: GET_USER_MEMES,
      payload: res.data
    });
  };

  const GetAllUsers = async () => {
    setLoading();

    const res = await axios.get("/auth/getUsers");
    dispatch({
      type: GET_ALL_USERS,
      payload: res.data
    });
  };

  const GetSingleUser = async email => {
    setLoading();

    const res = await axios.post("/auth/getSingleUser", {
      email: email
    });
    dispatch({
      type: GET_SINGLE_USER,
      payload: res.data
    });
  };

  const GetMainScreenOverlayPoster = async () => {
    setLoading();

    // const res = await axios.get("http://192.168.0.24:3000/api/MainScreenOverlayPoster");
    const res = await axios.get("/api/MainScreenOverlayPoster");

    dispatch({
      type: GET_MAIN_SCREEN_OVERLAY_POSTER,
      payload: res.data
    });
  };

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  return (
    <MemeContext.Provider
      value={{
        allMemes: state.allMemes,
        memesTag: state.memesTag,
        loading: state.loading,
        trendMemeArray: state.trendMemeArray,
        trendMemeSingle: state.trendMemeSingle,
        userMemes: state.userMemes,
        memesTrend: state.memesTrend,
        allUsers: state.allUsers,
        singleUser: state.singleUser,
        mainScreenOverlay: state.mainScreenOverlay,

        GetSingleUser,
        GetAllUsers,
        GetmemeTrend,
        GetmemeTags,
        getAllMemes,
        GET_TREND_MEMEARRAY,
        GetTrendMemeArray,
        GetTrendSingle,
        GET_USER_MEMES,
        GetUserMemes,
        GetMainScreenOverlayPoster
      }}
    >
      {props.children}
    </MemeContext.Provider>
  );
};

export default MemeState;

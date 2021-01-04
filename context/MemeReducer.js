import {
    GET_ALLMEMES,
    SET_LOADING,
    GET_MEMESTREND,
    GET_MEMESTAG,
    GET_TREND_MEMEARRAY,
    GET_TREND_MEMESINGLE,
    GET_USER_MEMES,
    GET_ALL_USERS,
    GET_SINGLE_USER,
    GET_MAIN_SCREEN_OVERLAY_POSTER,
    ERORR
   } from './Types'
   
   export default(state, action)=>{
       switch(action.type){
           case ERORR:
               return{
                   ...state,error:action.payload,loading:false
               } 
           case GET_ALLMEMES:
               return{
                   ...state, allMemes:action.payload ,loading:false
               }

            case SET_LOADING:
                return{
                    ...state,
                    loading:true
                }
            case GET_MEMESTAG:
                return{
                    ...state, memesTag:action.payload, loading:false
                }

            case GET_MEMESTREND:
                return{
                        ...state, memesTrend:action.payload, loading:false
                    }            
            case GET_TREND_MEMEARRAY:
                return{
                    ...state, trendMemeArray:action.payload, loading:false
                }
            case GET_TREND_MEMESINGLE:
                return{
                        ...state, trendMemeSingle:action.payload, loading:false
                    }    
            case GET_USER_MEMES:
                return{
                    ...state,userMemes:action.payload, loading:false
                }
            case GET_ALL_USERS:
                return{
                    ...state,allUsers:action.payload, loading:false
                }
            case GET_SINGLE_USER:
                return{
                        ...state,singleUser:action.payload, loading:false
                    }
          case GET_MAIN_SCREEN_OVERLAY_POSTER:
                return{
                        ...state,mainScreenOverlay:action.payload, loading:false
                         }
           default:
               return state
       }
   }
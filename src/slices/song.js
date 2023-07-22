import { createSlice } from "@reduxjs/toolkit";

const initialValue={song:{},track:[]}

export const songSlice = createSlice(
    {
        name:'song',
        initialState:{value:initialValue},
        reducers:{
            setSongAndTrack:(state,action)=>{
                state.value=action.payload
            },
            songBack:(state)=>{
                let index = state.value.track.findIndex((elem)=>elem.songURL==state.value.song.songURL)
                if(index==0){
                    state.value.song=state.value.track[state.value.track.length-1]
                }
                else {
                    state.value.song=state.value.track[--index]
                }
            },
            songNext:(state)=>{
                var index = state.value.track.findIndex((elem)=>elem.songURL==state.value.song.songURL)
                if(index==state.value.track.length-1){
                    state.value.song=state.value.track[0]
                }
                else {
                    state.value.song=state.value.track[++index]
                }
            },
           
        }
    }
)

export const {setSongAndTrack,songBack,songNext} = songSlice.actions
export default songSlice.reducer;
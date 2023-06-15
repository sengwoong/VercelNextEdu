import {createSlice} from   "@reduxjs/toolkit"


const initialState = {
  pageNumber: 1,
  pageScale: 1,
  pdfwidth: 0,
};



const sliceOfPdf = createSlice({
  name: 'pdfViewer',
  initialState,
  reducers: {
    upNumPages(state, action) {
      state.pageNumber =  state.pageNumber +action.payload;
    },
    downNumPages(state, action) {
      state.pageNumber =  state.pageNumber -action.payload;
    },
    setPageNumber(state, action) {
      state.pageNumber =  action.payload;
    },
    upPageScale(state, action) {
      state.pageScale = state.pageScale+ action.payload;
    },
    downPageScale(state, action) {
      state.pageScale = state.pageScale-action.payload;
    },
    SetPageWidth(state, action) {
      state.pdfwidth = action.payload;
    },
   
  },

});

export const pdfActions = sliceOfPdf.actions;

export default sliceOfPdf.reducer ;

import { createSlice } from '@reduxjs/toolkit';


type BulkUpload = {
  trackPoints: string;
  trackPointsRaw: string;
  waypoints: string;
  waypointsRaw: string;
};

// interface NoteState {
//   notes: Array<Note>
// }

interface BulkUploadState {
  trackPoints: string;
  trackPointsRaw: string;
  waypoints: string;
  waypointsRaw: string;
}

const initialState: BulkUploadState = {
  trackPoints: '',
  trackPointsRaw: '',
  waypoints: '',
  waypointsRaw: '',
};

const bulkUploadSlice = createSlice({
  name: 'bulkUpload',
  initialState,
  reducers: {
    resetBulkUploadState() {
      return initialState;
    },
    addTrackPointsRaw: (state, action) => {
      state.trackPointsRaw = action.payload;
      console.log(action.payload);
    },
    // addNote: (state, action: PayloadAction<Note>) => {
    //   const note = action.payload;
    //   state.notes.push(note)
    // },
    // removeNote: (state, action: PayloadAction<string>) => {
    //   const id = action.payload;
    //   const notes = state.notes.filter((note) => note.id !== id);
    //   state.notes = notes;
    // }
  },
});

// actions
export const { reducer } = bulkUploadSlice;

// selectors
// export const selectNotes = (state: RootState) => state.notes.notes

export default bulkUploadSlice.reducer;

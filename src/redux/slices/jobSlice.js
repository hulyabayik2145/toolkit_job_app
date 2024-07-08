import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    jobs: [],
    mainJobs: [],
    isLoading: false,
    error: null,

}

const JobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        setError: (state, action) => {
            state.isLoading = false,
                state.error = action.payload
        },
        setJobs: (state, action) => {
            state.isLoading = false,
                state.error = null;
            state.jobs = action.payload;
            state.mainJobs = action.payload;

        },
        deleteJob: (state, action) => {
            //silinecek elemanın sırasını bilme
            const index = state.jobs.findIndex((i) => i.id === action.payload);
            //splice ile elemanı sil
            state.jobs.splice(index, 1);
        },
        createJob: (state, action) => {
            state.jobs.push(action.payload);
        },
        //aratılan şirket ismine göre filtreleme

        filterBySearch: (state, action) => {
            //aratılan kelime
            const query = action.payload.text.toLowerCase();
            // filtreleme yap
            state.jobs = state.mainJobs.filter((i) => i[action.payload.name].toLowerCase().includes(query)
                ||
                i.position.toLowerCase().includes(query));

        },

        sortJobs: (state, action) => {
            switch (action.payload) {
                case "a-z":
                    state.jobs.sort((a, b) => a.company.localeCompare(b.company));
                    break;
                case "z-a":
                    state.jobs.sort((a, b) => b.company.localeCompare(a.company));
                    break;
                case "En Yeni":
                    state.jobs.sort((a, b) => new Date(b.date) - new Date(a.date));
                    break;
                case "En Eski":
                    state.jobs.sort((a, b) => new Date(a.date) - new Date(b.date));
                    break;
                default:
                    break;
            }

        },
        clearFilters: (state, action) => {
            state.jobs = state.mainJobs;
        },


    },
});
//actionları export et
export const { setError, setJobs, setLoading, deleteJob, createJob, filterBySearch, sortJobs, clearFilters } = JobSlice.actions;

//reducer ı export et
export default JobSlice.reducer;
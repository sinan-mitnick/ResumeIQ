import api from "../api/api";

export const saveNotes = async (data) => {

    const res = await api.post("/notes", data);

    return res.data;

};

export const getNotes = async (resumeId) => {

    const res = await api.get(`/notes/${resumeId}`);

    return res.data;

};
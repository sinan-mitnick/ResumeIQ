import api from "../api/api";

export const getMyResumes = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get("/resume/my-resumes", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
};

export const getResumeById = async (id) => {
    const token = localStorage.getItem("token");

    const res = await api.get(`/resume/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
};
export const getResumeStats = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get("/resume/stats", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};
export const deleteResume = async (id) => {

    const token = localStorage.getItem("token");

    const res = await api.delete(`/resume/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
};
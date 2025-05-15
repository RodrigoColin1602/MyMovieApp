import api from "../api";

export const getMovieRecommendations = async (id: string) => {
    try {
        const { data } = await api.get(`/movie/${id}/recommendations`);  
        return data;
    } catch (error) {
        throw error;
    }
};
import api from "../api";

export const getNowPlayingMovies = async () => {
    let res: any;
    const endpoint = '/movie/now_playing?language=en-US&page=1';
    await api.get(endpoint)
    .then(
        (data) => {
            res = data.data;

        }

    ).catch(
        (err) => {
            res = err.response;
        }

    );
    return res;
};
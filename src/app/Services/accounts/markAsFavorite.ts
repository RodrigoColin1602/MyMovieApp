import api from "../api";

export const markAsFavorite = async (
    movieid:number,
    favorite:boolean,
    guestSessionId:string
) => {
    try{
        const body ={
            media_type:"movie",
            media_id:movieid,
            favorite,
        };

        const { data } = await api.post(
            `/account/${guestSessionId}/favorite`,body
        );
        return data;

}catch(error){
    throw error;
}
};
export const GOT_CAMPUSES_FROM_SERVER = "GOT_CAMPUSES_FROM_SERVER";

export function getCampus (campus) {
    return {
        type: GOT_CAMPUSES_FROM_SERVER,
        campus
    }
}
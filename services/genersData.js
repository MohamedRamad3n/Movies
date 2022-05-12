import Axios from "axios";

export function getGenres() {
    return Axios.get('http://localhost/MoviesApis/MoviesApis/api/readG.php')
}
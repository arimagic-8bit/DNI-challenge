import axios from "axios";

class Photo {
    constructor(){
        this.photo = axios.create({
            baseURL: "https://front-exercise.z1.digital"
        })
    }

    validatePhoto(photo){
        return this.photo
        .post("/evaluations", {photo})
        .then(({data}) => data)
    }
}

const photoService = new Photo();
export default photoService;
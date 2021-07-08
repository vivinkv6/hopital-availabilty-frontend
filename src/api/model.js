import Model, {baseUrl, ModelObject} from "./api";


class MarkerObject extends ModelObject {
    constructor(data, baseUrl) {

        super(data, baseUrl);
        this.fields = ["id", "Phone", "size", "financial_rating", "avg_cost", "covid_rating", "beds_available", "care_rating",
            "oxygen_rating", "ventilator_availability", "oxygen_availability", "icu_availability", "lat", "lng", "images",
            "display_address", "name", "datef", 'address', 'comment']
        this.excluded_fields = ['image', 'added_by_id']
        this.getData()

    }


}

class ReviewObject extends ModelObject {


    constructor(data, baseUrl) {
        super(data, baseUrl);
        this.fields = ["id", "marker", "financial_rating", "avg_cost", "covid_rating", "beds_available", "care_rating",
            "oxygen_rating", "ventilator_availability", "oxygen_availability", "icu_availability", "comment", "datef",
            "images", "day",]
        this.excluded_fields = ['image', 'written_by_id']
        this.getData()
    }
}

class PatientObject extends ModelObject {


    constructor(data, baseUrl) {
        super(data, baseUrl);
        this.fields = ['id', 'Name', 'age', 'gender', 'address', 'symptoms', 'symdays', 'spo2', 'hospitalday', 'oxy_bed', 'covidresult',
            'hospitalpref', 'attendername', 'attenderphone', 'relation', 'srfid', 'bunum', 'blood', 'bedtype', 'ct',
            'ctscore']
        this.getData()
    }
}

class susObject extends ModelObject {

    constructor(data, baseUrl) {
        super(data, baseUrl);
        this.fields = ["id", "marker", "comment", "created_by", "datef"]
        this.getData()
    }
}

export const Review = new Model(baseUrl + '/api/review/', ReviewObject)
export const Sus = new Model(baseUrl + '/api/suspicious/', susObject)
export const Marker = new Model(baseUrl + '/api/marker/', MarkerObject)
export const Patient = new Model(baseUrl + '/api/patient/', PatientObject)

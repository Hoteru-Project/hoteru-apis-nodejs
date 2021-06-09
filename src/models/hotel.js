const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;

const HotelSchema = new Schema({
    id: {type: Number, required: true, auto: true, unique: true},
    provider: {type: String, required: true},
    name: {type: String, min: 3, required: true},
    availability: [{
        startDate: {type: Date, required: true},
        endDate: {type: Date, required: true},
    }],
    classRating: {type: Number, min: 0, max: 5, required: true},
    rooms: [
        {
            numberOfGuests: {type: Number, required: true},
            roomCount: {type: Number, required: true},
            type: {type: String, required: true},
            price: {type: Number, required: true}
        }
    ],
    numberOfGuests: {type: Number, min: 0, max: 8, required: true},
    hotelLocation: {
        coordinates: {
            latitude: {type: SchemaTypes.Decimal128},
            longitude: {type: SchemaTypes.Decimal128}
        }
    },
    mainAmenities: [String],
    amenitiesFeatures: [{
        heading: {type: String, required: true},
        listItems: [{
            heading: {type: String, required: true},
            listItems: [String]
        }]
    }],
    photos: [String],
    address: {
        countryName: {type: String, required: true},
        cityName: {type: String, required: true},
        postalCode: {type: String, required: true},
        provinceName: {type: String, required: true},
        addressLine1: {type: String, required: true},
        addressLine2: {type: String},
        countryCode: {type: String, required: true},
        pattern: {type: String, required: true},
        fullAddress: {type: String, required: true},
    },
    hotelPricing: {
        startingAt: {
            formatted: {type: String, required: true},
            plain: {type: Number, required: true}
        }
    },
    mapWidget: {
        staticMapUrl: {type: String, required: true}
    },
    guestReviews: {
        overallRating: {type: Number, required: true, min: 0, max: 10},
        numberOfReviews: {type: Number, required: true},
        reviews: [
            {
                rate: {type: Number, min: 0, max: 10, required: true},
                name: {type: String, required: true},
                review: {type: String},
                date: {type: Date, required: true}
            }
        ]
    },
    arrivalDeparture: {
        checkIn: {type: String, required: true},
        checkOut: {type: String, required: true},
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Hotel", HotelSchema)

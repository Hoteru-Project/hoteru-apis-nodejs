"use strict";
const ProviderModel = require("../models/provider");
const HotelModel = require("../models/hotel");
const fs = require('fs');

const jsonReviews = JSON.parse(fs.readFileSync(__dirname + '/../data/reviews.json', 'utf8'));


const shuffle = array => array.sort(() => Math.random() - 0.5);
const getRandomInt = (max, negative = false) => Math.floor((Math.random() - (negative ? 0.5 : 0)) * max);

const generateRandomizedRatingAndReviews = () => {
    const min = 2;
    const max = 15;
    let numberOfReviews = getRandomInt(max - min) + min
    let rateCounter = 0;
    shuffle(jsonReviews)
    const guestReviews = {
        overallRating: numberOfReviews,
        numberOfReviews: numberOfReviews,
        reviews: []
    }
    while (numberOfReviews--) {

        let review = jsonReviews[numberOfReviews];
        rateCounter += review.rate;
        review.date = new Date(review.date);
        guestReviews.reviews.push(review);
    }
    guestReviews.overallRating = rateCounter / guestReviews.overallRating
    return guestReviews
}

const randomizeRooms = (rooms) => {
    let min = 1e9;
    const generatedRooms = rooms.map(room => {
        room.price += getRandomInt(getRandomInt(room.price / 10), true)
        min = room.price < min ? room.price : min;
        return room;
    })
    min = generatedRooms.length ? min : 0;
    return {
        rooms: generatedRooms,
        min: min
    }
}


module.exports = {
    createHotels: async (originalHotel) => {
        const providers = await ProviderModel.find();
        shuffle(providers);
        let providersNumbers = getRandomInt(providers.length - 1) + 1;
        while (providersNumbers--) {
            let hotel = JSON.parse(JSON.stringify(originalHotel))
            hotel.provider = providers[providersNumbers].name
            hotel.guestReviews = generateRandomizedRatingAndReviews();
            let generatedRooms = randomizeRooms(hotel.rooms)
            hotel.rooms = generatedRooms.rooms;
            hotel.startDate = new Date(hotel.startDate)
            hotel.endDate = new Date(hotel.endDate)
            hotel.hotelPricing = {
                startingAt: {
                    formatted: `$${generatedRooms.min}`,
                    plain: generatedRooms.min
                }
            };
            let newHotel = new HotelModel(hotel)
            newHotel.save()
        }
        return true
    }
}

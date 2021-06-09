"use strict";

const HotelModel = require("../../models/hotel");

module.exports = {
    index: async (req, res) => {
        const searchParams = {
            provider: req.params.provider,
            availability : {
                $elemMatch: {
                    startDate: {$lte: req.query.checkIn?new Date(req.query.checkIn): ""},
                    endDate: {$gte: req.query.checkIn?new Date(req.query.checkOut): ""}
                }
            },
            hotelLocation: {
                coordinates: {
                    longitude: {$gte: Number(req.query.longitude) - 1, $lte: Number(req.query.longitude) + 1},
                    latitude: {$gte: Number(req.query.latitude) - 1, $lte: Number(req.query.latitude) + 1}
                }
            },
            roomCount:{
                $elemMatch: {
                    roomCount: {$gte: req.params.rooms}
                }
            }
        };
        const hotels = await HotelModel.find(searchParams);
        if( hotels.length ){
            res.status(200).json({
                success: true,
                data: hotels
            })
        }
        else{
            res.status(404).json({
                success: false,
                error: "No data found."
            })
        }
    },
    show: async (req, res) => {
        const hotel = await HotelModel.findOne({provider: req.params.provider, id:req.params.id});
        if( hotel ){
            res.status(200).json({
                success: true,
                data: hotel
            })
        }
        else{
            res.status(404).json({
                success: false,
                error: "No hotel found."
            })
        }
    },
    store: (req, res) => {

    }
}

"use strict";

const HotelModel = require("../../models/hotel");
const Helpers = require("../../helpers/HotelHelper")

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
            "hotelLocation.coordinates.longitude": {$gte: Number(req.query.long) - 1, $lte: Number(req.query.long) + 1},
            "hotelLocation.coordinates.latitude": {$gte: Number(req.query.lat) - 1, $lte: Number(req.query.lat) + 1},
            rooms:{
                $elemMatch: {
                    roomCount: {$gte: req.query.rooms}
                }
            }
        };
        // console.log(searchParams.)
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
    store: async (req, res) => {
        await Helpers.createHotels(req.body);
        // req.body.provider = req.params.provider;
        // req.body.availability.forEach(item => {
        //     console.log(item.startDate)
        //     item.startDate = new Date(item.startDate)
        //     item.endDate = new Date(item.endDate)
        // })
        // const hotel = new HotelModel(req.body);
        // await hotel.save()
        return res.status(201).json({
            success: true,
            message: "Created Successfully"
        })
    }
}

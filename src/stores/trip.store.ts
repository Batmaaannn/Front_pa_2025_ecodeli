import { defineStore } from "pinia";
import { axios } from "@/libs/axios";

export interface Trip {
    start_city: string;
    arrival_city: string;
    start_date: string;
    end_date: string;
}

export const useTripStore = defineStore("tripStore", {
    actions: {
        async createTrip(data: Trip) {
            return axios.post("/trips", data);
        },
        async getAllTrips() {
            return axios.get("/trips");
        },
    },
});

import { defineStore } from "pinia";
import { axios } from "@/libs/axios";

interface DeliveryRequest {
    name: string;
    pickupAddress: string;
    deliveryAddress: string;
    datetime: string;
    packageSize: string;
    comment?: string;
}


export const useDeliveryStore = defineStore("deliveryStore", {
    state: () => ({
        requests: [] as DeliveryRequest[],
    }),
    actions: {
        async createDeliveryRequest(request: DeliveryRequest) {
            try {
                const response = await axios.post("/delivery-requests", request);
                this.requests.push(response.data);
                return response.data;
            } catch (error) {
                return error;
            }
        },
    },
});
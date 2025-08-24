import { axios } from "@/libs/axios";
import { Announcement, AnnouncementPackageRequest } from "@/types/announcement";
import { defineStore } from "pinia";

interface AnnouncementState {
  futureDeliveries: Announcement[];
  pastDeliveries: Announcement[];
}

export const useAnnouncementStore = defineStore("announcementStore", {
  state: (): AnnouncementState => ({
    futureDeliveries: [],
    pastDeliveries: [],
  }),
  getters: {},
  actions: {
    async createAnnouncementRequest(announcement: AnnouncementPackageRequest) {
      const formData = new FormData();

      formData.append("title", announcement.title);
      formData.append("description", announcement.description);
      formData.append("departureCity", announcement.departureCity);
      formData.append("arrivalCity", announcement.arrivalCity);
      formData.append(
        "pickupDate",
        new Date(announcement.pickupDate).toISOString()
      );
      formData.append(
        "deliveryDate",
        new Date(announcement.deliveryDate).toISOString()
      );
      formData.append(
        "pickupInstructions",
        announcement.pickupInstructions || ""
      );
      formData.append("price", announcement.price.toString());
      formData.append("assurance", announcement.assurance.toString());
      formData.append("urgent", announcement.urgent.toString());

      announcement.objects.forEach((obj, index) => {
        formData.append(`objects[${index}][label]`, obj.label);
        formData.append(`objects[${index}][weight]`, obj.weight.toString());
        formData.append(`objects[${index}][quantity]`, obj.quantity.toString());
        if (obj.length !== undefined) {
          formData.append(`objects[${index}][length]`, obj.length.toString());
        }
        if (obj.width !== undefined) {
          formData.append(`objects[${index}][width]`, obj.width.toString());
        }
        if (obj.height !== undefined) {
          formData.append(`objects[${index}][height]`, obj.height.toString());
        }
        if (obj.value !== undefined) {
          formData.append(`objects[${index}][value]`, obj.value.toString());
        }
        formData.append(
          `objects[${index}][fragile]`,
          obj.fragile ? "true" : "false"
        );

        if (obj.photo) {
          formData.append(
            `objects[${index}][photo]`,
            obj.photo,
            obj.photo.name
          );
        }
      });

      try {
        return (await axios.post("/announcements", formData)).data;
      } catch (error) {
        console.error("Erreur lors de la création de la demande :", error);
        throw error;
      }
    },
    async fetchFutureDeliveries() {
      try {
        const data = (await axios.get("/announcements/customer/")).data;
        this.futureDeliveries = data;
        return data;
      } catch (error) {
        console.error("Erreur lors de la récupération des annonces :", error);
        throw error;
      }
    },
    async fetchAnnouncementById(id: number) {
      try {
        return (await axios.get(`/announcements/${id}`)).data;
      } catch (error) {
        console.error(
          `Erreur lors de la récupération de l'annonce avec l'ID ${id} :`,
          error
        );
        throw error;
      }
    },
    async fetchPastDeliveries() {
      try {
        const data = (await axios.get("/announcements/customer/past")).data;
        this.pastDeliveries = data;
        return data;
      } catch (error) {
        console.error("Erreur lors de la récupération des livraisons passées :", error);
        throw error;
      }
    },
  },
});

import { axios, getAxiosError } from "@/libs/axios";
import { DeliveryAgent } from "@/types/delivery-agent";
import { FiltersData } from "@/types/filter";
import { ServiceAgent } from "@/types/service-agent";
import { defineStore } from "pinia";
import { File, FormUpdateFileStatus } from "@/types/file";
import { Prestation,PrestationStatus } from "@/types/prestation";


interface AdminState {
  prestations: Prestation[];
  deliveryAgents: Array<DeliveryAgent>;
  serviceAgents: Array<ServiceAgent>;
  nextService: string;
  nextDelivery: string;
  totalDeliveryAgents: number;
  totalServiceAgents: number;
  fetchedDeliveryAgent: DeliveryAgent & { files: File[] };
  fetchedServiceAgent: ServiceAgent & { files: File[] };
}

interface ParamsRequest {
  sort?: string;
  activated?: boolean;
}

interface ResponseDeliveryAgents {
  items: Array<DeliveryAgent>;
  links: LinksResponse;
  meta: MetaResponse;
}

interface ResponseServiceAgents {
  items: Array<ServiceAgent>;
  links: LinksResponse;
  meta: MetaResponse;
}

export interface LinksResponse {
  first: string;
  last: string;
  next: string;
  previous: string;
}

export interface MetaResponse {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export const useAdminStore = defineStore("adminStore", {
  state: (): AdminState => ({
      prestations: [],
    nextDelivery: "",
    nextService: "",
    totalDeliveryAgents: 0,
    totalServiceAgents: 0,
    deliveryAgents: [],
    serviceAgents: [],
    fetchedDeliveryAgent: { ...({} as DeliveryAgent), files: [] },
    fetchedServiceAgent: { ...({} as ServiceAgent), files: [] },
  }),
  getters: {},
  actions: {
    async fetchListDeliveryAgents(filterAndMatch?: FiltersData) {
      try {
        let params: ParamsRequest = {};

        if (filterAndMatch) {
          const { sortBy, actived } = filterAndMatch;

          params = {
            ...(sortBy && { sort: sortBy }),
            ...(actived && { activated: actived }),
          };
        }

        const { data } = await axios.get<ResponseDeliveryAgents>(
          "admin/delivery-agents",
          {
            params,
          }
        );

        this.deliveryAgents = data.items;
        this.nextDelivery = data.links.next;
        this.totalDeliveryAgents = data.meta.totalItems;
      } catch (e: any) {
        const { message } = getAxiosError(e);
        if (message.match(/Unauthorized/gi)) return "Unauthorized";
      }
    },
    async fetchListServiceAgents(filterAndMatch?: FiltersData) {
      try {
        let params: ParamsRequest = {};

        if (filterAndMatch) {
          const { sortBy, actived } = filterAndMatch;

          params = {
            ...(sortBy && { sort: sortBy }),
            ...(actived && { activated: actived }),
          };
        }

        const { data } = await axios.get<ResponseServiceAgents>(
          "admin/service-agents",
          {
            params,
          }
        );

        this.serviceAgents = data.items;
        this.nextService = data.links.next;
        this.totalServiceAgents = data.meta.totalItems;
      } catch (e: any) {
        const { message } = getAxiosError(e);
        if (message.match(/Unauthorized/gi)) return "Unauthorized";
      }
    },
    async fetchDeliveryAgentById(id: number) {
      try {
        this.fetchedDeliveryAgent = (
          await axios.get<DeliveryAgent & { files: File[] }>(
            `/admin/delivery-agents/${id}`
          )
        ).data;
      } catch (e: any) {
        const { message } = getAxiosError(e);
        if (message.match(/Unauthorized/gi)) return "Unauthorized";
      }
    },
    async updateFileStatus(id: number, data: FormUpdateFileStatus[]) {
      try {
        return (await axios.patch(`/files/${id}/update-registration`, data))
          .data;
      } catch (e: any) {
        const { message } = getAxiosError(e);
        throw new Error(message);
      }
    },
    async acceptUserRequest(id: number) {
      try {
        return (await axios.patch(`/admin/users/${id}/accept`)).data;
      } catch (e: any) {
        const { message } = getAxiosError(e);
        throw new Error(message);
      }
    },
    async rejectUserRequest(id: number) {
      try {
        return (await axios.patch(`/admin/users/${id}/reject`)).data;
      } catch (e: any) {
        const { message } = getAxiosError(e);
        throw new Error(message);
      }
    },
    async fetchServiceAgentById(id: number) {
  try {
    this.fetchedServiceAgent = (
      await axios.get<ServiceAgent & { files: File[] }>(
        `/admin/service-agents/${id}`
      )
    ).data;
  } catch (e: any) {
    const { message } = getAxiosError(e);
    if (message.match(/Unauthorized/gi)) return "Unauthorized";
  }
},

async updateServiceAgentPrestations(serviceAgentId: number, prestations: Array<{id: number, applied_price: number, is_available: boolean, price_status: string, ecodeli_comment: string}>) {
  try {
    return (await axios.patch(`/admin/service-agents/${serviceAgentId}/prestations`, { prestations })).data;
  } catch (e: any) {
    const { message } = getAxiosError(e);
    throw new Error(message);
  }
},

async addServiceAgentPrestation(serviceAgentId: number, prestation: {prestationId: number, requested_price: number}) {
  try {
    return (await axios.post(`/admin/service-agents/${serviceAgentId}/prestations`, prestation)).data;
  } catch (e: any) {
    const { message } = getAxiosError(e);
    throw new Error(message);
  }
},

async fetchPrestations() {
  try {
    const { data } = await axios.get('/admin/prestations');
    this.prestations = data;
  } catch (e: any) {
    const { message } = getAxiosError(e);
    throw new Error(message);
  }
},

async updatePrestationStatus(prestationId: number, isActive: boolean) {
  try {
    return (await axios.patch(`/admin/prestations/${prestationId}`, { is_active: isActive })).data;
  } catch (e: any) {
    const { message } = getAxiosError(e);
    throw new Error(message);
  }
}
  },
});

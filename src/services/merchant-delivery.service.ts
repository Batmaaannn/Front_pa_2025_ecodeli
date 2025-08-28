import axios from "@/plugins/axios";
import type {
  MerchantDelivery,
  CreateMerchantDeliveryDto,
  MerchantDeliveryStatistics,
} from "@/types/merchant-delivery";

export class MerchantDeliveryService {
  private baseUrl = "/merchants";

  async createDelivery(
    merchantId: number,
    data: CreateMerchantDeliveryDto
  ): Promise<MerchantDelivery> {
    const response = await axios.post(
      `${this.baseUrl}/${merchantId}/deliveries`,
      data
    );
    return response.data;
  }

  async getDeliveries(merchantId: number): Promise<MerchantDelivery[]> {
    const response = await axios.get(
      `${this.baseUrl}/${merchantId}/deliveries`
    );
    return response.data;
  }

  async getDelivery(
    merchantId: number,
    deliveryId: number
  ): Promise<MerchantDelivery> {
    const response = await axios.get(
      `${this.baseUrl}/${merchantId}/deliveries/${deliveryId}`
    );
    return response.data;
  }

  async updateDelivery(
    merchantId: number,
    deliveryId: number,
    data: Partial<CreateMerchantDeliveryDto>
  ): Promise<MerchantDelivery> {
    const response = await axios.put(
      `${this.baseUrl}/${merchantId}/deliveries/${deliveryId}`,
      data
    );
    return response.data;
  }

  async cancelDelivery(
    merchantId: number,
    deliveryId: number
  ): Promise<MerchantDelivery> {
    const response = await axios.delete(
      `${this.baseUrl}/${merchantId}/deliveries/${deliveryId}`
    );
    return response.data;
  }

  async getStatistics(merchantId: number): Promise<MerchantDeliveryStatistics> {
    const response = await axios.get(
      `${this.baseUrl}/${merchantId}/deliveries/statistics`
    );
    return response.data;
  }
}

export default new MerchantDeliveryService();
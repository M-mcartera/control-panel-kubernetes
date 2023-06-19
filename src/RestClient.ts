import axios from "axios";

class RestClient {
  axiosInstance: any;
  constructor() {
    if (this.axiosInstance) {
      return;
    }
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:3000",
      timeout: 1000,
      headers: {
        "Content-Type": "application/json",
        Authorization: "",
      },
    });
  }

  async httpRequest(method: string, url: string, data?: any) {
    const response = await this.axiosInstance({
      method,
      url,
      data,
    });
    return response.data;
  }

  updateBearerToken(token: string) {
    this.axiosInstance = axios.create({
      baseURL: "http://localhost:3000",
      timeout: 1000,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  }

  getAxiosInstance() {
    return this.axiosInstance;
  }
}
const RestClientInstance = new RestClient();
export default RestClientInstance;

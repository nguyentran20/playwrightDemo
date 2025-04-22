import { request, expect, APIRequestContext } from "playwright/test";

export class APiUtils {
  apiContext: APIRequestContext;
  loginPayload: { userEmail: string; userPassword: string };
  constructor(
    apiContext: APIRequestContext,
    loginPayload: { userEmail: string; userPassword: string }
  ) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async createOrder(
    orderPayLoad: any
  ): Promise<{ token: string; orderId: string }> {
    let response: { token: string; orderId: string } = {
      token: "",
      orderId: "",
    };
    response.token = await this.getToken();
    const orderResponse = await this.apiContext.post(
      "/api/ecom/order/create-order",
      {
        data: orderPayLoad,
        headers: {
          Authorization: response.token,
          "Content-Type": "application/json",
        },
      }
    );
    const orderResponseJson = await orderResponse.json();
    const orderId = orderResponseJson.orders[0];
    response.orderId = orderId;
    return response;
  }

  async getToken(): Promise<string> {
    let token: string;
    const loginResponse = await this.apiContext.post("/api/ecom/auth/login", {
      data: this.loginPayload,
    });
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    return token;
  }
}

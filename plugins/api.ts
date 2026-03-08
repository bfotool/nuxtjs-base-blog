import axios from "axios";
import { installMockInterceptors } from "~/mocks/handlers";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const apiClient = axios.create({
    baseURL: config.public.apiBaseUrl as string,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Install mock interceptors when mock mode is enabled
  if (config.public.useMockApi) {
    installMockInterceptors(apiClient);
  }

  return {
    provide: {
      api: apiClient,
    },
  };
});

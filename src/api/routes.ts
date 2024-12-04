import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data: Array<any>;
};

/** mock 模拟后端返回路由demo */
export const getAsyncRoutes = () => {
  return http.request<Result>("get", "/get-async-routes");
};

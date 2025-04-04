import Axios, {
  type AxiosInstance,
  type AxiosError,
  type AxiosResponse,
  type AxiosRequestConfig,
} from 'axios';

export enum ContentTypeEnum {
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
  // json
  JSON = 'application/json;charset=UTF-8',
}

/**
 * @description: 与后端协定的状态 code
 */
export enum ResponseEnum {
  SUCCESS = 200,
  ERROR = 0,
}

const handleErrorResponseStatus = (status: number, url?: string): string => {
  const statusMessages: Record<number, string> = {
    400: '请求错误',
    401: '未授权，请登录',
    403: '拒绝访问',
    404: `请求地址出错: ${url || '未知地址'}`, // 动态拼接 URL
    408: '请求超时',
    500: '服务器内部错误',
    501: '服务未实现',
    502: '网关错误',
    503: '服务不可用',
    504: '网关超时',
    505: 'HTTP版本不受支持',
  };
  return status in statusMessages ? statusMessages[status] : '网络连接故障';
};

// 默认 axios 实例请求配置
const configDefault = {
  headers: {
    'Content-Type': ContentTypeEnum.FORM_URLENCODED,
  },
  timeout: 0,
  baseURL: '/api',
  data: {},
};

class Http {
  private static axiosInstance: AxiosInstance; // 当前实例
  private static axiosConfigDefault: AxiosRequestConfig; // 请求配置
  
  // 请求拦截
  private httpInterceptorsRequest(): void {
    Http.axiosInstance.interceptors.request.use(
      (config) => {
        // 发送请求前，可在此带上 token
        return config;
      },
      (error: AxiosError) => {
        // 发送请求错误，可在此添加交互
        return Promise.reject(error);
      },
    );
  }

  // 响应拦截
  private httpInterceptorsResponse(): void {
    Http.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 与后端协定的返回字段
        const { code, data } = response.data;
        // 判断请求是否成功
        const isSuccess = data && Reflect.has(response.data, 'code') && code === ResponseEnum.SUCCESS;
        if (isSuccess) {
          return data;
        } else {
          // 处理请求错误
          return Promise.reject(response.data);
        }
      },
      (error: AxiosError) => {
        // 处理 HTTP 网络错误
        const status = error.response?.status || 0;
        const message = handleErrorResponseStatus(status, error.response?.config?.url);
        console.error(message);
        return Promise.reject(error);
      },
    );
  }

  constructor(config: AxiosRequestConfig) {
    Http.axiosConfigDefault = config;
    Http.axiosInstance = Axios.create(config);

    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  public request<T>(paramConfig: AxiosRequestConfig): Promise<T> {
    const config = { ...Http.axiosConfigDefault, ...paramConfig };
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Http.axiosInstance.request(config).then((response: any) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}

export const http = new Http(configDefault);

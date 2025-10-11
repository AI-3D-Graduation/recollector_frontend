import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_CONFIG } from './config';

export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🚀 API 요청: ${config.method?.toUpperCase()} ${config.url}`);

    return config;
  },
  (error) => {
    console.error('❌ API 요청 에러:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`✅ API 응답: ${response.config.url}`, response.data);
    return response;
  },
  (error: AxiosError) => {
    console.error('❌ API 응답 에러:', error.response?.data || error.message);
    
    // 공통 에러 핸들링
    if (error.response?.status === 401) {
      // 인증 에러 처리
      console.error('🔒 인증 실패: 로그인이 필요합니다.');
      // window.location.href = '/login';
    } else if (error.response?.status === 404) {
      console.error('🔍 리소스를 찾을 수 없습니다.');
    } else {
      console.error('🔥 서버 에러가 발생했습니다.');
    }
    
    return Promise.reject(error);
  }
);
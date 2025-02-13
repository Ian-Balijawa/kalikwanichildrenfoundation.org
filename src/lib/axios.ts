import axios from 'axios'

export const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

export const axiosInstance = axios.create( {
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
} )

// Request interceptor
axiosInstance.interceptors.request.use(
    ( config ) => {
        const token = localStorage.getItem( 'token' )
        if ( token ) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    ( error ) => {
        return Promise.reject( error )
    }
)

// Response interceptor
axiosInstance.interceptors.response.use(
    ( response ) => response,
    async ( error ) => {
        const originalRequest = error.config
        if ( error.response?.status === 401 && !originalRequest._retry ) {
            originalRequest._retry = true

            try {
                const token = await refreshToken()
                localStorage.setItem( 'token', token )
                originalRequest.headers.Authorization = `Bearer ${token}`
                return axiosInstance( originalRequest )
            } catch ( _error ) {
                console.error( 'Refresh token failed', _error )
                localStorage.removeItem( 'token' )
                window.location.href = '/login'
            }
        }

        return Promise.reject( error )
    }
)

async function refreshToken() {
    return ''
}

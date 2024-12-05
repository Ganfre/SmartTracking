import useSWR from 'swr'
import api from '../servicos/api'

export const useApi = (url) => {
    const { data, error } = useSWR(
        url,
        async (url) => {
            const response = await api.get(url)
            return response
        },
        {
            refreshInterval: 60000,
            revalidateOnFocus: false,
        }
    )
    return { data, error }
}

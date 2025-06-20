import { useState, useEffect, useMemo } from 'react';
import axiosInstance from './axiosInstance';

export function useFetchData(url: string, params: any = {}, dataKey: string = 'suppliers') {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const stableParams = useMemo(() => params, [JSON.stringify(params)]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching data from:', url);
                const response = await axiosInstance.get(url, { params: stableParams });
                console.log('API Response:', response.data);

                // Update data fetching logic to pull from the 'suppliers' key
                const dataFromResponse = response.data.data?.suppliers || [];  // Mengambil data dari key 'suppliers'
                if (Array.isArray(dataFromResponse)) {
                    setData(dataFromResponse);
                } else {
                    console.error('Data is not an array:', dataFromResponse);
                    setError('Invalid data format received');
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url, stableParams, dataKey]);

    return { data, isLoading, error };
}



export function useCreateData(url: string, params: any = {}) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const createData = async (newData: any) => {
        setIsSubmitting(true);
        try {
            console.log('Request Payload:', newData); // Debugging line
            const response = await axiosInstance.post(url, newData, { params });
            console.log('Response:', response.data); // Debugging line
            return response.data;
        } catch (err) {
            console.error('Error Response:', err); // Debugging line
            throw new Error('Failed to create data');
        } finally {
            setIsSubmitting(false);
        }
    };


    return { createData, isSubmitting };
}


export function useUpdateData(url: string, params: any = {}) {
    const updateData = async (id: string | number, updatedData: any) => {
        try {
            const response = await axiosInstance.put(`${url}/${id}`, updatedData, { params });
            return response.data;
        } catch (err) {
            throw new Error('Failed to update data');
        }
    };

    return { updateData };
}

export function useDeleteData(url: string, params: any = {}) {
    const deleteData = async (id: string | number) => {
        try {
            await axiosInstance.delete(`${url}/${id}`, { params });
        } catch (err) {
            throw new Error('Failed to delete data');
        }
    };

    return { deleteData };
}
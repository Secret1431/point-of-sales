import { api } from "@/lib/axios";
import { Employee } from "@/types/employee";
import { ApiResponse, QueryParam } from "@/types/pagination";

const baseUrl = '/employees';

export const getAllEmployee = async (params: QueryParam) => {
    const response = await api.get<ApiResponse<Employee[]>>(
        baseUrl,
        { params }
    );

    return response.data;
}

export const createEmployee = async (create: Partial<Employee>) => {
    const response = await api.post<ApiResponse<Employee>>(
        baseUrl,
        { create }
    );

    return response.data;
}

export const updateEmployee = async (id: number, update: Partial<Employee>) => {
    const response = await api.put<ApiResponse<Employee>>(
        `${baseUrl}/${id}`,
        update
    );

    return response.data;
}

export const deleteEmployee = async (id: number) => {
    await api.delete(`${baseUrl}/${id}`);
}
import { create } from 'zustand';
import { 
    getAllEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from '../services/employee.service';
import { Employee } from '../types/employee';
import { QueryParam, PaginationMeta } from '@/types/pagination';

interface EmployeeState {
    employees: Employee[];
    pagination: PaginationMeta
    loading: boolean;
    error: string | null;

    fetchEmployee: (params: QueryParam) => Promise<void>
    createEmployee: (employee: Partial<Employee>) => Promise<void>
    updateEmployee: (id: number, employee: Partial<Employee>) => Promise<void>
    deleteEmployee: (id: number) => Promise<void>
    
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
    employees: [],
    pagination: {
        page: 1,
        limit: 10,
        search: '',
        total: 0,
        totalPages: 0
    },
    loading: false,
    error: null,

    fetchEmployee: async (params) => {
        try {
            set({ loading: true, error: null });

            const response = await getAllEmployee(params);

            set({
                employees: response.data,
                loading: false 
            });
        } catch (error: any) {
            set({ loading: false, error: 'Failed to retrieved employee'});
        }
    },

    createEmployee: async (employee) => {
        try {
            set({ loading: true, error: null });

            const response = await createEmployee(employee);

            set((state) => ({
                employees: [...state.employees, response.data] 
            }));
        } catch (error: any) {
            set({ loading: false, error: 'Failed to create employee'});
        }
    },

    updateEmployee: async (id, employee) => {
        try {
            set({ loading: true, error: null });

            const response = await updateEmployee(id, employee);

            set((state) => ({
                employees: state.employees.map((emp) => emp.id === id ? response.data : emp) 
            }));
        } catch (error: any) {
            set({ loading: false, error: 'Failed to updated employee'});
        }
    },

    deleteEmployee: async (id) => {
        try {
            set({ loading: true, error: null });

            await deleteEmployee(id);

            set((state) => ({
                employees: state.employees.filter((emp) => emp.id !== id) 
            }));
        } catch (error: any) {
            set({ loading: false, error: 'Failed to delete employee'});
        }
    }
}))
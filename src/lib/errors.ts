// Error handling utilities

export class AppError extends Error {
    constructor(
        message: string,
        public code?: string,
        public statusCode?: number
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export function handleError(error: unknown): string {
    console.error('Error occurred:', error);

    if (error instanceof AppError) {
        return error.message;
    }

    if (error instanceof Error) {
        // Common error patterns
        if (error.message.includes('fetch')) {
            return 'Network error. Please check your connection and try again.';
        }
        if (error.message.includes('auth')) {
            return 'Authentication error. Please sign in again.';
        }
        if (error.message.includes('permission')) {
            return 'You don\'t have permission to perform this action.';
        }
        return error.message;
    }

    return 'An unexpected error occurred. Please try again.';
}

export function handleSupabaseError(error: any): string {
    if (!error) return 'An error occurred';

    // Supabase-specific error handling
    if (error.code === 'PGRST116') {
        return 'No data found';
    }
    if (error.code === '23505') {
        return 'This record already exists';
    }
    if (error.code === '23503') {
        return 'Invalid reference. Please check your data.';
    }
    if (error.code === '42501') {
        return 'Permission denied. Please check your access rights.';
    }

    return error.message || 'Database error occurred';
}

export async function withErrorHandling<T>(
    fn: () => Promise<T>,
    errorMessage?: string
): Promise<T | null> {
    try {
        return await fn();
    } catch (error) {
        const message = errorMessage || handleError(error);
        console.error(message, error);
        return null;
    }
}

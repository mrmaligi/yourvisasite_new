// Simple toast notification utility
// This is a lightweight implementation that doesn't require external dependencies

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
    message: string;
    type?: ToastType;
    duration?: number;
}

class ToastManager {
    private container: HTMLDivElement | null = null;

    private getContainer() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'fixed top-4 right-4 z-[9999] flex flex-col gap-2';
            document.body.appendChild(this.container);
        }
        return this.container;
    }

    show({ message, type = 'info', duration = 3000 }: ToastOptions) {
        const container = this.getContainer();
        const toast = document.createElement('div');

        const colors = {
            success: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300',
            error: 'from-red-500/20 to-rose-500/20 border-red-500/30 text-red-300',
            warning: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-300',
            info: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-300'
        };

        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };

        toast.className = `glass-card border p-4 rounded-xl backdrop-blur-xl shadow-lg animate-slide-in ${colors[type]} min-w-[300px] max-w-md`;
        toast.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-xl">${icons[type]}</span>
        <p class="text-sm font-medium flex-1">${message}</p>
      </div>
    `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'opacity 0.3s, transform 0.3s';
            setTimeout(() => {
                container.removeChild(toast);
            }, 300);
        }, duration);
    }

    success(message: string) {
        this.show({ message, type: 'success' });
    }

    error(message: string) {
        this.show({ message, type: 'error' });
    }

    warning(message: string) {
        this.show({ message, type: 'warning' });
    }

    info(message: string) {
        this.show({ message, type: 'info' });
    }
}

export const toast = new ToastManager();

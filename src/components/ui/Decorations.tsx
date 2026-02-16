export function OrganicSwirl({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M45.7,143.9C57.4,153.2,74.6,155,87.6,146.9C99.2,139.7,101.4,123.6,98.6,110.5C95.5,96.3,86.6,83.9,74.7,75.8C54.6,62.1,28.3,60.8,9.5,76.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function WheatStalk({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 100 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M50 180V20M50 20L30 40M50 20L70 40M50 50L30 70M50 50L70 70M50 80L30 100M50 80L70 100M50 110L30 130M50 110L70 130"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function GlowOrb({ className }: { className?: string }) {
    return (
        <div
            className={`absolute bg-brand-accent/20 blur-[120px] rounded-full mix-blend-multiply pointer-events-none ${className}`}
        />
    );
}

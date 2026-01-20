type ProgressLightsProps = {
    total: number;
    current: number;
};

export default function ProgressLight({ total, current }: ProgressLightsProps) {
    return (
        <div className="flex items-center gap-3">
            {Array.from({ length: total }).map((_, index) => {
                const step = index + 1;
                const isActive = step <= current;

                return (
                    <div
                        key={step}
                        className={`h-3 w-3 rounded-full transition-colors ${isActive ? "bg-green-500" : "bg-gray-300"
                            }`}
                    />
                );
            })}
        </div>
    )
}
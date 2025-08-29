import PinoPretty from "pino-pretty";
import type { PrettyOptions } from "pino-pretty";

export default (opts: PrettyOptions) =>
    PinoPretty({
        ...opts,
        customPrettifiers: {
            time: (time) => {
                return time.toString().split(".")[0] ?? time.toString();
            },

            level: (level) => {
                const levels: Record<string, string> = {
                    60: "💀",
                    50: "🚨",
                    40: "⚠️",
                    30: "✨",
                    20: "🐛",
                    10: "🔍",
                };

                return levels[level.toString()] || level.toString();
            },
        },
    });

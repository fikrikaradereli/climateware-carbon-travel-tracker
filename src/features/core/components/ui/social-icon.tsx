export type SocialProvider = "google" | "facebook";

export interface SocialIconProps {
    provider: SocialProvider;
    size?: number;
    className?: string;
}

function GoogleIcon({ size }: { size: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="48 18 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M66.4764 26.3633H58V29.8446H62.8436C62.635 30.9696 62.0009 31.9228 61.0477 32.561V34.8192H63.9564C65.6582 33.2524 66.64 30.9451 66.64 28.2042C66.64 27.566 66.5827 26.9524 66.4764 26.3633Z"
                fill="#4285F4"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M63.9561 34.8205L61.0475 32.5623C60.2416 33.1023 59.2107 33.4214 57.9998 33.4214C55.6557 33.4214 53.6716 31.8382 52.9638 29.7109H49.957V32.0428C51.4379 34.9841 54.4816 37.0009 57.9998 37.0009C60.4298 37.0009 62.467 36.195 63.9561 34.8205Z"
                fill="#34A853"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M52.6818 28.0008C52.6818 27.4076 52.7841 26.8308 52.9641 26.2908V23.959H49.9573C49.3477 25.174 49 26.5485 49 28.0008C49 29.4531 49.3477 30.8276 49.9573 32.0426L52.9641 29.7108C52.7841 29.1708 52.6818 28.594 52.6818 28.0008Z"
                fill="#FBBC05"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M61.4402 23.9255L64.0216 21.3441C62.4629 19.8918 60.4257 19 57.9998 19C54.4816 19 51.4379 21.0168 49.957 23.9582L52.9638 26.29C53.6716 24.1627 55.6557 22.5795 57.9998 22.5795C59.3211 22.5795 60.5075 23.0336 61.4402 23.9255Z"
                fill="#EA4335"
            />
        </svg>
    );
}

function FacebookIcon({ size }: { size: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="18 18 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <path
                d="M37 28.0548C37 23.0527 32.9718 19 28 19C23.0282 19 19 23.0527 19 28.0548C19 32.5741 22.2912 36.3202 26.5938 37V30.6723H24.3075V28.0548H26.5938V26.0598C26.5938 23.7906 27.9365 22.5372 29.9931 22.5372C30.978 22.5372 32.0079 22.7139 32.0079 22.7139V24.9411H30.8727C29.755 24.9411 29.4062 25.6392 29.4062 26.3552V28.0548H31.9023L31.5031 30.6723H29.4062V37C33.7088 36.3202 37 32.5741 37 28.0548Z"
                fill="#1877F2"
            />
        </svg>
    );
}

export function SocialIcon({ provider, size = 24, className }: SocialIconProps) {
    return (
        <span className={className} style={{ display: "inline-flex", width: size, height: size }}>
            {provider === "google" ? <GoogleIcon size={size} /> : <FacebookIcon size={size} />}
        </span>
    );
}

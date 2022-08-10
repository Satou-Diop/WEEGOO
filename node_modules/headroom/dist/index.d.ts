declare const headroom: (target?: string | Element, { useStyle, wait }?: {
    useStyle?: boolean | undefined;
    wait?: number | undefined;
}) => () => void;
export { headroom };

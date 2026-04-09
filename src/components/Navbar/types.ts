export type NavbarProps = {
    variant?: 'HOME' | 'JOB';
    inputValue?: string;
    onChangeInput?: (value: string) => void;
    onSearch?: (value: string) => void;
    checkLogin?: boolean;
    onCloseLoginRequest?: () => void;
};

export type FooterCol = {
    title: string;
    items: Array<{ label: string; subLabel?: string }>;
};

export type PopularTagProps = {
    redirectToJobList?:(value: string) => void;
}
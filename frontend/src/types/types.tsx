export interface JournalCardProps {
    id: string
    title: string
    date: string
    description: string
    hashtags: string[]
    isPinned?: boolean
    onPinChange?: () => Promise<void>
}

export interface AddUpdateModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave?: (note: { title: string; content: string; tags: string[] }) => void
    initialData?: {
        title?: string
        content?: string
        tags?: string[]
    }
}


export interface NavbarProps {
    brandName?: string
    userName?: string
    userInitials?: string
    onSearch: (query: string) => void
    onLogout?: () => void
    signedIn?: boolean
    isLoading?: boolean
}

export interface DashboardProps {
    search: string
}

export interface UserNoteResponseItem {
    _id: string;
    userId: string;
    title: string;
    date: string;
    description: string;
    hashtags: string[];
    isPinned?: boolean;
}

export interface Note {
    title: string; content: string; tags: string[]
}
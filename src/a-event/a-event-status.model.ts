export const AEventStatuses = {
    DRAFT: 'Draft',
    PUBLISHED: 'Published',
    CANCELED: 'Canceled',
} as const;

export type AEventStatus = (typeof AEventStatuses)[keyof typeof AEventStatuses];

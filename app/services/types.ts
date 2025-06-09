export interface Profile {
    id: string;
    companyName: string;
    industry: string;
    size: string;
    markdown?: string;
    createdAt: string;
    updatedAt: string;
    status: 'draft' | 'complete';
    [key: string]: any;
}

export interface Timeline {
    phases: any[];
    riskFactors: any[];
    competitiveContext: any;
    [key: string]: any;
} 
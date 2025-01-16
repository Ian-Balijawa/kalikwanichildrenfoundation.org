import { BaseEntity } from './common';
import { DemandType } from './enums';
import { Stage } from './demand';

export type Workflow = BaseEntity & {
    stages: Stage[];
    name: string;
    description: string;
    demandTypes: DemandType[];
};

export type CreateWorkflowInput = {
    name: string;
    description: string;
    demandTypes: DemandType[];
    stages: Stage[];
    id?: number;
};

export type UpdateWorkflowInput = Partial<CreateWorkflowInput>;

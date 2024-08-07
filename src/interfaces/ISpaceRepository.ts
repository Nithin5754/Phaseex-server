// `/invite?workspace=${getSingleWorkSpace.id}&username=${userId}&notificationId=12345&senderId`;

import { WorkspaceDataType } from "../Entities/WorkspaceDataType";

interface ISpaceRepository {
  create(workspaceData: Partial<WorkspaceDataType>): Promise<WorkspaceDataType>;
  findByName(workspace_name: string): Promise<WorkspaceDataType | null>;
  findAllByUser(
    workspaceOwner: string,

  ): Promise<WorkspaceDataType[] | null>;
  findAllByUserLength(workspaceOwner: string): Promise<number>;
  findAllOnGoing(workspaceOwner: string): Promise<WorkspaceDataType[] | null>;
  changeVisibility(id: string, workspaceOwner: string): Promise<boolean>;
  findSingleWorkSpace(workspace_id: string): Promise<WorkspaceDataType | null>;
  findWorkSpaceByName(title: string): Promise<boolean>;
  findAllSpaceByOwner(
    workspaceOwner: string
  ): Promise<WorkspaceDataType[] | null>;
  addCollaboratorsToSpace(
    workspaceId: string,
    collaboratorId: string
  ): Promise<boolean>;
  allCollaboratorInSpace(
    workspaceId: string
  ): Promise<WorkspaceDataType | null>;
  findByIdForName(id: string): Promise<string | null>;

  deleteCollaboratorsToSpace(
    workspaceId: string,
    collaboratorId: string
  ): Promise<boolean>;

  updateCollaboratorsVerified(
    workspaceId: string,
    collaboratorId: string
  ): Promise<boolean>;


  /**
   * 
   * @param workspaceId 
   * @param collaboratorId 
   * @param role [viewer,manager,developer]
   */
  updateCollaboratorsRole(
    workspaceId: string,
    collaboratorId: string,
    role:string
  ): Promise<boolean>;

  deleteWorkspace(workspaceId: string): Promise<boolean>;

  findInvitedSpace(assigneeId: string,active:boolean): Promise<WorkspaceDataType[] | null>;
}

export default ISpaceRepository;

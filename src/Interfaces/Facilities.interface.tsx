export interface FacilitiesProps {
  _id: string;
  name: string;
  createdBy: {
    _id: string;
    userName: string;
  };
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}



export interface FacilitieRow{
    _id: string;
    name:string
   createdBy?: {
    _id: string;
    userName: string;
  } | string;
  createdAt: string; // ISO date string
}
 


 export interface FacilitieDetailsProps {
  open: boolean;
  onClose: () => void;
  facility: FacilitieRow | null;
}




export interface CreateFacilitieProps {
  name:string; 
}










export interface CreateNewFacilitieProps{
 open: boolean;
  onClose: () => void;
  title: string | null;
  handleCreateNewFacilitie:(data:CreateFacilitieProps)=>Promise<void>;
  handleUpdateCurrentFacilitie:(data:CreateFacilitieProps,addId:string)=>Promise<void>;
  error:string | null;
  selectedFacilitie:FacilitieRow

}






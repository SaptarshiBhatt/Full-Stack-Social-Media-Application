export interface FileType {
  data: {
    id: string;
    storage: string;
    filename_disk: string;
    filename_download: string;
    title: string;
    type: string;
    folder: any;
    uploaded_by: string;
    created_on: string;
    modified_by: any;
    modified_on: string;
    charset: any;
    filesize: number;
    width: number;
    height: number;
    duration: any;
    embed: any;
    description: any;
    location: any;
    tags: any;
    metadata: Metadata;
    focal_point_x: any;
    focal_point_y: any;
    tus_id: any;
    tus_data: any;
    uploaded_on: string;
  };
}

export interface Metadata {}

export interface Game{
    id: number;
    thumbnail: string;
    title: string;
    short_description: string;
    description: string;
    minimum_system_requirements:{
        os: string;
        processor: string;
        memory: string;
        graphics: string;
        storage: string;
    };
    screenshots:[
        {
            id: number;
            image: string;
        }
    ];
    release_date: string;
    developer: string;
    genre: string;
    platform: string;
}



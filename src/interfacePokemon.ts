interface Pokemon{
    name: string,
    id: string,
    types: Types[]; // types:[{type:{name:"fire"}}]
    sprites: {
        other:{
            dream_world:{
                front_default:string
            }
        }
    }
    url: string,

}

interface Types{
    type:{          //{type:{name:"fire"}}
        name:string
    };   

}

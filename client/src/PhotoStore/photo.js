import {create} from 'zustand'

export const usePhotoStore = create((set)=>({
    photos: [],
    setPhotos: (photos)=> set({ photos }),
    createPhoto: async(newPhoto) =>{
        if(!newPhoto.name || !newPhoto.image){
            return {success: false, message:"Provide All fields"}
        } 
        const res = await fetch('/api/photo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPhoto)
        })
        const data = await res.json()
        set((state)=>{{photos:[...state.photos, data.data]}})
        return {success: true, message:"Photo uploaded successfully"}
    }
}))
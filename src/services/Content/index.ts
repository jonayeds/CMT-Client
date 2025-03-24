"use server"


export const uploadContentToDropbox = async(files:File[])=>{
    try {
        const fileUrls:string[] =[]
        for(const file of files){

            const fileData = await file.arrayBuffer()
            const response = await fetch("https://content.dropboxapi.com/2/files/upload", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.DROPBOX_ACCESS_TOKEN}`,
                    "Content-Type": "application/octet-stream",
                    "Dropbox-API-Arg": JSON.stringify({
                        path: `/${file.name}`, 
                        mode: "add",
                        autorename: true,
                        mute: false,
                    })
                },
                body: fileData,
            });
            if (!response.ok) {
                return {succes:false, message:"Something went wrong!!!"}
            }
            
            const data = await response.json();

            const publicUrl = await getDropBoxPublicUrl(data.path_lower)
            fileUrls.push(publicUrl)
            
        }
            
        
        return {fileUrls}
    } catch (error) {
        console.log(error)
    }
}


export const getDropBoxPublicUrl = async(filePath:string)=>{
    const res = await fetch("https://api.dropboxapi.com/2/sharing/list_shared_links",{
        method:"POST",
        headers:{
            "Authorization": `Bearer ${process.env.DROPBOX_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            path:filePath
        })
    })
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Dropbox API Error: ${errorText}`);
      }
    const isLinkExists = await res.json()
    if(isLinkExists.links.length > 0){
        return isLinkExists.links[0].url
    }
    const response = await fetch("https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.DROPBOX_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: filePath,  
          settings: {
            requested_visibility: "public"
          }
        }),
    })
    
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Dropbox API Error: ${errorText}`);
  }

  const data = await response.json();
  return data.url; 
}
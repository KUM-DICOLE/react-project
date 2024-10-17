

export default function AvatarGenerator(text?:string){
    return `https://api.multiavatar.com/${text || "random"}.png`;
} 
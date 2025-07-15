import { useState, useEffect } from "react"
export default function TeamField({ value, onInputChange }){
    const [LogoUrl, setLogoUrl] = useState(value.Logo || null)
    
    useEffect(() => {
        if (value.Logo && typeof value.Logo === String) {
            setLogoUrl(value.Logo);
        }
    }, [value.Logo]);

    const handleLogoChange = (file) => {
        const previewUrl = URL.createObjectURL(file);
        setLogoUrl(previewUrl);
        onInputChange("Logo", file);
    };
    return(
        <>
            <label className="flex flex-col font-2xl text-bold text-gray-600 text-center">
                Team Name
                <input type="text" id="team-name-imput" value={value.Name} onChange={(e) => onInputChange("Name", e.target.value)}/>
            </label>
            <label className="flex flex-col font-2xl text-bold text-gray-600 text-center">
                Team Logo
                <img className="w-15 h-fit" src={LogoUrl} alt="" />
                <input type="file" id="team-logo-input" 
                    onChange={ (e) => handleLogoChange(e.target.files[0]) }
                />
            </label>
        </>
    )
}
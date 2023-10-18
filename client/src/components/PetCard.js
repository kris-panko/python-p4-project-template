import React, { useEffect, useState } from "react";

function PetCard({ xurl,pet,currUser,postFavorites,removeFavroite }) {
    const { name, breed, image, type, id, favorites } = pet
    const [inFavorite, setInFavorite] = useState(false)

    function onClick(e){
        if(inFavorite){
            const fav_hold = favorites.find((fav)=>fav.user_id===currUser.id)
            fetch(`${xurl}/favorites/${fav_hold.id}`,{method:"DELETE"})
            .then((r)=>{
                if(r.ok){
                removeFavroite(fav_hold.id)
                setInFavorite(false)
            }})
        }else{
            const data = {
                user_id:currUser.id,
                pet_id:id,
            }
            fetch(`${xurl}/favorites`,{method:"POST",headers:{"Content-Type":"application/json"},body: JSON.stringify(data)})
            .then(r => r.json())
            .then(d=>postFavorites(d))
        }
    }
    useEffect(()=>{
        if(currUser !== ""){
            if(currUser.favorites.find((searchPet)=>searchPet.pet_id===id)){setInFavorite(true)}
        }
    },[pet])
    return (
        <li className="card">
            <h4>{name}</h4>
            <img src={image} alt={name} />
            <p>Type: {type}</p>
            <p>Breed: {breed}</p>
            {inFavorite ? (
                <>
                    <button onClick={onClick} > Unfavorite </button>
                    <button >Adopt</button>
                </>
            ) : (
                <>
                    <button onClick={onClick} className="primary"> Favorite </button>
                </>
            )}
        </li>
    );
}

export default PetCard;

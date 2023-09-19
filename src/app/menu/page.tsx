import { MenuType } from "@/types/types";
import Link from "next/link";

const getData = async () =>{
    const res= await fetch('http://localhost:3000/api/categories', {
        cache:"no-store"
    })
    if(!res.ok){
        throw new Error('Failed!')
    }
    return res.json()
}

const MenuPage = async () => {

    const menu:MenuType = await getData()

    return (
        <div className="h-[calc(80vh-5rem)] md:h-[calc(66vh-5rem)] w-[95vw] mx-auto flex flex-col md:flex-row items-center justify-center">
            {menu.map(category =>
             <Link href={`/menu/${category.slug}`} key={category.id} className="flex w-[80%] m-3 h-1/4 sm:h-1/2 bg-cover p-8 rounded-3xl shadow-xl" style={{backgroundImage: `url(${category.img})`}}>
                <div className="w-1/2" style={{color: `${category.color}`}}>
                    <h1 className="uppercase font-bold text-3xl">{category.title}</h1>
                    <p className="text-sm my-8 hidden sm:flex">{category.desc}</p>
                    <button className={`hidden 2xl:block py-2 px-4 rounded-md shadow-sm`} style={{backgroundColor : `${category.color === "black" ? "rgb(253 224 71)" : "white"}`, color:`${category.color === "black" ? "white" : "red"}`}}>Explore</button>
                </div>
             </Link>
            )}
        </div>
    );
};

export default MenuPage;
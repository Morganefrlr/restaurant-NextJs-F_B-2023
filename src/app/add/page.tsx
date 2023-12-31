'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Inputs ={
    title:string,
    desc:string,
    price:number,
    catSlug:string
}
type Option ={
    title:string,
    additionalPrice:number,
}

const AddPage = () => {

    const {data:session,status} = useSession()
    const [inputs, setInputs] = useState<Inputs>({
        title:"",
        desc:'',
        price:0,
        catSlug:''
    })

    const [option, setOption] = useState<Option>({
        title:"",
        additionalPrice:0
    })
    const [options, setOptions] = useState<Option[]>([])
    const [file, setFile] = useState<File>()
    const router = useRouter()

    if(status === 'loading'){
        return <p>Loading....</p>
    }
    if(status === 'unauthenticated' || !session?.user.isAdmin){
        router.push('/')
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setInputs(prev => {
            return{...prev,[e.target.name] : e.target.value}
        })

    }
    const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOption((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
      };
    const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const target = e.target as HTMLInputElement
        const item = (target.files as FileList)[0]
        setFile(item)
    }

      const upload = async () =>{
        const data = new FormData()
        data.append('file', file!)
        data.append("upload_preset", "restaurant");
        const res = await fetch('https://api.cloudinary.com/v1_1/dtqyjsd41/image/upload',{
            method: "POST",
            
            body: data,
        })
        const resData = await res.json()
        return resData.url
      }

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        
        try{
            const url = await upload()
            const res = await fetch('http://localhost:3000/api/products',{
                method:'POST',
                body: JSON.stringify({
                    img:url,
                    ...inputs,
                    options
                })
            })
            const data = await res.json()
            router.push(`/product/${data.id}`)
        }
        catch(err){
            console.log(err)
        }
      }

    return (
        <div className="flex ">
            <form className="flex shadow-lg flex-wrap gap-4 p-8 bg-yellow-400 w-[70vw] my-10 pt-5 text-gray-800 rounded-xl mx-auto" onSubmit={handleSubmit}>
                <h1 className="text-2xl text-center w-full font-semibold">Add new Product</h1>
                <div className="w-full flex flex-col gap-2">
                    <label>Image</label>
                    <input className="ring-1 ring-red-500 p-2 rounded-sm" type="file" onChange={handleChangeImg}/>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label>Title</label>
                    <input onChange={handleChange} className="ring-1 ring-red-500 p-2 rounded-sm" type="text" name="title" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label>Description</label>
                    <textarea onChange={handleChange} className="ring-1 ring-red-500 p-2 rounded-sm" name="desc" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label>Price</label>
                    <input onChange={handleChange} className="ring-1 ring-red-500 p-2 rounded-sm" type="number" name="price" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label>Category</label>
                    <input onChange={handleChange} className="ring-1 ring-red-500 p-2 rounded-sm" type="text" name="catSlug" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label>Options</label>
                    <div>
                        <input onChange={changeOption} className="ring-1 ring-red-500 p-2 rounded-sm" type="text" placeholder="Title" name="title" />
                        <input onChange={changeOption} className="ring-1 ring-red-500 p-2 rounded-sm" type="number" placeholder="AdditionalPrice" name="additionalPrice" />
                    </div>
                    <div className="w-52 bg-red-500 text-white p-2" onClick={() => setOptions((prev) => [...prev, option])}>Add Option</div>
                </div>
                <div>
                    {options && options.map(item => 
                        <div className="ring-1 p-2 ring-red-500 rounded-sm flex gap-2" key={item.title} onClick={() =>setOptions(options.filter(el => el.title !== item.title))}>
                            <span>{item.title}</span>
                            <span>${item.additionalPrice}</span>
                        </div>
                    )}
                </div>
                <button type="submit" className="p-2 w-full bg-red-500 text-white">Submit</button>
            </form>
        </div>
    );
};

export default AddPage;
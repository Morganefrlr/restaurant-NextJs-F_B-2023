import Featured from '@/components/Featured'
import Offer from '@/components/Offer'
import Start from '@/components/Start'

import { ProductType } from '@/types/types';

const getData = async () =>{
    const res= await fetch('http://localhost:3000/api/products', {
        cache:"no-store"
    })
    console.log(res)
    if(!res.ok){
      
        throw new Error('Failed!')
    }
    return res.json()
}


const Home = async () =>  {

  const featuredProducts:ProductType[] = await getData()


  return (
    <div>
      <Start />
      <Featured products={featuredProducts}/>
      <Offer/>
    </div>
  )
}

export default Home;

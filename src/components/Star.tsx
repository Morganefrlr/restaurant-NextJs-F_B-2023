import { AiFillStar } from "react-icons/ai";


type Props = {
    rate:number
} 

const Star: React.FC<Props> = ({rate}) => {

    let stars = []

    for(let i= 0; i<5 ; i++){
        if(i < rate){
            stars.push('text-yellow-300')
        }else{
            stars.push('text-gray-200')
        }
    }

    return (
        <div className="flex text-2xl">
            {stars.map((item, index) =>
                <AiFillStar key={index} className={item}/>
            
            )}
        </div>
    );
};

export default Star;
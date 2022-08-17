import { add, list, remove, update } from "@/api/products";
import { toast } from "react-toastify";
import useSWR from "swr";

const useProduct =()=>{
    const feach = async (url:string)=>{
        const {data}= await list(url);
        return data
    }
    const {data,error,mutate} = useSWR("products",feach,{
        dedupingInterval:5000
    })
    const create = async (item:any)=>{
        const {data:product} = await add(item)
        toast.success("thanh 2")
        return [...data,product]

    }
    const onupdate = async (item:any)=>{
        const {data} = await update(item)
        toast.success("thanh 1")

    }
    const onRemove = async (id:any)=>{
        if(confirm('Are you sure you')){
            await remove(id)
            toast.success("thanh comnh")
            return (data.filter(item=>item.id !== id))
        }
        else{
            return false
        }

    }
return{data,
mutate,
onupdate,onRemove,create,error}
}
export default useProduct
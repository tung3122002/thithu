
import { read } from '@/api/products'
import useProduct from '@/hooks/products'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { type } from 'os'
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

type Props = {
    product:any
}
type Iproduct ={
    name: string,
    img: string,
    price: number,
    description: string
}
const ADD = (props: Props) => {
    const {id} =useParams()
    const { data, mutate, error, onupdate } = useProduct()
    const router =useRouter()
    useEffect (()=>{
        const getProduct =async ()=>{
            const {data}= await read(props.product.id)
            reset(data)
        }
        getProduct()
    },[id])
    const {register,handleSubmit,formState:{errors},reset}= useForm<Iproduct>()
    const onSubmit :SubmitHandler<Iproduct>=(data)=>{
        mutate(onupdate(data))
        router.push("/products")
    }
    return (
        <div>
            <Head>

                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossOrigin="anonymous" />

            </Head>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("name",{required:"Vui long nhap"})} />
                    <div id="emailHelp" className="form-text">{errors.name?.message}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Img</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("img",{required:"Vui long nhap"})} />
                    <div id="emailHelp" className="form-text">{errors.img?.message}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("description",{required:"Vui long nhap"})} />
                    <div id="emailHelp" className="form-text">{errors.description?.message}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">price</label>
                    <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("price",{required:"Vui long nhap"})} />
                    <div id="emailHelp" className="form-text">{errors.price?.message}</div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}
 export const getServerSideProps:GetServerSideProps= async (context: GetServerSidePropsContext) => {
    const product= await (await fetch(`http://localhost:3001/products/${context.params?.id}`)).json()
    return {
        props:{product}
    }

 }
export default ADD
import useProduct from '@/hooks/products'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type Props = {}

const Products = (props: Props) => {
    const { data, mutate, error, onRemove } = useProduct()
    if (!data) return <div>Loading...</div>
    if (error) return <div>Error loading...</div>
    return (
        <div>
            <Head>

                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossOrigin="anonymous" />

            </Head>
            <Link href="/products/add">ADD Products</Link>
            <table className="table">
  <thead>

    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
 
   {data.map((item:any)=>(
       <tr key={item.id}>
       <th scope="row">{ item.id }</th>
       <td>{ item.name }</td>
       <td>{ item.img }</td>
       <td>{ item.description }</td>
       <td>{ item.price }</td>
       <td><Link href= {`/products/${ item.id }`}>EDIT</Link></td>
       <td><button onClick={()=>{mutate(onRemove(item.id ))}}>DELETE</button></td>
     </tr>
   ))}
  </tbody>
</table>
<ToastContainer />
        </div>
    )
}

export default Products
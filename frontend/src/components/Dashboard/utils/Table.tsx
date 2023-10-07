import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { ProductContext } from '../../../context/ProductContext';
import { Link } from 'react-router-dom';

type Props = {
  names: {
    id: string,
    name: string,
    max_price: string,
    min_price: string,
    cost: string,
    current: string,
    staging_price: string,
    owner: number
  }[]
}

export const Table = (props: Props) => {
  const { setProduct } = useContext(ProductContext)
  const data = Array.from(props.names);

  return (
    <div className='overflow-x-auto'>
      <table className='border-collapse bg-[white] text-left text-midnight w-full'>
        <thead className='table-shadow'>
          <tr>
            <th className='th-styles text-start'>ID</th>
            <th className='th-styles text-start'>Name</th>
            <th className='th-styles text-end'>Min Price</th>
            <th className='th-styles text-end'>Max Price</th>
            <th className='th-styles text-end'>Cost</th>
            <th className='th-styles text-end'>{data[0]?.staging_price ? 'Current Price' : 'Current'}</th>
            {data[0]?.staging_price ? <th className='th-styles text-end'>Suggested Price</th> : null}
            <th className='th-styles text-start'>Edit</th>
          </tr>
        </thead>

        <tbody className='[&>*:nth-child(even)]:bg-[#f8f7f9]'>
          {
            data.map(product => {
                return (
                  <tr className='hover:bg-[#ebebeb]' key={product.id}>
                    <td className='td-styles'>
                      <span className='bg-midnight text-[white] px-[8px] py-[3px] rounded-lg'>{product.id}</span>
                    </td>
                    <td className='td-styles max-w-[300px] overflow-hidden'>{product.name}</td>
                    <td className='td-styles amount'>${product.min_price}</td>
                    <td className='td-styles amount'>${product.max_price}</td>
                    <td className='td-styles amount'>${product.cost}</td>
                    <td className='td-styles amount'>${product.current}</td>
                    {product.staging_price ? <td className='td-styles amount'>${product.staging_price}</td> : null}
                    <td key={product.id} className='td-styles text-center'>
                      <Link to="edit" onClick={() => {
                        setProduct({
                          id: product.id,
                          name: product.name,
                          min: Number(product.min_price),
                          max: Number(product.max_price),
                          cost: Number(product.cost),
                          current: Number(product.current),
                          staging: product.staging_price ? Number(product.staging_price) : null,
                        })
                      }}>
                        <FontAwesomeIcon icon={faPenToSquare} className='w-[18px] h-[18px]' />
                      </Link>
                    </td>
                  </tr>
                )
              })
          }
        </tbody>
      </table>
    </div>
  );
}

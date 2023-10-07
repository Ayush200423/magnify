import * as React from 'react';
import { Header } from '../../components/Dashboard/Header';
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { FormTextField } from '../../components/utils/FormTextField';
import { SubmitButton } from '../../components/Dashboard/utils/SubmitButton';
import AuthContext from '../../context/AuthContext';
import { useEditProduct } from '../../hooks/dashboard/useEditProduct';
import { Notice } from '../../components/utils/Notice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDeleteProduct } from '../../hooks/dashboard/useDeleteProduct';
import { useFreeAccountEffect } from '../../components/Dashboard/useFreeAccountEffect';
import { toast } from 'react-toastify';

export const EditProduct = () => {
  
  useFreeAccountEffect()

  const { product } = useContext(ProductContext)
  
  const sm_width = 300
  const lg_width = 500

  const [name, setName] = useState<string|null>(product.name);
  const [min, setMin] = useState<string|null>(product.min);
  const [max, setMax] = useState<string|null>(product.max);
  const [cost, setCost] = useState<string|null>(product.cost);
  const [suggested, setSuggested] = useState<string|null>(product.staging);

  const [deleteItem, setDeleteItem] = useState<boolean>(false)

  const { authTokens } = useContext(AuthContext)
  const [notice, setNotice] = useState<string>('');

  const { mutate: EditMutate, isLoading: EditLoading } = useEditProduct(setNotice)
  const { mutate: DeleteMutate, isLoading: DeleteLoading } = useDeleteProduct()

  const changeProduct = () => {
    EditMutate(
      {
        access: authTokens?.access ?? '',
        name: name ?? '',
        min: Number(min) ?? 0,
        max: Number(max) ?? 0,
        cost: Number(cost) ?? 0,
        id: product.id,
        suggested: suggested != null ? Number(suggested) : -1
      }
    )
  }

  const deleteProduct = () => {
    if (deleteItem) {
      DeleteMutate(
        {
          access: authTokens?.access ?? '',
          id: product.id
        }
      )
    } else {
      setDeleteItem(true)
      toast.warning('Deleting a product is permanent!')
    }
  }

  return (
    <div>
      <Header />

      <div className="md:text-[35px] text-[25px] font-black w-full my-[10px] flex justify-center">Edit Product</div>

      <div className={`flex justify-center h-[30px] items-center w-[100vw]`}>
        <Notice notice={notice} />
      </div>

      <div className='flex w-full flex-col items-center justify-center sidebar'>
        <label>
          <div className='text-[14px]'>
            ID
          </div>
          <input value={product.id} type="text" id={"id"} placeholder="ID" readOnly className='w-[300px] px-[20px] py-[12px] mt-[8px] mb-[24px] rounded-md box-border border-[2px] border-[#d5d6d5] bg-[#eeeeee] text-[#909192] focus:outline-none inline-block text-[14px] sm:w-[500px]' />
        </label>

        <div>
          <FormTextField placeholder='Name' label='Name' val={product.name} sm_width={sm_width} lg_width={lg_width} setValue={setName} />
          <FormTextField placeholder='Min Price' label='Min' val={product.min} digitOnly={true} sm_width={sm_width} lg_width={lg_width} setValue={setMin} />
          <FormTextField placeholder='Max Price' label='Max' val={product.max} digitOnly={true} sm_width={sm_width} lg_width={lg_width} setValue={setMax} />
          <FormTextField placeholder='Cost Price' label='Cost' val={product.cost} digitOnly={true} sm_width={sm_width} lg_width={lg_width} setValue={setCost} />
        </div>

        <label>
          <div className='text-[14px]'>
            Current
          </div>
          <input value={product.current} type="text" id={"current"} placeholder="Current" readOnly className='w-[300px] px-[20px] py-[12px] mt-[8px] mb-[24px] rounded-md box-border border-[2px] border-[#d5d6d5] bg-[#eeeeee] text-[#909192] focus:outline-none inline-block text-[14px] sm:w-[500px]' />
        </label>

        {product.staging ? <FormTextField placeholder='Suggested Price' label='Suggested' val={product.staging} digitOnly={true} sm_width={sm_width} lg_width={lg_width} setValue={setSuggested} /> : null}

        <div className="mb-[20px]">
          <button className={`w-[${sm_width}px] default-submit-btn-styling bg-[#ea5d5e] sm:w-[${lg_width}px] flex justify-center items-center`} onClick={ deleteProduct } disabled={DeleteLoading} >
            <span className='mr-[5px]'>
              <FontAwesomeIcon icon={faTrash} style={{color: "#ffffff",height: '14px'}} />
            </span>
            <span className='ml-[5px]'>
              {deleteItem ? 'Confirm delete' : 'Delete'}
            </span>
          </button>
        </div>

        <div className="mb-[20px]">
          <button className={`w-[${sm_width}px] default-submit-btn-styling background-gradient sm:w-[${lg_width}px]`} onClick={ changeProduct } disabled={EditLoading} >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
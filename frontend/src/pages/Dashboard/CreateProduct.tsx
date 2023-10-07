import * as React from 'react';
import { Header } from '../../components/Dashboard/Header';
import { FormTextField } from '../../components/utils/FormTextField';
import { useContext, useState } from 'react';
import { useCreateProduct } from '../../hooks/dashboard/useCreateProduct';
import { Notice } from '../../components/utils/Notice';
import AuthContext from '../../context/AuthContext';
import { useFreeAccountEffect } from '../../components/Dashboard/useFreeAccountEffect';

export const CreateProduct = () => {

  useFreeAccountEffect()

  const sm_width = 300
  const lg_width = 500

  const [name, setName] = useState<string|null>(null);
  const [min, setMin] = useState<string|null>(null);
  const [max, setMax] = useState<string|null>(null);
  const [cost, setCost] = useState<string|null>(null);
  const [initial, setInitial] = useState<string|null>(null);

  const { authTokens } = useContext(AuthContext)
  const [notice, setNotice] = useState<string>('');

  const { mutate, isLoading } = useCreateProduct(setNotice)

  const appendProduct = () => {
    mutate(
      {
        access: authTokens?.access ?? '',
        name: name ?? '',
        min: Number(min) ?? 0,
        max: Number(max) ?? 0,
        cost: Number(cost) ?? 0,
        initial: Number(initial) ?? 0
      }
    )
  }

  return (
    <div>
      <Header />

      <div className="md:text-[35px] text-[25px] font-black w-full my-[10px] flex justify-center">Create Product</div>

      <div className={`flex justify-center h-[30px] items-center w-[100vw]`}>
        <Notice notice={notice} />
      </div>

      <div className='flex w-full flex-col items-center justify-center sidebar'>
        <FormTextField placeholder='Name' label='Name' val={''} sm_width={sm_width} lg_width={lg_width} setValue={setName} />
        <FormTextField placeholder='Minimum Price' label='Minimum' val={''} digitOnly={true} sm_width={sm_width} lg_width={lg_width} setValue={setMin} />
        <FormTextField placeholder='Maximum Price' label='Maximum' val={''} digitOnly={true} sm_width={sm_width} lg_width={lg_width} setValue={setMax} />
        <FormTextField placeholder='Total Cost' label='Cost' val={''} digitOnly={true} sm_width={sm_width} lg_width={lg_width} setValue={setCost} />
        <FormTextField placeholder='Current / Initial Price' label='Current / Initial' val={''} digitOnly={true} sm_width={sm_width} lg_width={lg_width} setValue={setInitial} />

        <div className="mb-[20px]">
          <button className={`w-[${sm_width}px] default-submit-btn-styling background-gradient sm:w-[${lg_width}px]`} onClick={ appendProduct } disabled={isLoading}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AccountContext } from '../../../context/AccountContext';
import { toast } from 'react-toastify';

export const AddProduct = () => {
  const { accountData } = useContext(AccountContext)
  const navigate = useNavigate()

  const handeOnClickAddProductAllowed = () => {
    navigate("/products/create")
  }

  const handeOnClickAddProductNotAllowed = () => {
    toast.error(
      <button onClick={() => navigate('/account')}>
        Please delete a product or upgrade your account to add more products.
      </button>
    );
  }

  return (
    <div>
        <button onClick={accountData?.num_remaining_products != 0 ? handeOnClickAddProductAllowed : handeOnClickAddProductNotAllowed} className="flex items-center justify-center w-min p-[6px] px-[16px] rounded-md bg-midnight text-[white]">
            <FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} className='h-[18px] w-[18px] text-[white] pr-[8px]' />
            <span className='text-[14px] whitespace-nowrap'>Add Product</span>
        </button>
    </div>
  );
}

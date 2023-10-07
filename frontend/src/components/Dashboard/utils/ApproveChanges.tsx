import * as React from 'react';
import { useApproveChanges } from '../../../hooks/dashboard/useApproveChanges';
import { useContext } from 'react';
import AuthContext from '../../../context/AuthContext';

export const ApproveChanges = () => {
    const { mutate: ApproveMutate, isLoading: ApproveLoading } = useApproveChanges()
    const { authTokens } = useContext(AuthContext)

    const handleOnClickApproveChanges = () => {
        ApproveMutate(authTokens?.access!)
    }

    return (
        <div>
            <button onClick={handleOnClickApproveChanges} className="flex items-center justify-center w-min p-[6px] px-[16px] rounded-md bg-[green] text-[white]">
                <span className='text-[14px] whitespace-nowrap'>Approve Price Changes</span>
            </button>
        </div>
    );
}

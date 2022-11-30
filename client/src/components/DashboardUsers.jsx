import React from "react";
import {useStateValue} from "../context/StateProvider";
import {motion} from "framer-motion"

export const DashboardUserCard = ({data, index}) => {
    console.log(data, index)
    return(
        <motion.div
            className='relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay
            cursor-pointer '>

            {/* user image */}
            <div className='w-275 min-w-[160px] flex items-center justify-center'>
                <img src={data.imageURL} alt="" className='w-10 h-10 object-cover rounded-md min-w[40px] shadow-md' />
            </div>

            {/* username */}
            <p className='text-base text-white w-275 min-w-[160px] text-center'>{data.name}</p>
            <p className='text-base text-white w-275 min-w-[160px] text-center'>{data.email}</p>
            <p className='text-base text-white w-275 min-w-[160px] text-center'>{data.createdAt}</p>
            <p className='text-base text-white w-275 min-w-[160px] text-center'>{data.role}</p>
        </motion.div>
    )
}

const DashboardUsers = () => {
    const [{ allUsers }, dispatch] = useStateValue();
    return (
        <div className='w-full p-4 flex items-center justify-center flex-col'>
            {/* filters */}

            {/* tabular data form */}
            <div className='relative w-full py-12 min-h-[400px] overflow-x-scroll my-4 flex flex-col items-center justify-start
            p-4 border border-gray-300 rounded-md gap-3'>

                {/* total count of the user */}
                <div className='absolute top-4 left-4'>
                    <p className='text-sm font-bold text-white' >
                    Count : <span className='text-xl font-bold text-white'>{allUsers?.length}</span>
                    </p>
                </div>

                {/* table heading */}
                <div className='w-full min-w-[750px] flex items-center justify-between'>
                    <p className={'text-sm text-white font-bold w-275 min-w-[160px] text-center'}>Image</p>
                    <p className={'text-sm text-white font-bold w-275 min-w-[160px] text-center'}>Name</p>
                    <p className={'text-sm text-white font-bold w-275 min-w-[160px] text-center'}>Email</p>
                    <p className={'text-sm text-white font-bold w-275 min-w-[160px] text-center'}>Created</p>
                    <p className={'text-sm text-white font-bold w-275 min-w-[160px] text-center'}>Role</p>
                </div>

                {/* table body content */ }

                {
                    allUsers && (
                        allUsers?.map((data, i) => (
                            <DashboardUserCard data={data} index={i} />
                    ))
                    )
                }

            </div>
        </div>
    )
}


export default DashboardUsers
import React from 'react'

const chat = () => {
    return (
        <main className='w-full h-screen bg-blue-900 flex text-neutral-100 flex-col justify-between items-center'>
            <div className=' border h-full w-full'>Messages container</div>
            <div className=' w-full h-[10%] border flex'>
                <input className=' w-11/12 h-full' type="text" name="message" id="message" />
                <button className=' flex justify-center items-center w-1/12 font-semibold text-lg'>Send</button>
            </div>
        </main>
    )
}

export default chat
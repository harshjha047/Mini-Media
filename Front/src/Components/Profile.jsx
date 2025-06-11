import React from 'react'

function profile() {
  return (
    <>
    <div className="bg-[#111] w-full h-screen">
      {/* section1 */}
      <div className="w-full h-1/5 bg-[#111]">
        <div className="w-full h-4/6 bg-red-500 relative">
          <div className="w-36 h-36 bg-[#111] rounded-full absolute -bottom-1/2 left-2">
            <img src="https://avatars.githubusercontent.com/u/102410626?v=4" alt="Profile" className="w-full h-full rounded-full border-4 border-[#111]" />
          </div>
        </div>
      </div>
      {/* section2 */}
      <div className="w-full h-2/5  flex items-center flex-col">
        <div className="w-full h-1/5 bg-[#111] px-4 flex justify-center flex-col">
          <div className="text-white text-4xl">Name</div>
          <div className="text-white text-xl">@username</div>
        </div>
        <div className="w-full h-1/5 bg-[#111] flex justify-center items-center">
          <div className="w-11/12 h-5/6 bg-white rounded-full flex items-center justify-center">
          <div className="text-2xl font-semibold">Edit</div>
          </div> 
        </div>
        <div className="w-full h-2/5 bg-[#111] flex justify-center items-center">
          <div className="w-11/12 h-5/6 bg-white rounded-3xl flex items-center justify-around">
          <div className="text-xl font-semibold">100 <br /> Posts</div>
          <div className="text-xl font-semibold">100 <br /> Followers</div>
          <div className="text-xl font-semibold">100 <br />Following</div>
          </div>
        </div>
        <div className="w-full h-1/5 bg-[#111] flex justify-center items-center">
          <div className="w-11/12 h-5/6 bg-white rounded-full flex items-center justify-center">
          <div className="text-2xl font-semibold">Posts</div>
          </div> 
        </div>
      </div>
      {/* section3 */}
      <div className="w-full h-2/5 flex flex-wrap overflow-y-scroll ">

      <div className="w-1/3 h-36 bg-slate-100 border inline-block"></div>
      <div className="w-1/3 h-36 bg-slate-100 border inline-block"></div>
      <div className="w-1/3 h-36 bg-slate-100 border inline-block"></div>
      <div className="w-1/3 h-36 bg-slate-100 border inline-block"></div>
      <div className="w-1/3 h-36 bg-slate-100 border inline-block"></div>
      <div className="w-1/3 h-36 bg-slate-100 border inline-block"></div>
      <div className="w-1/3 h-36 bg-slate-100 border inline-block"></div>

      </div>
    </div>
    </>
  )
}

export default profile
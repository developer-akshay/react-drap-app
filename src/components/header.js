export default function Headers(){
    return(
        <div className="grid grid-cols-12 gap-3 bg-white">
            <div className="col-span-7">
                 <div className="grid grid-cols-5 gap-8 align-items-center">
                    <div className="col-span-2">
                        <img className="h-16 mb-1" width={'100%'} alt="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv1i4rDM-VthY35TwLL0AtCG80vUBlql8PVd5qguLJzSu4SEFy9KUV35NdfsJBTu9_s6o&usqp=CAU"/>
                    </div>
                    <div className="col-span-3 gap-3 flex align-center pt-1">
                        {['About', 'Services', 'Faq', 'Help'].map((item, index)=> {
                            return(
                                <button index={index} className="px-4 capitalize rounded-2xl py-0 text-sm hover:bg-gray-200">{item}</button>
                            )
                        })
                        }
                    </div>
                 </div>
            </div>
            <div className="col-span-3 pr-2 pt-4">
                <input className="border border-gray-300 text-dark-600 px-5 py-1 rounded-md w-full" placeholde="Search questions and answers here...."/>        
            </div>
            <div className="col-span-2 pt-4">
                 <div className="gap-2 flex">
                     <button className="py-1 border border-blue-300 text-blue-500 rounded-5 text-sm  px-3 bg-gray-50">Log in</button>
                     <button className="py-1 px-3 text-white rounded-5 text-sm bg-blue-500">Sign up</button>
                 </div>           
            </div>
        </div>
    )
}
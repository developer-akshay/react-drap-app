import { useCallback, useEffect, useState } from "react"
import { data } from "../apis/api";
import SelectionArea from "@viselect/vanilla";
import Modal from 'react-modal';
import useTable from "./useTable";

const customStyles = {
  content: {
    top: '50%',
    height: '90vh',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '80%',
    transform: 'translate(-50%, -50%)',
  },
};
const filteredDataWIthId = data.map((item, index)=>{
    return {
        ...item, id: index
    }
});
export default function HomePage(){
    const [ page, setPage ] = useState(1);
    const [ datas, setItems ] = useState(filteredDataWIthId);
    const [rowsPerPage, setRows] = useState(30);
    // const [ hasNext, setHasNext ] = useState(false);
    const [ bulk_action, setAction ] = useState(false);
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const totalPage = (data.length / rowsPerPage).toFixed(0);
    const paginations = Array.from(Array(parseInt(totalPage)).keys());
    
     function openModal() {
        setIsOpen(true);
      }
    
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
      }
    
      function closeModal() {
        setIsOpen(false);
      }
    
    function fetchData(pages){
        setPage(pages);
    };

    // console.log(datas.filter((item)=> item.is_selected));

    function onSelectSingle(index) {
        if(!bulk_action){
            const extData = datas;
            extData[index].is_selected = ! extData[index].is_selected;
            setItems([...extData]) 
        }
    }
    function onBulkSelection(index) {
        if(bulk_action){
            const extData = datas;
            extData[index].is_selected = true;
            setItems([...extData]) 
        }
    }
  
    return(
        <section id={'section'}>
            <button onClick={openModal} className="bg-blue-600 px-4 py-2 text-white">Edit Data</button>
             <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                  <MainHeader/>
                 <DataTables rowsPerPage={rowsPerPage} totalPage={totalPage} paginations={paginations} page={page} fetchData={fetchData} setPage={setPage} onBulkSelection={onBulkSelection} setRows={setRows} onSelectSingle={onSelectSingle} datas={datas} setAction={setAction} bulk_action={bulk_action}/>
            </Modal>
        </section>
    )
}

const SubHeader = ()=> {
    return(
        <div className="grid grid-cols-2 my-10">
            <div className="col-span-1">
               <div className="space-x-4">
                   <div className="fa fa-square text-blue-900">  Generated</div>
                   <div className="fa fa-square text-gray-400">  Non Generated</div>
               </div>
               <div className="mt-2">
                    <p>
                        <small>* Click on the desired documentid to change status</small>
                    </p>
                    <p>
                        <small>* Click on the *Bulk Action* button to enable drag anto select and bulk aciton button</small>
                    </p>
               </div>
            </div>    
            <div className="col-span-1 ml-auto pt-5">
                <input placeholder="search..." className="px-3 py-1 rounded border border-gray-200"/>
            </div>   
        </div>
    )
}
const PaginationHeader = ({length, rowsPerPage, totalPage, paginations, fetchData, page, datasLength})=> {
    return(
        <div className="grid grid-cols-4 mb-5">
            <div className="col-span-1 text-secondary text-sm">
                Showing  <strong>{page} - {length * page}</strong> of  <strong>{data.length}</strong>  entries
            </div>    
            <div className="col-span-3 ml-auto">
                <div className="flex gap-4">
                    <button onClick={()=> page === 1 ? null : fetchData(page - 1)} className={`hover:bg-gray-100 px-3 py-1 fa fa-angle-left mr-2`}/> 
                   {paginations.map((item, index)=> {
                       return(
                          <button key={index} onClick={()=> fetchData(item + 1)} className={`hover:bg-gray-200 ${page === item + 1 ?'bg-gray-300':'bg-gray-100'} rounded-full px-4 py-1`}>{index + 1}</button>
                       )
                   })
                   }
                    <button onClick={()=> page === 5 ? null : fetchData(page+1)} className=" hover:bg-gray-100 px-3 py-1 fa fa-angle-right ml-2"/> 
                </div>
            </div>   
        </div>
    )
}
const MoreOptions = ({setRows, fetchData, page, rowsPerPage})=> {
    return(
        <div className="grid grid-cols-2 mt-3 mb-10">
            <div>
                <label className="text-sm">Type:</label>
                <select className="px-4 bg-warmGray-300 py-2 ml-3 text-sm rounded" name={'type'}>
                    <option>All</option>
                </select>
            </div>
            <div className="ml-auto">
                <label className="text-sm">Show:</label>
                <select value={rowsPerPage} onChange={(e)=> {
                    setRows(e.target.value);
                    fetchData(page);
                }} className="px-4 bg-warmGray-300 py-2 ml-3 text-sm rounded" name={'type'}>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={200}>200</option>
                    <option value={200}>300</option>
                    <option value={200}>400</option>
                </select>
            </div>
        </div>
    )
}
const MainHeader = ()=> {
    return(
        <div className="border-b p-3 mb-5">
            <h1 className="text-2xl font-bold">Document ID USage List</h1>
        </div>
    )
};

const DataTables = ({rowsPerPage, totalPage, paginations, page, 
      setPage, onBulkSelection, setRows, fetchData, datas, 
     onSelectSingle, setAction, bulk_action})=> {
        const { slice, range } = useTable(datas, page, rowsPerPage);
        const selection = ()=> new SelectionArea({
            selectables: bulk_action ? [".draggable > button"] : '',
            boundaries: bulk_action ? [".draggable"] : ''
          })
            .on("start", ({ store, event }) => {
               
             })
             .on("move",({store: { changed: { added, removed }}}) => {
               if(bulk_action){
                for (const el of added) {
                    // el.classList.add("selected");
                    // console.log(el);
                  }
                  for (const el of removed) {
                    // el.classList.remove("selected");
                    // console.log(el);
                    // onBulkSelection(1)
                  }
               }
              }
         ).on("stop", ({ store }) => {
             if(store.selected && store.selected.length > 0){
                 store.selected.map((btn, index)=>{
                    onBulkSelection(btn.id)
                 })
             }
         });

        useEffect(()=> {
            if(bulk_action){
                selection();
            }
        }, [bulk_action, rowsPerPage])

    return(
        <div className="mt-1">
                   <MoreOptions fetchData={fetchData} page={page} rowsPerPage={rowsPerPage} setRows={setRows}/>
                   <PaginationHeader rowsPerPage={rowsPerPage} totalPage={totalPage} paginations={paginations} page={page} fetchData={fetchData} setPage={setPage} onBulkSelection={onBulkSelection} setRows={setRows} fetchData={fetchData} page={page} length={slice.length}/>
                   <SubHeader/>
                  <div className={`grid grid-cols-10 mb-5 rounded shadow-lg border-t border-gray-100 ${bulk_action ? ' draggable ' : ''} p-3`} >
                    {slice && slice.length>0 && slice.map((cell, index)=> {
                       return(cell ?
                            <button onClick={ ()=> !bulk_action ? onSelectSingle(cell.id) : null} id={cell.id} key={index} className={`cursor-pointer py-2 px-1 text-center border ${cell.is_selected ? 'bg-blue-800 text-gray-100 hover:bg-blue-500': 'hover:bg-gray-200 bg-gray-100 text-gray-600'} text-sm`}>{cell.value}</button>
                      : ''  )
                    })
                    }
                </div>
             <button onClick={()=> setAction(!bulk_action)} className={`mt-2 text-sm hover:bg-gray-100 px-2 py-1 ${bulk_action ? 'border-2 border-blue-500':'border'}  rounded`}>Bulk Action <i className="fa fa-caret-right ml-2 text-sm"/> </button>
        </div>
    )
}

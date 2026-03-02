import React,{ useState , useRef ,useEffect} from "react";
import { IoClose, IoChevronDownOutline } from "react-icons/io5";

export default function AutoComplete({
  options =[],
  value=[],
  label,
  placeholder= "اختر مخزن ...",
  onChange,
  getOptionLabel =(option)=> option.name,
  getOptionValue =(option)=> option.id,
  
}){
const [isOpen ,setIsOpen] =useState(false);
const [query ,setQuery ]= useState("");
const containerRef =useRef(null)

useEffect(()=>{
const handleClickOutside =(e)=>{
  if (containerRef.current && !containerRef.current.contains(e.target)){
    setIsOpen(false)
  }
  
}
document.addEventListener("mousedown",handleClickOutside);
return()=> document.removeEventListener("mousedown",handleClickOutside)
},[])

const filteredOptions =options.filter((option)=>{
const isAlreadySelected = value.some((v) => getOptionValue(v) === getOptionValue(option));
 const matchesSearch = getOptionLabel(option).toLowerCase().includes(query.toLowerCase());
return !isAlreadySelected && matchesSearch;});

const removeOption =(optionToRemove)=>{
  const newValue =value.filter((v)=> getOptionValue(v) !== getOptionValue(optionToRemove))
  onChange(newValue)
}

const toggleOption =(option)=>{
  const newValue =[...value,option];
  onChange(newValue)
  setQuery("")
}

return(
  <div className="flex flex-col gap-2 w-full font-sans" ref={containerRef}>
    {label && <label className="text-slate-700 font-bold text-sm mr-1">{label}</label>}
    <div className={`relative min-h-[56px] w-full bg-white border-2 rounded-2xl p-2 transition-all flex flex-wrap gap-2 items-center ${isOpen ? 'border-blue-500 shadow-lg shadow-blue-50' : 'border-slate-100'}`}>
      {value.map((option)=>(
        <span key={getOptionValue(option)}className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl text-sm font-bold flex items-center gap-1 group border border-blue-100 animate-in fade-in zoom-in duration-200">
          {getOptionLabel(option)}
          <button type="button" onClick={()=> removeOption(option)}
          className="hover:bg-blue-200 rounded-full p-0.5 transition-colors">
            <IoClose size={14} />
          </button>
        </span>
      ))}

    <input 
    className="flex-1 bg-transparent border-none outline-none p-1 text-slate-800 font-medium placeholder:text-slate-400 min-w-[120px]"
    placeholder={value.length === 0 ? placeholder : ''}
    value={query}
    onChange={(e)=>{
      setQuery(e.target.value);
      setIsOpen(true)
    }}
    onFocus={()=>setIsOpen(true)}
    />
    <IoChevronDownOutline className={`text-slate-400 mx-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    {isOpen&&(
      <ul className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-slate-100 rounded-[1.5rem] shadow-2xl z-[999] max-h-[210px] overflow-y-auto p-2 animate-in slide-in-from-top-2 duration-200 custom-scrollbar">
        {filteredOptions.length >0 ?(
          filteredOptions.map((option)=>(
            <li
            key={getOptionValue(option)}
                  onClick={() => toggleOption(option)}
                  className="p-3 hover:bg-slate-50 rounded-xl cursor-pointer text-slate-700 font-bold text-sm transition-colors flex items-center justify-between group">
                    {getOptionLabel(option)}
                    </li>
          ))
        ):(
          <li className="p-4 text-center text-slate-400 text-sm">لا توجد نتائج مطابقة</li>
        )}
      </ul>
    )}
    </div>
  </div>
)
}



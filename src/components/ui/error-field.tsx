import { ReactNode } from "react";

export default function ErrorField({children}:{children:ReactNode}){
  return <p className="text-red-500 text-[16px] mb-1 font-semibold">{children}</p>
}
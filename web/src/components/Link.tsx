import { forwardRef } from "react";
import { useGlobal } from "./Global";

interface eventInterface{
    preventDefault:()=>void
}
export type { eventInterface };
const Link = forwardRef<HTMLAnchorElement,{ to:string, onClick?:(e:eventInterface)=>any, className?:string, id?:string, style?:{[key:string]:any}, children: any, [key:string]:any }>(({ to, onClick, className, id, style, children, ...props },ref) => {
    
    const { navigate, login }=useGlobal();
    const handleClick = () => {
        const pt=to.split("?")[0];
        if (pt.startsWith("/admin") || ["inscricoes","chats","chat","stories"].includes(pt.split("/")[1])){
            navigate(login.isLoged=="true" ? to : "/admin");
        } else {
            navigate(to);
        }
        return true;
    };

    return (
        <a href={to} ref={ref} className={className} id={id} style={style} onClick={(e)=>{ 
            e.preventDefault();
            var executeAction=true;
            e.preventDefault=()=>{executeAction=false};
            onClick && onClick(e);
            executeAction && handleClick();
        }} {...props}>
            {children}
        </a>
    );
});

export default Link;

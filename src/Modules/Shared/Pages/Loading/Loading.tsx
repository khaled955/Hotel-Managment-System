
export default function Loading() {
  return (
    <div style={{position:"fixed",top:0,bottom:0,right:0 ,left:0 , zIndex:999999,display:"flex",justifyContent:"center",alignItems:"center"}}>
      <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

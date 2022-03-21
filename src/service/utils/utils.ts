export function selectNotNULL(a:any,b:any):any {
  if (a===null||a ===undefined){
    return b;
  }
  return a;
}

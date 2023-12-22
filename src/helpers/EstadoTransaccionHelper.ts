
export default class EstadoTransaccionHelper{
    public code:number;
    public success: boolean;
    public data: any;
    public message: string | undefined;
   
    constructor(){
        this.code = 0;
        this.success = true;
        this.message = '';
      
    }
    setSuccess(message:string|undefined){
        this.code = 200;
        this.success = true;
        this.message = message;
      
    }
}
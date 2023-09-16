const prompt = require('prompt-sync')()

let ulang = false 
do{
    let nilai = prompt("Input Nilai Anda : ");
    if(nilai >= 0 && nilai <= 100){
        switch(true){
            case nilai > 85:
                console.log("Nilai Anda Adalah A");
                ulang = false 
                break;
            case nilai > 75:
                console.log("Nilai Anda Adalah B");
                ulang = false 
                break;
            case nilai > 60 :
                console.log("Nilai Anda Adalah C");
                ulang = false 
                break;
            case nilai > 40:
                console.log("Nilai Anda Adalah D");
                ulang = false 
                break;
            case nilai > 20:
                console.log("Nilai Anda Adalah E");
                ulang = false 
                break;
            default :
                console.log("Nilai Anda Adalah F"); 
                ulang = false    
        }
    }else{
        console.log("Angka yang anda input salah!! Masukkan nilai antara 0 - 100")
        ulang = true
    }
}while(ulang){

}
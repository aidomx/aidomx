export const Usage = `  
Aidomx CLI 
  
Usage: 
  
Commands:  
aidomx  init      Inisialisasi proyek dengan konfigurasi AIDOMX
aidomx  dev       Menjalan dev server untuk client
aidomx  generate  Generate layout dan ui
aidomx  start     Menjalankan server dengan php atau node
aidomx  version   Menampilkan versi CLI  
aidomx  help      Menampilkan bantuan ini  
`

export { Initialize } from './init'
export { choiceServer, devServer } from './server'

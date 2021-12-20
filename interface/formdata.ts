enum JK {
  lk = 'Laki-laki',
  pr = 'Perempuan',
}

export interface FormInput {
  nama: string
  nik: number
  nokk: number
  fotoktp: any
  filekk: any
  umur: number
  jk: JK
  provinsi: string
  kota: string
  kecamatan: string
  kelurahan: string
  alamat: string
  rt: string
  rw: string
  penghasilansebelum: number
  penghasilansesudah: number
  alasan: string
  lainnya: string
  setuju: string
}

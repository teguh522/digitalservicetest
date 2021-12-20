import type { NextPage } from 'next'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormInput } from '../interface/formdata'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState, useEffect } from 'react'

const schema = yup.object({
  nama: yup.string().required(),
  nik: yup.number().required(),
  nokk: yup.number().required(),
  fotoktp: yup.mixed().required().test("fileSize", "This file is to large", (value) => {
    return value && value[0].size <= 2000000
  }).test("type", "We only support jpg|jpeg|png|bmp", (value) => {
    return value && value[0].type === 'image/jpg' || value[0].type === 'image/jpeg'
      || value[0].type === 'image/png' || value[0].type === 'image/bmp'
  }),
  filekk: yup.mixed().required().test("fileSize", "This file is to large", (value) => {
    return value && value[0].size <= 2000000
  }).test("type", "We only support jpg|jpeg|png|bmp", (value) => {
    return value && value[0].type === 'image/jpg' || value[0].type === 'image/jpeg'
      || value[0].type === 'image/png' || value[0].type === 'image/bmp'
  }),
  umur: yup.number().required().min(25),
  jk: yup.string().required(),
  alamat: yup.string().required().max(255),
  rt: yup.number().required(),
  rw: yup.number().required(),
  penghasilansebelum: yup.number().required(),
  penghasilansesudah: yup.number().required(),
  alasan: yup.string().required(),
  lainnya: yup.string(),
  provinsi: yup.string().required(),

}).required();

interface prov {
  id: number
  name: string
}

const Home: NextPage = () => {
  const [provinsi, setProvinsi] = useState<prov[]>([])
  const [kota, setKota] = useState<prov[]>([])
  const [kec, setKec] = useState<prov[]>([])
  const [kel, setKel] = useState<prov[]>([])

  useEffect(() => {
    async function getprovinsi() {
      const provinsi = await fetch('http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
      const data = await provinsi.json()
      setProvinsi([...data])
    }
    getprovinsi()
  }, [])

  async function getKota(e: any) {
    e.preventDefault()
    setKota([])
    setKec([])
    setKel([])
    const kota = await fetch(`http://www.emsifa.com/api-wilayah-indonesia/api/regencies/${e.target.value}.json`)
    const data = await kota.json()
    setKota([...data])
  }
  async function getKec(e: any) {
    e.preventDefault()
    setKec([])
    setKel([])
    const kota = await fetch(`http://www.emsifa.com/api-wilayah-indonesia/api/districts/${e.target.value}.json`)
    const data = await kota.json()
    setKec([...data])
  }
  async function getKel(e: any) {
    e.preventDefault()
    setKel([])
    const kota = await fetch(`http://www.emsifa.com/api-wilayah-indonesia/api/villages/${e.target.value}.json`)
    const data = await kota.json()
    setKel([...data])
  }
  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>({
    resolver: yupResolver(schema)
  })
  const onSubmit: SubmitHandler<FormInput> = data => console.log(data);

  return (
    <div className='w-full h-full flex flex-col items-center font-serif'>
      <div className='w-full p-2 md:max-w-xl bg-rose-100 rounded-md m-2'>
        <p className='text-3xl'>Form Input</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nama</span>
            </label>
            <input {...register("nama")} required placeholder='Nama Lengkap' className="input input-primary input-bordered" />
            {errors.nama?.message &&
              <label className="label">
                <span className="label-text-alt text-red-900">{errors.nama?.message}</span>
              </label>
            }
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">NIK</span>
            </label>
            <input type="number" required {...register("nik")} placeholder='NIK' className="input input-primary input-bordered" />
            {errors.nik?.message &&
              <label className="label">
                <span className="label-text-alt text-red-900">{errors.nik?.message}</span>
              </label>
            }
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">No KK</span>
            </label>
            <input type="number" required {...register("nokk")} placeholder='No Kartu Keluarga' className="input input-primary input-bordered" />
            {errors.nokk?.message &&
              <label className="label">
                <span className="label-text-alt text-red-900">{errors.nokk?.message}</span>
              </label>
            }
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Foto KTP</span>
            </label>
            <input required type="file" {...register("fotoktp")} />
            {errors.fotoktp?.message &&
              <label className="label">
                <span className="label-text-alt text-red-900">{errors.fotoktp?.message}</span>
              </label>
            }
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Foto KK</span>
            </label>
            <input required type="file" {...register("filekk")} />
            {errors.filekk?.message &&
              <label className="label">
                <span className="label-text-alt text-red-900">{errors.filekk?.message}</span>
              </label>
            }
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Umur</span>
            </label>
            <input {...register("umur")} required placeholder='Umur' className="input input-primary input-bordered" />
            {errors.umur?.message &&
              <label className="label">
                <span className="label-text-alt text-red-900">{errors.umur?.message}</span>
              </label>
            }
          </div>
          <div className='flex space-x-2'>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Laki-laki</span>
                <input type="radio" {...register("jk")} className="radio radio-primary" value="Laki-laki" required />
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Perempuan</span>
                <input type="radio"{...register("jk")} className="radio radio-primary" value='Perempuan' required />
              </label>
            </div>
            {errors.jk?.message &&
              <label className="label">
                <span className="label-text-alt text-red-900">{errors.jk?.message}</span>
              </label>
            }
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Provinsi</span>
            </label>
            <select {...register("provinsi")} defaultValue={''} onChange={getKota} className="select select-bordered select-primary w-full" required>
              <option>Pilih Provinsi</option>
              {provinsi.map((item) => {
                return (
                  <option key={item.id} value={item.id}>{item.name}</option>
                )
              })}
              {errors.provinsi?.message &&
                <label className="label">
                  <span className="label-text-alt text-red-900">{errors.provinsi?.message}</span>
                </label>
              }
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Kab/Kota</span>
            </label>
            <select {...register("kota")} onChange={getKec} defaultValue={''} className="select select-bordered select-primary w-full" required>
              <option>Pilih Kota</option>
              {kota.map((item) => {
                return (
                  <option key={item.id} value={item.id}>{item.name}</option>
                )
              })}
              {errors.kota?.message &&
                <label className="label">
                  <span className="label-text-alt text-red-900">{errors.kota?.message}</span>
                </label>
              }
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Kecamatan</span>
            </label>
            <select defaultValue={''} {...register('kecamatan')} onChange={getKel} className="select select-bordered select-primary w-full" required>
              <option>Pilih Kecamatan</option>
              {kec.map((item) => {
                return (
                  <option key={item.id} value={item.id}>{item.name}</option>
                )
              })}
              {errors.kecamatan?.message &&
                <label className="label">
                  <span className="label-text-alt text-red-900">{errors.kecamatan?.message}</span>
                </label>
              }
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Kelurahan/Desa</span>
            </label>
            <select defaultValue={''} {...register('kelurahan')} className="select select-bordered select-primary w-full" required>
              <option>Pilih Kelurahan</option>
              {kel.map((item) => {
                return (
                  <option key={item.id} value={item.id}>{item.name}</option>
                )
              })}
              {errors.kelurahan?.message &&
                <label className="label">
                  <span className="label-text-alt text-red-900">{errors.kelurahan?.message}</span>
                </label>
              }
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Alamat</span>
            </label>
            <input type="text" required {...register("alamat")} placeholder='Alamat' className="input input-primary input-bordered" />
            {errors.alamat?.message &&
              <label className="label">
                <span className="label-text-alt text-red-900">{errors.alamat?.message}</span>
              </label>
            }
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">RT</span>
            </label>
            <input type="number" {...register("rt")} required placeholder='RT' className="input input-primary input-bordered" />
            {errors.rt?.message &&
              <label className="label">
                <span className="label-text-alt text-red-900">{errors.rt?.message}</span>
              </label>
            }
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">RW</span>
            </label>
            <input type="number" {...register("rw")} required placeholder='RW' className="input input-primary input-bordered" />
            {errors.rw?.message &&
              <label className="label">
                <span className="label-text-alt text-red-900">{errors.rw?.message}</span>
              </label>
            }
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Penghasilan Sebelum Pandemi</span>
            </label>
            <input type="number" {...register("penghasilansebelum")} required placeholder='Penghasilan Sebelum Pandemi' className="input input-primary input-bordered" />
            {errors.penghasilansebelum?.message &&
              <label className="label">
                <span className="label-text-alt text-red-900">{errors.penghasilansebelum?.message}</span>
              </label>
            }
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Penghasilan Setelah Pandemi</span>
            </label>
            <input type="number" {...register("penghasilansesudah")} required placeholder='Penghasilan Setelah Pandemi' className="input input-primary input-bordered" />
            {errors.penghasilansesudah?.message &&
              <label className="label">
                <span className="label-text-alt text-red-900">{errors.penghasilansesudah?.message}</span>
              </label>
            }
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Alasan Membutuhkan Bantuan</span>
            </label>
            <select {...register("alasan")} className="select select-bordered select-primary w-full" required>
              <option value={"Kehilangan pekerjaan"}>Kehilangan pekerjaan</option>
              <option value={"Kepala keluarga terdampak atau korban Covid-19"}>Kepala keluarga terdampak atau korban Covid-19</option>
              <option value={"Tergolong fakir/miskin semenjak sebelum Covid-19"}>Tergolong fakir/miskin semenjak sebelum Covid-19</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Atau Lainnya</span>
            </label>
            <input type="number" {...register("lainnya")} placeholder='Alasan lainnya' className="input input-primary input-bordered" />
            {errors.lainnya?.message &&
              <label className="label">
                <span className="label-text-alt text-red-900">{errors.lainnya?.message}</span>
              </label>
            }
          </div>
          <div className="p-3 card border-2 border-black mt-2">
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text">Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data tersebut.</span>
                <input type="checkbox" {...register("setuju")} required className="checkbox checkbox-primary" />
                {errors.setuju?.message &&
                  <label className="label">
                    <span className="label-text-alt text-red-900">{errors.setuju?.message}</span>
                  </label>
                }
              </label>
            </div>
          </div>
          <div className="form-control mt-4">
            <button className='btn btn-primary' type='submit'>Submit</button>
          </div>
        </form>
      </div>


    </div>
  )
}

export default Home

import React from 'react';

interface District {
  id: string;
  province: string;
  name: string;
}

const districts: District[] = [
  {
    "id": "d7ee6a66-2f53-430a-abee-1d424380227a",
    "province": "DKI Jakarta",
    "name": "Jakarta Barat"
  },
  {
    "id": "60cbb4ab-c1fb-481e-a208-d313841e616d",
    "province": "DKI Jakarta",
    "name": "Jakarta Pusat"
  },
  {
    "id": "83cf83e3-4d09-4077-bcf3-1f50517c6182",
    "province": "DKI Jakarta",
    "name": "Jakarta Selatan"
  },
  {
    "id": "5795f2f9-b04c-4e25-ba72-e595cfdd3d06",
    "province": "DKI Jakarta",
    "name": "Jakarta Timur"
  },
  {
    "id": "d69d453b-bd93-489b-af5c-41f5a143f17a",
    "province": "DKI Jakarta",
    "name": "Jakarta Utara"
  },
  {
    "id": "7ef2da26-7fda-4d34-82bc-893072f6a66e",
    "province": "Bali",
    "name": "Kabupaten Badung"
  },
  {
    "id": "600162fa-7ae5-415c-9a52-0203073e9a2a",
    "province": "Jawa Barat",
    "name": "Kabupaten Bandung"
  },
  {
    "id": "ea577114-bbf8-459a-a6c9-3170991e7a4e",
    "province": "Jawa Barat",
    "name": "Kabupaten Bandung Barat"
  },
  {
    "id": "4764c77b-0fe2-4c66-8da5-ef98c9c92b3c",
    "province": "Jawa Timur",
    "name": "Kabupaten Bangkalan"
  },
  {
    "id": "02686cd9-d639-477a-b924-3699c0ab5c29",
    "province": "Bali",
    "name": "Kabupaten Bangli"
  },
  {
    "id": "e945b49e-d517-4f51-a808-f55c8c83a08d",
    "province": "DI Yogyakarta",
    "name": "Kabupaten Bantul"
  },
  {
    "id": "9c9265bd-df7b-43d5-9c6c-1ab9caec73d6",
    "province": "Jawa Timur",
    "name": "Kabupaten Banyuwangi"
  },
  {
    "id": "5d284a90-b79c-464d-994c-51fd1bd32e13",
    "province": "Jawa Barat",
    "name": "Kabupaten Bekasi"
  },
  {
    "id": "1ca8818e-0e12-48fe-b9de-14ae76fa94f3",
    "province": "Jawa Timur",
    "name": "Kabupaten Blitar"
  },
  {
    "id": "5eff342c-63f2-4a6b-bfd4-a9f8ade12dcd",
    "province": "Jawa Barat",
    "name": "Kabupaten Bogor"
  },
  {
    "id": "442d9b18-c508-4774-8c3a-f2577642f3f0",
    "province": "Jawa Timur",
    "name": "Kabupaten Bojonegoro"
  },
  {
    "id": "71115702-791c-4861-b0d0-6587510812af",
    "province": "Jawa Timur",
    "name": "Kabupaten Bondowoso"
  },
  {
    "id": "46863693-f564-4211-852c-29d6adb6a0eb",
    "province": "Bali",
    "name": "Kabupaten Buleleng"
  },
  {
    "id": "02e273d7-da1a-46eb-a229-d3a3d2e09e8e",
    "province": "Jawa Barat",
    "name": "Kabupaten Ciamis"
  },
  {
    "id": "c024d026-b7dc-4d36-9ec1-565173d9020f",
    "province": "Jawa Barat",
    "name": "Kabupaten Cianjur"
  },
  {
    "id": "1b4687de-9177-47da-83f3-0ca53fa4173c",
    "province": "Jawa Barat",
    "name": "Kabupaten Cirebon"
  },
  {
    "id": "d96cd07b-2c1e-478c-9c66-cda77009cbc9",
    "province": "Jawa Barat",
    "name": "Kabupaten Garut"
  },
  {
    "id": "1780ce5f-1ee1-4af4-a710-f7c2e8883128",
    "province": "Bali",
    "name": "Kabupaten Gianyar"
  },
  {
    "id": "38fd90f4-25f6-46b4-a3e8-1524c9d3f94a",
    "province": "Jawa Timur",
    "name": "Kabupaten Gresik"
  },
  {
    "id": "be04e767-1592-4d39-b718-3efdb25e0615",
    "province": "DI Yogyakarta",
    "name": "Kabupaten Gunungkidul"
  },
  {
    "id": "28e091ef-9fd4-49f2-8c55-7f81d2989bdb",
    "province": "Jawa Barat",
    "name": "Kabupaten Indramayu"
  },
  {
    "id": "43502847-1b62-4bbc-938b-4b54e082b212",
    "province": "Jawa Timur",
    "name": "Kabupaten Jember"
  },
  {
    "id": "262ac2b6-2c36-4f3c-9258-c22df0c1119f",
    "province": "Bali",
    "name": "Kabupaten Jembrana"
  },
  {
    "id": "40e699f3-6b22-47ee-baab-5e0a71a1b991",
    "province": "Jawa Timur",
    "name": "Kabupaten Jombang"
  },
  {
    "id": "647c632d-5d28-47e3-a278-fae1a116f121",
    "province": "Bali",
    "name": "Kabupaten Karangasem"
  },
  {
    "id": "284267b3-b5ff-4dd4-8b33-4a7ac09ad1a6",
    "province": "Jawa Barat",
    "name": "Kabupaten Karawang"
  },
  {
    "id": "cfd4fd72-e8e1-48e1-b678-ed8122e3b478",
    "province": "Jawa Timur",
    "name": "Kabupaten Kediri"
  },
  {
    "id": "1478ae35-45aa-4b4c-9ad3-b96b8d289728",
    "province": "Bali",
    "name": "Kabupaten Klungkung"
  },
  {
    "id": "f516348a-b8b0-408f-adf8-e85d1ecc094f",
    "province": "DI Yogyakarta",
    "name": "Kabupaten Kulon Progo"
  },
  {
    "id": "5251d570-fe7d-4d4f-bfef-c2e680409415",
    "province": "Jawa Barat",
    "name": "Kabupaten Kuningan"
  },
  {
    "id": "a625d9be-1618-4647-a316-f7e9d53bbc75",
    "province": "Jawa Timur",
    "name": "Kabupaten Lamongan"
  },
  {
    "id": "092334cb-ee31-4f2d-9aba-f9bd0082bd1e",
    "province": "Banten",
    "name": "Kabupaten Lebak"
  },
  {
    "id": "9890f3a6-9c60-454e-af3d-74add98ada82",
    "province": "Jawa Timur",
    "name": "Kabupaten Lumajang"
  },
  {
    "id": "dd7efadf-0b6f-499f-812e-53c156895a7f",
    "province": "Jawa Timur",
    "name": "Kabupaten Madiun"
  },
  {
    "id": "334f4d4e-d7db-4534-8542-6d43e702d678",
    "province": "Jawa Timur",
    "name": "Kabupaten Magetan"
  },
  {
    "id": "f7a335fc-89b8-4c82-aa68-d41248658f06",
    "province": "Jawa Barat",
    "name": "Kabupaten Majalengka"
  },
  {
    "id": "989432e1-66b0-44e1-8b95-239c68bb5ed7",
    "province": "Jawa Timur",
    "name": "Kabupaten Malang"
  },
  {
    "id": "3375defb-495b-4c94-8d3d-3f9db9a4c260",
    "province": "Jawa Timur",
    "name": "Kabupaten Mojokerto"
  },
  {
    "id": "c080bc8b-ddf0-429c-916b-bb8484a0854c",
    "province": "Jawa Timur",
    "name": "Kabupaten Nganjuk"
  },
  {
    "id": "5553233d-0406-4834-893c-0cca38fa310d",
    "province": "Jawa Timur",
    "name": "Kabupaten Ngawi"
  },
  {
    "id": "f0af063d-2d71-4f37-98a1-6ab6d4d12b8d",
    "province": "Jawa Timur",
    "name": "Kabupaten Pacitan"
  },
  {
    "id": "09c2cfe1-1455-4ac8-8f86-613e007f9f00",
    "province": "Jawa Timur",
    "name": "Kabupaten Pamekasan"
  },
  {
    "id": "7f2264e9-f8fb-4087-82d4-0f8e3c03b2bf",
    "province": "Banten",
    "name": "Kabupaten Pandeglang"
  },
  {
    "id": "4154f9ef-d0a8-4df2-b2c3-20ed9d33a432",
    "province": "Jawa Barat",
    "name": "Kabupaten Pangandaran"
  },
  {
    "id": "181eb5c0-9ac2-4f83-9d62-eac1d8cad30a",
    "province": "Jawa Timur",
    "name": "Kabupaten Pasuruan"
  },
  {
    "id": "4192d21c-69fb-43e5-b214-706c442f77d3",
    "province": "Jawa Timur",
    "name": "Kabupaten Ponorogo"
  },
  {
    "id": "5459075c-6b2b-4841-940a-d7f3f40e2f5f",
    "province": "Jawa Timur",
    "name": "Kabupaten Probolinggo"
  },
  {
    "id": "3e9ca4e3-fcc9-49f7-be0e-e20383e28998",
    "province": "Jawa Barat",
    "name": "Kabupaten Purwakarta"
  },
  {
    "id": "11f35a15-862c-4095-926a-e2646282cf8a",
    "province": "Jawa Timur",
    "name": "Kabupaten Sampang"
  },
  {
    "id": "4fb2338c-8ac4-462c-818b-76a384dcccae",
    "province": "Banten",
    "name": "Kabupaten Serang"
  },
  {
    "id": "33493bcc-0990-4cf9-8bd7-7a109d678682",
    "province": "Jawa Timur",
    "name": "Kabupaten Sidoarjo"
  },
  {
    "id": "87dfde95-8d1d-4d2e-a712-4f7d2bca0673",
    "province": "Jawa Timur",
    "name": "Kabupaten Situbondo"
  },
  {
    "id": "30eba100-8093-41f2-bf44-d742dd09b16a",
    "province": "DI Yogyakarta",
    "name": "Kabupaten Sleman"
  },
  {
    "id": "217fdeab-386d-4102-95c3-a9eac9818c95",
    "province": "Jawa Tengah",
    "name": "Kabupaten Sragen"
  },
  {
    "id": "cbb962e3-3409-45a5-a87f-1006f53dbbe3",
    "province": "Jawa Barat",
    "name": "Kabupaten Subang"
  },
  {
    "id": "7683665e-e7eb-4b86-ab33-b4d422a470ec",
    "province": "Jawa Barat",
    "name": "Kabupaten Sukabumi"
  },
  {
    "id": "655edb34-098b-4679-91dc-ccfbc3dd477a",
    "province": "Jawa Tengah",
    "name": "Kabupaten Sukoharjo"
  },
  {
    "id": "b886d801-6508-43ed-8200-863855c1a9fd",
    "province": "Jawa Barat",
    "name": "Kabupaten Sumedang"
  },
  {
    "id": "c9d3bd1b-740a-42e4-8813-d67cc6afc4fa",
    "province": "Jawa Timur",
    "name": "Kabupaten Sumenep"
  },
  {
    "id": "313d4c36-bceb-47a6-804a-f1b97b1c4bb9",
    "province": "Bali",
    "name": "Kabupaten Tabanan"
  },
  {
    "id": "248ae0f0-dcf5-4959-9d67-b082415e78dd",
    "province": "Banten",
    "name": "Kabupaten Tangerang"
  },
  {
    "id": "3e8b8f20-00d1-4aff-aa7c-3708f86dcc51",
    "province": "Jawa Barat",
    "name": "Kabupaten Tasikmalaya"
  },
  {
    "id": "4ca6aab6-96e5-48c7-ac7f-3a89d6ca020b",
    "province": "Jawa Tengah",
    "name": "Kabupaten Tegal"
  },
  {
    "id": "735c531a-e57a-458c-aa14-58ca246a0a9a",
    "province": "Jawa Tengah",
    "name": "Kabupaten Temanggung"
  },
  {
    "id": "6a7a3e99-3b6b-4083-8475-832fee337ffc",
    "province": "Jawa Timur",
    "name": "Kabupaten Trenggalek"
  },
  {
    "id": "011cd832-7be3-42e3-80d5-4b2747464467",
    "province": "Jawa Timur",
    "name": "Kabupaten Tuban"
  },
  {
    "id": "ef4fbad3-1f17-4777-80bc-1add24de04a8",
    "province": "Jawa Timur",
    "name": "Kabupaten Tulungagung"
  },
  {
    "id": "4ec343c4-59de-4b5d-9364-f01c85dbecdf",
    "province": "Jawa Tengah",
    "name": "Kabupaten Wonogiri"
  },
  {
    "id": "647498aa-3f35-4155-ad4c-66ba4d393e3d",
    "province": "Jawa Tengah",
    "name": "Kabupaten Wonosobo"
  },
  {
    "id": "dad2363a-fbb6-4efa-952f-69e6b85d4d0e",
    "province": "DKI Jakarta",
    "name": "Kepulauan Seribu"
  },
  {
    "id": "c4d73068-099f-4afe-8395-4a7fc691aab5",
    "province": "Jawa Barat",
    "name": "Kota Bandung"
  },
  {
    "id": "478f8fa6-baec-4d35-ba8f-e64953b70534",
    "province": "Jawa Barat",
    "name": "Kota Banjar"
  },
  {
    "id": "68a09c37-dbb7-4fa4-a2a6-a3580ec9429a",
    "province": "Jawa Timur",
    "name": "Kota Batu"
  },
  {
    "id": "f2eef67e-0e67-4b06-bfe9-c07fbcdffd21",
    "province": "Jawa Barat",
    "name": "Kota Bekasi"
  },
  {
    "id": "eeb369cd-2012-426d-807b-eb2890efed0b",
    "province": "Jawa Timur",
    "name": "Kota Blitar"
  },
  {
    "id": "5361df8f-00be-491a-9973-16087d01d604",
    "province": "Jawa Barat",
    "name": "Kota Bogor"
  },
  {
    "id": "e7e34ea1-9bc2-4ea4-a298-350c695d605f",
    "province": "Banten",
    "name": "Kota Cilegon"
  },
  {
    "id": "26ae5f79-4c60-4584-9eb4-98c32c68d345",
    "province": "Jawa Barat",
    "name": "Kota Cimahi"
  },
  {
    "id": "850d66ac-adf1-47a5-a1e1-5cbd6cd5c270",
    "province": "Jawa Barat",
    "name": "Kota Cirebon"
  },
  {
    "id": "f8c3dcc8-5c30-4a36-a3b0-91faf992a485",
    "province": "Bali",
    "name": "Kota Denpasar"
  },
  {
    "id": "45d5c0a5-8b58-494d-a659-a0c577e03bf6",
    "province": "Jawa Barat",
    "name": "Kota Depok"
  },
  {
    "id": "6e831c21-199e-4e3f-ba0a-a39649b54b1c",
    "province": "Jawa Timur",
    "name": "Kota Kediri"
  },
  {
    "id": "bff7897d-a455-4126-9c84-3831b5d7de87",
    "province": "Jawa Timur",
    "name": "Kota Madiun"
  },
  {
    "id": "9a0bd603-bfb6-4d00-abef-7e63304c4f22",
    "province": "Jawa Timur",
    "name": "Kota Malang"
  },
  {
    "id": "91cb8080-727e-4a63-994e-3c9381e12869",
    "province": "Jawa Timur",
    "name": "Kota Mojokerto"
  },
  {
    "id": "d2529be7-f966-4d46-9246-412bcc519f76",
    "province": "Jawa Timur",
    "name": "Kota Pasuruan"
  },
  {
    "id": "ac7393af-6d71-463d-bc73-040f3bc5172e",
    "province": "Jawa Timur",
    "name": "Kota Probolinggo"
  },
  {
    "id": "c83def9d-38b3-4da2-b2ab-7d32f25d15a1",
    "province": "Jawa Tengah",
    "name": "Kota Semarang"
  },
  {
    "id": "714ba0d3-f268-4af5-8493-30e919a81919",
    "province": "Banten",
    "name": "Kota Serang"
  },
  {
    "id": "dd9e805d-c64b-474a-948c-6d99f18542ba",
    "province": "Jawa Barat",
    "name": "Kota Sukabumi"
  },
  {
    "id": "28d94cb4-1d82-40b7-990e-e5d111780028",
    "province": "Jawa Timur",
    "name": "Kota Surabaya"
  },
  {
    "id": "f487aad4-0c4e-4eb5-a646-f2c6bc398896",
    "province": "Banten",
    "name": "Kota Tangerang"
  },
  {
    "id": "b94b078e-9a7c-4834-9dff-1377a702ccd7",
    "province": "Banten",
    "name": "Kota Tangerang Selatan"
  },
  {
    "id": "0268bf06-2013-4148-9091-9018e0d91a1a",
    "province": "Jawa Barat",
    "name": "Kota Tasikmalaya"
  },
  {
    "id": "216da32c-d60b-4e80-bddc-a1ccd8e32269",
    "province": "DI Yogyakarta",
    "name": "Kota Yogyakarta"
  }
]

const DistrictList: React.FC = () => {
  return (
    <div>
      <h1>Districts in Indonesia</h1>
      <ul>
        {districts.map((district) => (
          <li key={district.id}>
            <strong>{district.name}</strong> - {district.province}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DistrictList;
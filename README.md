# API DOCS

Domain : https://eduforumapi.htp22tib.com

## Create User

### Dosen

Endpoint : POST /users/dosen

Request Body (JSON) :

```json
{
	"username": "dosen1",
	"password": "dosen1",
	"full_name": "dosen satu",
	"nidn_or_nim": "123456",
	"nama_perguruan_tinggi": "Example Univercity"
}
```

Response Body Success :

```json
{
	"status": 200,
	"message": "berhasil mendaftar!",
	"data": {
		"id": "3fedab84-6573-49d0-9078-4722fa8265ad",
		"username": "dosen1",
		"full_name": "dosen satu",
		"nidn_or_nim": "123456",
		"nama_perguruan_tinggi": "Example Univercity",
		"role": "dosen"
	},
	"refrence": "/users/login",
	"error": false
}
```

Response Body Error :

```json
{
	"status": 400,
	"message": "username atau nidn sudah terdaftar!, Silahkan Login",
	"data": null,
	"refrence": null,
	"error": true
}
```

### Mahasiswa

Endpoint : POST /users/mahasiswa

Request Body (JSON) :

```json
{
	"username": "mahasiswa1",
	"password": "mahasiswa1",
	"full_name": "mahasiswa satu",
	"nidn_or_nim": "1234567",
	"nama_perguruan_tinggi": "Example Univercity"
}
```

Response Body Success :

```json
{
	"status": 200,
	"message": "berhasil mendaftar!",
	"data": {
		"id": "2a1bdc46-b5cb-478a-8dd6-a7d7757b2118",
		"username": "mahasiswa1",
		"full_name": "mahasiswa satu",
		"nidn_or_nim": "1234567",
		"nama_perguruan_tinggi": "Example Univercity",
		"role": "mahasiswa"
	},
	"refrence": "/users/login",
	"error": false
}
```

Response Body Error :

```json
{
	"status": 400,
	"message": "username atau nidn sudah terdaftar!, Silahkan Login",
	"data": null,
	"refrence": null,
	"error": true
}
```

## Login User

Endpoint : POST /users/auth

Request Body (JSON) :

```json
{
	"username": "mahasiswa1",
	"password": "mahasiswa1"
}
```

Response Body Success :

```json
{
	"status": 200,
	"message": "login berhasil",
	"data": {
		"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJhMWJkYzQ2LWI1Y2ItNDc4YS04ZGQ2LWE3ZDc3NTdiMjExOCIsInJvbGUiOiJtYWhhc2lzd2EiLCJpYXQiOjE3MzUzNzcyOTAsImV4cCI6MTczNTQ2MzY5MH0.DBgQXKriSausEPHA0_7MxYMERirjCPs_FSfNL2S23oI"
	},
	"refrence": null,
	"error": false
}
```

Response Body Error :

```json
{
	"status": 400,
	"message": "username atau password salah!",
	"data": null,
	"refrence": null,
	"error": true
}
```

## Verify Access Token

Endpoint : GET /users/auth/verify

Request Headers :

- Authorization : Bearer {:access token}

Response Body Success :

```json
{
	"status": 200,
	"message": "access_token verified!",
	"data": {
		"id": "2a1bdc46-b5cb-478a-8dd6-a7d7757b2118",
		"role": "mahasiswa"
	},
	"refrence": null,
	"error": false
}
```

Response Body Error :

```json
{
	"status": 400,
	"message": "invalid access_token!",
	"data": null,
	"refrence": null,
	"error": true
}
```

## Update Profile

Endpoint : POST /users/profile

Request Headers :

- Authorization : Bearer {:access token}

**Request Body (form-data):**

| Nama Parameter        | Tipe Data        | Deskripsi             | Contoh Nilai           |
| --------------------- | ---------------- | --------------------- | ---------------------- |
| full_name             | string           | Nama lengkap          | Di ubah namanya        |
| nidn_or_nim           | string           | NIDN atau NIM         | 08762331231            |
| nama_perguruan_tinggi | string           | Nama perguruan tinggi | HTP                    |
| file                  | array of strings | Foto Profile          | ["png", "jpg", "jpeg"] |

Response Body Success :

```json
{
	"status": 200,
	"message": "berhasil mengupdate!",
	"data": {
		"id": "2a1bdc46-b5cb-478a-8dd6-a7d7757b2118",
		"role": "mahasiswa",
		"full_name": "Di ubah namanya",
		"username": "mahasiswa1",
		"nidn_or_nim": "08762331231",
		"profile_url": "https://eduforumapi.htp22tib.com/foto/7694f9ef-df79-4550-995d-3b2fa1fcfa70.jpg",
		"nama_perguruan_tinggi": "HTP",
		"create_at": "2024-12-28T09:11:09.000Z",
		"update_at": "2024-12-28T09:27:29.000Z"
	},
	"refrence": null,
	"error": false
}
```

Response Body Error :

```json
{
	"status": 400,
	"message": "invalid access_token!",
	"data": null,
	"refrence": null,
	"error": true
}
```

## Get Profile

Endpoint : GET /users/profile

Request Headers :

- Authorization : Bearer {:access token}

Response Body Success :

```json
{
	"status": 200,
	"message": "informasi profile anda",
	"data": {
		"id": "2a1bdc46-b5cb-478a-8dd6-a7d7757b2118",
		"username": "mahasiswa1",
		"full_name": "Di ubah namanya",
		"nidn_or_nim": "08762331231",
		"nama_perguruan_tinggi": "HTP",
		"profile_url": "https://eduforumapi.htp22tib.com/foto/7694f9ef-df79-4550-995d-3b2fa1fcfa70.jpg",
		"create_at": "2024-12-28T09:11:09.000Z",
		"update_at": "2024-12-28T09:27:29.000Z"
	},
	"refrence": null,
	"error": false
}
```

Response Body Error :

```json
{
	"status": 400,
	"message": "invalid access_token!",
	"data": null,
	"refrence": null,
	"error": true
}
```

## Get Foto (foto profile / foto postingan)

Endpoint : GET /foto/{:foto_url}

Example : https://eduforumapi.htp22tib.com/foto/7694f9ef-df79-4550-995d-3b2fa1fcfa70.jpg

Response :

- Image

## Posting Pertanyaan / Post ask

Endpoint : POST /posts

Request Headers :

- Authorization : Bearer {:access token}

**Request Body (form-data):**

| Nama Parameter | Tipe Data        | Deskripsi            | Contoh Nilai           |
| -------------- | ---------------- | -------------------- | ---------------------- |
| file           | array of strings | gambar               | ["png", "jpg", "jpeg"] |
| content        | string           | Deskripsi Pertanyaan | ini kenapa ya          |

Response Body Success :

```json
{
	"status": 200,
	"message": "berhasil memposting!",
	"data": {
		"id": "d8b06204-1e7b-44af-af5a-2d40c6a6ec3e",
		"img_url": "https://eduforumapi.htp22tib.com/foto/04f9565c-9177-4eee-aa64-9f40c9fd35a0.jpg",
		"content": "saya ingin bertanya",
		"users_id": "2a1bdc46-b5cb-478a-8dd6-a7d7757b2118",
		"count_answers": 0,
		"count_like": 0,
		"create_at": "2024-12-28T11:50:59.000Z",
		"update_at": "2024-12-28T11:50:59.000Z"
	},
	"refrence": null,
	"error": false
}
```

Response Body Error :

```json
{
	"status": 400,
	"message": "invalid access_token!",
	"data": null,
	"refrence": null,
	"error": true
}
```

## Get Postingan

Endpoint : GET /posts

### Query Parameters

| query | value        | fungsi                                                    |
| ----- | ------------ | --------------------------------------------------------- |
| take  | 10 - infinit | untuk menentukan berapa jumlah penyajian , Default 10     |
| page  | 1 - max_page | untuk melakukan pagination, default 1                     |
| id    | post_id      | untuk mendapatkan 1 data saja berdasarkan id yang dikirim |

Response Body Success (get all):

```json
{
	"status": 200,
	"message": "list postingan",
	"data": {
		"posts": [
			{
				"id": "eb5363f0-baad-431e-8e46-06f98708be81",
				"img_url": "https://eduforumapi.htp22tib.com/foto/df2090b0-8366-461c-9da9-427e88611156.jpeg",
				"content": "aku pusing ini error mulu dari 5 tahun lalu, heheheheh, mohon pencerahannya suhu!",
				"users_id": "4979fc49-c74d-402e-a6e1-d63831a89239",
				"count_answers": 1,
				"count_like": 2,
				"create_at": "2024-12-27T08:53:11.000Z",
				"update_at": "2024-12-28T08:51:57.000Z",
				"user": {
					"id": "4979fc49-c74d-402e-a6e1-d63831a89239",
					"username": "22081020",
					"full_name": "rusnanda purnama",
					"profile_url": "https://eduforumapi.htp22tib.com/foto/ca137b3a-8ea5-46c3-a95d-6e227dd5b7c1.png",
					"nidn_or_nim": "22081020",
					"nama_perguruan_tinggi": "Universitas Hangtuah Pekanbaru",
					"role": "mahasiswa",
					"create_at": "2024-12-27T08:49:08.000Z",
					"update_at": "2024-12-27T08:51:03.000Z"
				},
				"answers": [
					{
						"id": "ca80d970-d483-4884-9c31-6233fae0dc4c",
						"posts_id": "eb5363f0-baad-431e-8e46-06f98708be81",
						"users_id": "f0adf986-0736-4db3-91ff-9a7f78b2db99",
						"answers": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
						"vote_up": 0,
						"vote_down": 1,
						"create_at": "2024-12-28T08:51:57.000Z",
						"update_at": "2024-12-28T08:57:26.000Z",
						"user": {
							"id": "f0adf986-0736-4db3-91ff-9a7f78b2db99",
							"username": "22081006",
							"full_name": "Firman Parulian Siburian",
							"profile_url": "https://eduforumapi.htp22tib.com/foto/beb2c7cd-4616-43e2-8266-8b510cc5bd05.jpg",
							"nidn_or_nim": "22081006",
							"nama_perguruan_tinggi": "Universitas Hangtuah Pekanbaru",
							"role": "mahasiswa",
							"create_at": "2024-12-28T08:46:46.000Z",
							"update_at": "2024-12-28T09:00:42.000Z"
						},
						"vote_up_relations": [],
						"vote_down_relations": [
							{
								"id": "df081798-294a-494c-9df1-5eeb1cbb2c69",
								"answers_id": "ca80d970-d483-4884-9c31-6233fae0dc4c",
								"users_id": "f0adf986-0736-4db3-91ff-9a7f78b2db99",
								"create_at": "2024-12-28T08:57:26.000Z",
								"update_at": "2024-12-28T08:57:26.000Z",
								"user": {
									"id": "f0adf986-0736-4db3-91ff-9a7f78b2db99",
									"username": "22081006",
									"full_name": "Firman Parulian Siburian",
									"profile_url": "https://eduforumapi.htp22tib.com/foto/beb2c7cd-4616-43e2-8266-8b510cc5bd05.jpg",
									"nidn_or_nim": "22081006",
									"nama_perguruan_tinggi": "Universitas Hangtuah Pekanbaru",
									"role": "mahasiswa",
									"create_at": "2024-12-28T08:46:46.000Z",
									"update_at": "2024-12-28T09:00:42.000Z"
								}
							}
						]
					}
				],
				"posts_like": [
					{
						"id": "3a6c7d6c-7dd4-4f44-aa17-b1db03e15df8",
						"posts_id": "eb5363f0-baad-431e-8e46-06f98708be81",
						"users_id": "4979fc49-c74d-402e-a6e1-d63831a89239",
						"create_at": "2024-12-27T08:53:48.000Z",
						"update_at": "2024-12-27T08:53:48.000Z",
						"user": {
							"id": "4979fc49-c74d-402e-a6e1-d63831a89239",
							"username": "22081020",
							"full_name": "rusnanda purnama",
							"profile_url": "https://eduforumapi.htp22tib.com/foto/ca137b3a-8ea5-46c3-a95d-6e227dd5b7c1.png",
							"nidn_or_nim": "22081020",
							"nama_perguruan_tinggi": "Universitas Hangtuah Pekanbaru",
							"role": "mahasiswa",
							"create_at": "2024-12-27T08:49:08.000Z",
							"update_at": "2024-12-27T08:51:03.000Z"
						}
					},
					{
						"id": "f90e3c3c-1598-40a4-9daf-0b23f25658c3",
						"posts_id": "eb5363f0-baad-431e-8e46-06f98708be81",
						"users_id": "f0adf986-0736-4db3-91ff-9a7f78b2db99",
						"create_at": "2024-12-28T08:49:30.000Z",
						"update_at": "2024-12-28T08:49:30.000Z",
						"user": {
							"id": "f0adf986-0736-4db3-91ff-9a7f78b2db99",
							"username": "22081006",
							"full_name": "Firman Parulian Siburian",
							"profile_url": "https://eduforumapi.htp22tib.com/foto/beb2c7cd-4616-43e2-8266-8b510cc5bd05.jpg",
							"nidn_or_nim": "22081006",
							"nama_perguruan_tinggi": "Universitas Hangtuah Pekanbaru",
							"role": "mahasiswa",
							"create_at": "2024-12-28T08:46:46.000Z",
							"update_at": "2024-12-28T09:00:42.000Z"
						}
					}
				]
			},
			{
				"id": "c557fdca-a674-4a9c-91b6-27e60f10c6bd",
				"img_url": "https://eduforumapi.htp22tib.com/foto/17ee1637-919d-4f69-9ab5-c9fd953afde6.jpeg",
				"content": "aku pusing ini error mulu dari 5 tahun lalu, heheheheh, mohon pencerahannya suhu!",
				"users_id": "4979fc49-c74d-402e-a6e1-d63831a89239",
				"count_answers": 0,
				"count_like": 0,
				"create_at": "2024-12-27T08:52:57.000Z",
				"update_at": "2024-12-27T08:52:57.000Z",
				"user": {
					"id": "4979fc49-c74d-402e-a6e1-d63831a89239",
					"username": "22081020",
					"full_name": "rusnanda purnama",
					"profile_url": "https://eduforumapi.htp22tib.com/foto/ca137b3a-8ea5-46c3-a95d-6e227dd5b7c1.png",
					"nidn_or_nim": "22081020",
					"nama_perguruan_tinggi": "Universitas Hangtuah Pekanbaru",
					"role": "mahasiswa",
					"create_at": "2024-12-27T08:49:08.000Z",
					"update_at": "2024-12-27T08:51:03.000Z"
				},
				"answers": [],
				"posts_like": []
			}
		],
		"pagination_info": {
			"max_page": 1,
			"page": 1,
			"take": 10
		}
	},
	"refrence": null,
	"error": false
}
```

Response Body Success (query id)

```json
{
	"status": 200,
	"message": "postingan ditemukan",
	"data": {
		"id": "d8b06204-1e7b-44af-af5a-2d40c6a6ec3e",
		"img_url": "https://eduforumapi.htp22tib.com/foto/04f9565c-9177-4eee-aa64-9f40c9fd35a0.jpg",
		"content": "saya ingin bertanya",
		"users_id": "2a1bdc46-b5cb-478a-8dd6-a7d7757b2118",
		"count_answers": 0,
		"count_like": 0,
		"create_at": "2024-12-28T11:50:59.000Z",
		"update_at": "2024-12-28T11:50:59.000Z",
		"user": {
			"id": "2a1bdc46-b5cb-478a-8dd6-a7d7757b2118",
			"username": "mahasiswa1",
			"full_name": "Di ubah namanya",
			"profile_url": "https://eduforumapi.htp22tib.com/foto/7694f9ef-df79-4550-995d-3b2fa1fcfa70.jpg",
			"nidn_or_nim": "08762331231",
			"nama_perguruan_tinggi": "HTP",
			"role": "mahasiswa",
			"create_at": "2024-12-28T09:11:09.000Z",
			"update_at": "2024-12-28T09:27:29.000Z"
		},
		"answers": [],
		"posts_like": []
	},
	"refrence": null,
	"error": false
}
```

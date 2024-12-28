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

| Nama Parameter        | Tipe Data        | Deskripsi                            | Contoh Nilai           |
| --------------------- | ---------------- | ------------------------------------ | ---------------------- |
| full_name             | string           | Nama lengkap                         | Di ubah namanya        |
| nidn_or_nim           | string           | NIDN atau NIM                        | 08762331231            |
| nama_perguruan_tinggi | string           | Nama perguruan tinggi                | HTP                    |
| file                  | array of strings | Jenis file yang diizinkan (multiple) | ["png", "jpg", "jpeg"] |

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

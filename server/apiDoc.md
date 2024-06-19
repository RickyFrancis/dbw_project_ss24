### API Documentation

#### 1. User Creation Endpoint

**Endpoint:** `/api/user`  
**Description:** Create a new user account and a primary address  
**Method:** POST  
**Authorization:** Bearer Token  
**Request Body:**

```json
{
  "email": "string",
  "name": "string",
  "password": "string",
  "addresses": [
    {
      "street": "string",
      "street2": "string",
      "city": "string",
      "state": "string",
      "postalCode": "string",
      "country": "string"
    }
  ]
}
```

**Response (200 OK):**

```json
{
  "id": "integer",
  "email": "string",
  "name": "string",
  "deleted": "boolean",
  "createdAt": "string",
  "updatedAt": "string",
  "addresses": [
    {
      "id": "integer",
      "street": "string",
      "street2": "string",
      "city": "string",
      "state": "string",
      "postalCode": "string",
      "country": "string",
      "deleted": "boolean",
      "nominatim": "object",
      "userId": "integer",
      "primaryAddress": "boolean",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ],
  "token": "string"
}
```

#### 2. Login Endpoint

**Endpoint:** `/login`  
**Method:** POST  
**Authorization:** None  
**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200 OK):**

```json
{
  "id": "integer",
  "email": "string",
  "name": "string",
  "deleted": "boolean",
  "createdAt": "string",
  "updatedAt": "string",
  "token": "string"
}
```

#### 3. Get User Details

**Endpoint:** `/api/user`  
**Method:** GET  
**Authorization:** Bearer Token  
**Response (200 OK):**

```json
{
  "id": "integer",
  "email": "string",
  "name": "string",
  "deleted": "boolean",
  "createdAt": "string",
  "updatedAt": "string",
  "addresses": []
}
```

#### 4. Update User Details

**Endpoint:** `/api/user`  
**Method:** PUT  
**Authorization:** Bearer Token  
**Request Body:**

```json
{
  "email": "string",
  "name": "string",
  "password": "string"
}
```

**Response (200 OK):**

```json
{
  "id": "integer",
  "email": "string",
  "name": "string",
  "deleted": "boolean",
  "createdAt": "string",
  "updatedAt": "string",
  "token": "string"
}
```

#### 5. Get User Address Details

**Endpoint:** `/api/user/address/{addressId}`  
**Method:** GET  
**Authorization:** Bearer Token  
**Response (200 OK):**

```json
{
  "id": "integer",
  "street": "string",
  "street2": "string",
  "city": "string",
  "state": "string",
  "postalCode": "string",
  "country": "string",
  "deleted": "boolean",
  "nominatim": "object",
  "userId": "integer",
  "primaryAddress": "boolean",
  "createdAt": "string",
  "updatedAt": "string"
}
```

#### 6. Update Address

**Endpoint:** `/api/user/address/{addressId}`  
**Method:** PUT  
**Authorization:** Bearer Token  
**Request Body:**

```json
{
  "street": "string",
  "street2": "string",
  "city": "string",
  "state": "string",
  "postalCode": "string",
  "country": "string",
  "userId": "integer",
  "primaryAddress": "boolean",
  "createdAt": "string",
  "updatedAt": "string"
}
```

**Response (200 OK):**

```json
{
  "id": "integer",
  "street": "string",
  "street2": "string",
  "city": "string",
  "state": "string",
  "postalCode": "string",
  "country": "string",
  "deleted": "boolean",
  "nominatim": "object",
  "userId": "integer",
  "primaryAddress": "boolean",
  "createdAt": "string",
  "updatedAt": "string"
}
```

#### 7. Delete User Address

**Endpoint:** `/api/user/address/{addressId}`  
**Method:** DELETE  
**Authorization:** Bearer Token  
**Response (200 OK):**

```json
{
  "message": "string"
}
```

#### 8. Add New User Address

**Endpoint:** `/api/user/address`  
**Method:** POST  
**Authorization:** Bearer Token  
**Request Body:**

```json
{
  "street": "string",
  "street2": "string",
  "city": "string",
  "state": "string",
  "postalCode": "string",
  "country": "string",
  "primaryAddress": "boolean"
}
```

**Response (200 OK):**

```json
{
  "id": "integer",
  "street": "string",
  "street2": "string",
  "city": "string",
  "state": "string",
  "postalCode": "string",
  "country": "string",
  "deleted": "boolean",
  "nominatim": "object",
  "userId": "integer",
  "primaryAddress": "boolean",
  "createdAt": "string",
  "updatedAt": "string"
}
```

#### 9. GET All Schule

**Endpoint:** `/api/schule`  
**Description:** Get all Schule from the database  
**Method:** GET  
**Authorization:** Bearer Token  
**Request Body:** None

**Response (200 OK):**

```json
{
  "count": "number",
  "data": [
    {
      "id": "number",
      "API_OBJECTID": "number",
      "API_ID": "number",
      "TYP": "number",
      "ART": "string",
      "STANDORTTYP": "string",
      "BEZEICHNUNG": "string",
      "BEZEICHNUNGZUSATZ": "string",
      "KURZBEZEICHNUNG": "string",
      "STRASSE": "string",
      "PLZ": "string",
      "ORT": "string",
      "TELEFON": "string",
      "FAX": "string",
      "EMAIL": "string",
      "PROFILE": "string",
      "SPRACHEN": "string",
      "WWW": "string",
      "TRAEGER": "string",
      "TRAEGERTYP": "number",
      "BEZUGNR": "string",
      "GEBIETSARTNUMMER": "number",
      "SNUMMER": "number",
      "NUMMER": "number",
      "GlobalID": "string",
      "CreationDate": "string",
      "Creator": "GISAdminChemnitz",
      "EditDate": "string",
      "Editor": "GISAdminChemnitz",
      "x": "number",
      "y": "number",
      "nominatim": "object",
      "facilityType": "Schule",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

#### 10. GET All Kindertageseinrichtung

**Endpoint:** `/api/kindertageseinrichtung`  
**Description:** Get all Kindertageseinrichtung from the database  
**Method:** GET  
**Authorization:** Bearer Token  
**Request Body:** None

**Response (200 OK):**

```json
{
  "count": "number",
  "data": [
    {
      "id": "number",
      "API_OBJECTID": "number",
      "API_ID": "number",
      "TRAEGER": "string",
      "BEZEICHNUNG": "string",
      "KURZBEZEICHNUNG": "string",
      "STRASSE": "string",
      "STRSCHL": "string",
      "HAUSBEZ": "string",
      "PLZ": "string",
      "ORT": "string",
      "HORT": "number",
      "KITA": "number",
      "URL": "string",
      "TELEFON": "string",
      "FAX": "string",
      "EMAIL": "string",
      "BARRIEREFREI": "number",
      "INTEGRATIV": "number",
      "x": "number",
      "y": "number",
      "nominatim": "object",
      "facilityType": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

#### 11. GET All Schulsozialarbeit

**Endpoint:** `/api/schulsozialarbeit`  
**Description:** Get all Schulsozialarbeit from the database  
**Method:** GET  
**Authorization:** Bearer Token  
**Request Body:** None

**Response (200 OK):**

```json
{
  "count": "number",
  "data": [
    {
      "id": "number",
      "API_OBJECTID": "number",
      "API_ID": "number",
      "TRAEGER": "string",
      "LEISTUNGEN": "string",
      "BEZEICHNUNG": "string",
      "KURZBEZEICHNUNG": "string",
      "STRASSE": "string",
      "PLZ": "string",
      "ORT": "string",
      "TELEFON": "string",
      "EMAIL": "string",
      "FAX": "string",
      "x": "number",
      "y": "number",
      "nominatim": "object",
      "facilityType": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

#### 12. GET All Jugendberufshilfe

**Endpoint:** `/api/jugendberufshilfe`  
**Description:** Get all Jugendberufshilfe from the database  
**Method:** GET  
**Authorization:** Bearer Token  
**Request Body:** None

**Response (200 OK):**

```json
{
  "count": "number",
  "data": [
    {
      "id": "number",
      "API_OBJECTID": "number",
      "API_ID": "number",
      "TRAEGER": "string",
      "LEISTUNGEN": "string",
      "BEZEICHNUNG": "string",
      "KURZBEZEICHNUNG": "string",
      "STRASSE": "string",
      "PLZ": "string",
      "ORT": "string",
      "TELEFON": "string",
      "EMAIL": "string",
      "FAX": "string",
      "x": "number",
      "y": "number",
      "nominatim": "object",
      "facilityType": "string",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

#### 13. Toggle Favorite Jugendberufshilfe

**Endpoint:** `/api/user/toggle-favorite-jugend/{jugendberufshilfe_id}`  
**Description:** Add a Jugendberufshilfe as favorite for the user or remove it from favorites  
**Method:** POST  
**Authorization:** Bearer Token  
**Request Body:** None

**Response (200 OK):**

```json
{
  "message": "string"
}
```

#### 14. Toggle Favorite Schule

**Endpoint:** `/api/user/toggle-favorite-jugend/{schule_id}`  
**Description:** Add a Schule as favorite for the user or remove it from favorites  
**Method:** POST  
**Authorization:** Bearer Token  
**Request Body:** None

**Response (200 OK):**

```json
{
  "message": "string"
}
```

#### 15. Toggle Favorite Kindertageseinrichtung

**Endpoint:** `/api/user/toggle-favorite-kinder/{kinder_id}`  
**Description:** Add a Kindertageseinrichtung as favorite for the user or remove it from favorites  
**Method:** POST  
**Authorization:** Bearer Token  
**Request Body:** None

**Response (200 OK):**

```json
{
  "message": "string"
}
```

#### 16. Toggle Favorite Schulsozialarbeit

**Endpoint:** `/api/user/toggle-favorite-sozial/{sozial_id}`  
**Description:** Add a Schulsozialarbeit as favorite for the user or remove it from favorites  
**Method:** POST  
**Authorization:** Bearer Token  
**Request Body:** None

**Response (200 OK):**

```json
{
  "message": "string"
}
```

#### 17. Toggle Favorite Schulsozialarbeit

**Endpoint:** `/api/user/get-distance`  
**Description:** Return the distance between two coordinates in kilometers
**Method:** POST  
**Authorization:** Bearer Token  
**Request Body:**

```json
{
  "coords1": { "latitude": "number", "longitude": "number" },
  "coords2": { "latitude": "number", "longitude": "number" }
}
```

**Response (200 OK):**

```json
{
  "distance": "number"
}
```

#### 18. Delete User

**Endpoint:** `/api/user`  
**Description:** Soft delete the user and all associated addresses
**Method:** DELETE  
**Authorization:** Bearer Token  
**Request Body:**

```json
{
  "coords1": { "latitude": "number", "longitude": "number" },
  "coords2": { "latitude": "number", "longitude": "number" }
}
```

**Response (200 OK):**

```json
{
  "distance": "number"
}
```
